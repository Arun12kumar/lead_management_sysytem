import { validationResult } from "express-validator";
import { logger } from "../utils/logger.js";
import Lead from "../models/Lead.js";
import { sequelize } from "../config/db.js";
import { LeadService } from "../services/leadService.js";

const leadService = new LeadService();

export const createLead = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "validation error", errors: errors.array(), success: false });
    }

    const lead = await leadService.createLead(req.body, req.user?.name);

    return res.status(201).json({ message: "Lead created successfully", success: true, data: lead });
  } catch (error) {
    logger.error("createLead error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

// GET /api/leads
export const getLeads = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      lead_source: req.query.lead_source,
      assigned_to: req.query.assigned_to,
      product_type: req.query.product_type,
      from_date: req.query.from_date,
      to_date: req.query.to_date,
      search: req.query.search,
    };

    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const { leads, pagination: paginationMeta } = await leadService.getLeads(filters, pagination);
    return res
      .status(200)
      .json({ message: "Lead fetched successfully", success: true, data: leads, pagination: paginationMeta });
  } catch (error) {
    logger.error("fetchLeads error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

// GET /api/leads/:id
export const getLeadById = async (req, res) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);

    return res.status(200).json({ message: "Lead fetched successfully", success: true, data: lead });
  } catch (error) {
    logger.error("fetchBYId error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

// PUT /api/leads/:id
export const updateLead = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorResponse(res, errors.array());
    }

    const lead = await leadService.updateLead(req.params.id, req.body, req.user?.name || "system");
    return res.status(200).json({ message: "Lead fetched successfully", success: true, data: lead });
  } catch (error) {
    logger.error("UpdateLead error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

// DELETE /api/leads/:id  (soft delete)
export const deleteLead = async (req, res) => {
  try {
    const result = await leadService.deleteLead(req.params.id, req.user?.name || "system");
    return res.status(200).json({ message: "Lead deleted successfully", success: true, info: result.message });
  } catch (error) {
    logger.error("UpdateLead error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};

// POST /api/leads/:id/convert
export const convertLead = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorResponse(res, errors.array());
    }

    const lead = await leadService.convertLead(req.params.id, req.body, req.user?.name || "system");
    return res.status(200).json({ message: "Lead successfully converted to quote", success: true, data: lead });
  } catch (error) {
    logger.error("UpdateLead error", { error: error.message });
    return res.status(500).json({ message: "Server Error", errors: error.message, success: false });
  }
};
