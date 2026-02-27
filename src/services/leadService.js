
import { Op } from "sequelize";
import { sequelize } from "../config/db.js";
import Lead from "../models/Lead.js";
import { logger } from "../utils/logger.js";


export class LeadService {

  async generateLeadNumber() {
    const year = new Date().getFullYear();
    const prefix = `LEAD-${year}-`;

    // Find the latest lead number for the current year
    const latestLead = await Lead.scope('withDeleted').findOne({
      where: {
        lead_number: { [Op.like]: `${prefix}%` }
      },
      order: [['lead_number', 'DESC']],
      attributes: ['lead_number']
    });

    let sequence = 1;
    if (latestLead) {
      const lastSeq = parseInt(latestLead.lead_number.split('-')[2], 10);
      sequence = lastSeq + 1;
    }

    // Zero-pad to 4 digits: 0001, 0002, ..., 9999
    const paddedSeq = String(sequence).padStart(4, '0');
    return `${prefix}${paddedSeq}`;
  }

  async createLead(data, createdBy) {
    const t = await sequelize.transaction();
    try {
      const lead_number = await this.generateLeadNumber();

      const lead = await Lead.create(
        {
          ...data,
          lead_number,
          created_by: createdBy,
          status: 'New'
        },
        { transaction: t }
      );

      await t.commit();
      logger.info(`Lead created: ${lead_number} by ${createdBy}`);
      return lead;
    } catch (error) {
      await t.rollback();
      logger.error('createLead failed', { error: error.message });
      throw error;
    }
  }

  async getLeads(filters = {}, pagination = {}) {
    const {
      status,
      lead_source,
      assigned_to,
      product_type,
      from_date,
      to_date,
      search
    } = filters;

    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const whereClause = { is_deleted: false };

    if (status) whereClause.status = status;
    if (lead_source) whereClause.lead_source = lead_source;
    if (assigned_to) whereClause.assigned_to = assigned_to;
    if (product_type) whereClause.product_type = product_type;

    // Date range filter on created_at
    if (from_date || to_date) {
      whereClause.created_at = {};
      if (from_date) whereClause.created_at[Op.gte] = new Date(from_date);
      if (to_date) {
        const end = new Date(to_date);
        end.setHours(23, 59, 59, 999);
        whereClause.created_at[Op.lte] = end;
      }
    }

    // Search by name or mobile
    if (search) {
      whereClause[Op.or] = [
        { first_name: { [Op.iLike]: `%${search}%` } },
        { last_name: { [Op.iLike]: `%${search}%` } },
        { mobile_number: { [Op.like]: `%${search}%` } },
        { lead_number: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Lead.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return {
      leads: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getLeadById(id) {
    const lead = await Lead.findOne({
      where: { id, is_deleted: false }
    });
    if (!lead) throw { status: 404, message: 'Lead not found' };
    return lead;
  }

  async updateLead(id, data, updatedBy) {
    const lead = await this.getLeadById(id);

    // Prevent changing lead_number or converted status back
    delete data.lead_number;
    if (lead.status === 'Converted') {
      delete data.status; // Cannot revert a converted lead
    }

    await lead.update({ ...data, updated_by: updatedBy });
    logger.info(`Lead updated: ${lead.lead_number} by ${updatedBy}`);
    return lead;
  }

  async deleteLead(id, deletedBy) {
    const lead = await this.getLeadById(id);

    await lead.update({
      is_deleted: true,
      deleted_at: new Date(),
      deleted_by: deletedBy
    });

    logger.info(`Lead soft-deleted: ${lead.lead_number} by ${deletedBy}`);
    return { message: `Lead ${lead.lead_number} has been deleted` };
  }

  async convertLead(id, { quote_id, premium_amount, sum_insured }, convertedBy) {
    const lead = await this.getLeadById(id);

    if (lead.status === 'Converted') {
      throw { status: 409, message: 'Lead is already converted to a quote' };
    }
    if (lead.status === 'Lost' || lead.status === 'Junk') {
      throw { status: 400, message: `Cannot convert a lead with status "${lead.status}"` };
    }

    await lead.update({
      quote_id,
      status: 'Converted',
      conversion_date: new Date(),
      premium_amount,
      sum_insured,
      updated_by: convertedBy
    });

    logger.info(`Lead converted: ${lead.lead_number} → Quote ${quote_id} by ${convertedBy}`);
    return lead;
  }
}


