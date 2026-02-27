
import { body } from 'express-validator';

const LEAD_STATUS = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost', 'Junk'];
const LEAD_SOURCE = ['Website', 'Referral', 'Cold Call', 'Social Media', 'Email Campaign', 'Walk-in', 'Partner', 'Other'];
const PRODUCT_TYPE = ['Health Insurance', 'Life Insurance', 'Motor Insurance', 'Travel Insurance', 'Home Insurance', 'Business Insurance', 'Other'];
const PRIORITY = ['Low', 'Medium', 'High', 'Urgent'];

export const createLeadRules = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 100 }).withMessage('First name must be 2–100 chars'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required'),

  body('mobile_number')
    .notEmpty().withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),

  body('email')
    .optional({ nullable: true })
    .isEmail().withMessage('Invalid email format'),

  body('lead_source')
    .notEmpty().withMessage('Lead source is required')
    .isIn(LEAD_SOURCE).withMessage(`Lead source must be one of: ${LEAD_SOURCE.join(', ')}`),

  body('product_type')
    .notEmpty().withMessage('Product type is required')
    .isIn(PRODUCT_TYPE).withMessage(`Product type must be one of: ${PRODUCT_TYPE.join(', ')}`),

  body('priority')
    .optional()
    .isIn(PRIORITY).withMessage(`Priority must be one of: ${PRIORITY.join(', ')}`),

  body('pincode')
    .optional()
    .matches(/^\d{6}$/).withMessage('Enter a valid 6-digit pincode')
];

export const updateLeadRules = [
  body('first_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('First name must be 2–100 chars'),

  body('mobile_number')
    .optional()
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),

  body('email')
    .optional({ nullable: true })
    .isEmail().withMessage('Invalid email format'),

  body('status')
    .optional()
    .isIn(LEAD_STATUS).withMessage(`Status must be one of: ${LEAD_STATUS.join(', ')}`),

  body('lead_source')
    .optional()
    .isIn(LEAD_SOURCE).withMessage(`Lead source must be one of: ${LEAD_SOURCE.join(', ')}`),

  body('product_type')
    .optional()
    .isIn(PRODUCT_TYPE).withMessage(`Product type must be one of: ${PRODUCT_TYPE.join(', ')}`),

  body('priority')
    .optional()
    .isIn(PRIORITY).withMessage(`Priority must be one of: ${PRIORITY.join(', ')}`)
];

export const convertLeadRules = [
  body('quote_id')
    .notEmpty().withMessage('Quote ID is required for conversion'),

  body('premium_amount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Premium amount must be a positive number'),

  body('sum_insured')
    .optional()
    .isFloat({ min: 0 }).withMessage('Sum insured must be a positive number')
];


