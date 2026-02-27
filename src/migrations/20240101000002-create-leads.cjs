'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      lead_number: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
        comment: 'Auto-generated: LEAD-YYYY-XXXX (incremental, resets yearly)',
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      mobile_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      alternate_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other', 'Prefer not to say'),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      pincode: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      lead_source: {
        type: Sequelize.ENUM(
          'Website',
          'Referral',
          'Cold Call',
          'Social Media',
          'Email Campaign',
          'Walk-in',
          'Partner',
          'Other'
        ),
        allowNull: false,
        defaultValue: 'Website',
      },
      product_type: {
        type: Sequelize.ENUM(
          'Health Insurance',
          'Life Insurance',
          'Motor Insurance',
          'Travel Insurance',
          'Home Insurance',
          'Business Insurance',
          'Other'
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost', 'Junk'),
        allowNull: false,
        defaultValue: 'New',
      },
      priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High', 'Urgent'),
        allowNull: false,
        defaultValue: 'Medium',
      },
      assigned_to: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Agent/Employee username or ID assigned to this lead',
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      follow_up_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      quote_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Filled when lead is converted to quote',
      },
      conversion_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      premium_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        comment: 'Quoted/finalized premium amount',
      },
      sum_insured: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      created_by: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'User who created this lead',
      },
      updated_by: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    // Indexes (mobile_number is already indexed via unique constraint above)
    await queryInterface.addIndex('leads', ['lead_source'],   { name: 'leads_lead_source_idx' });
    await queryInterface.addIndex('leads', ['created_at'],    { name: 'leads_created_at_idx' });
    await queryInterface.addIndex('leads', ['status'],        { name: 'leads_status_idx' });
    await queryInterface.addIndex('leads', ['assigned_to'],   { name: 'leads_assigned_to_idx' });
    await queryInterface.addIndex('leads', ['product_type'],  { name: 'leads_product_type_idx' });
    await queryInterface.addIndex('leads', ['is_deleted'],    { name: 'leads_is_deleted_idx' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leads');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_gender";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_lead_source";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_product_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_leads_priority";');
  },
};
