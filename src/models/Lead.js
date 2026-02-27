import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

const LEAD_STATUS = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost", "Junk"];
const LEAD_SOURCE = [
  "Website",
  "Referral",
  "Cold Call",
  "Social Media",
  "Email Campaign",
  "Walk-in",
  "Partner",
  "Other",
];
const PRODUCT_TYPE = [
  "Health Insurance",
  "Life Insurance",
  "Motor Insurance",
  "Travel Insurance",
  "Home Insurance",
  "Business Insurance",
  "Other",
];
const PRIORITY = ["Low", "Medium", "High", "Urgent"];
const GENDER = ["Male", "Female", "Other", "Prefer not to say"];

class Lead extends Model {}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    lead_number: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      comment: "Auto-generated: LEAD-YYYY-XXXX (incremental, resets yearly)",
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "First name is required" },
        len: { args: [2, 100], msg: "First name must be 2–100 characters" },
      },
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Last name is required" },
      },
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: { msg: "Invalid email format" },
      },
    },

    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: { msg: "Mobile number already exists" },
      validate: {
        notEmpty: { msg: "Mobile number is required" },
        is: {
          args: /^[6-9]\d{9}$/,
          msg: "Enter a valid 10-digit Indian mobile number",
        },
      },
    },

    alternate_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM(...GENDER),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    pincode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    lead_source: {
      type: DataTypes.ENUM(...LEAD_SOURCE),
      allowNull: false,
      defaultValue: "Website",
      validate: {
        notEmpty: { msg: "Lead source is required" },
      },
    },

    product_type: {
      type: DataTypes.ENUM(...PRODUCT_TYPE),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product type is required" },
      },
    },

    status: {
      type: DataTypes.ENUM(...LEAD_STATUS),
      allowNull: false,
      defaultValue: "New",
    },

    priority: {
      type: DataTypes.ENUM(...PRIORITY),
      allowNull: false,
      defaultValue: "Medium",
    },

    assigned_to: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Agent/Employee username or ID assigned to this lead",
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    follow_up_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    quote_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Filled when lead is converted to quote",
    },

    conversion_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    premium_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      comment: "Quoted/finalized premium amount",
    },

    sum_insured: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },

    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "User who created this lead",
    },

    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deleted_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Lead",
    tableName: "leads",
    underscored: true,
    timestamps: true,
    paranoid: false,
    defaultScope: {
      where: { is_deleted: false },
    },
    scopes: {
      withDeleted: {},
      deletedOnly: { where: { is_deleted: true } },
    },
    indexes: [
      { fields: ["mobile_number"] },
      { fields: ["lead_source"] },
      { fields: ["created_at"] },
      { fields: ["status"] },
      { fields: ["assigned_to"] },
      { fields: ["product_type"] },
      { fields: ["is_deleted"] },
    ],
  }
);

export { LEAD_SOURCE, LEAD_STATUS, PRODUCT_TYPE, PRIORITY, GENDER };
export default Lead;
