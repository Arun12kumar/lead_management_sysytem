import express from 'express';
import { convertLead, createLead, deleteLead, getLeadById, getLeads, updateLead } from '../controllers/leadController.js';
import { protect } from '../middlewares/authMiddleware.js';

const leadRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: Lead management endpoints
 */

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead record
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, mobile_number, lead_source, product_type]
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Ramesh
 *               last_name:
 *                 type: string
 *                 example: Gupta
 *               mobile_number:
 *                 type: string
 *                 example: 9876543210
 *               email:
 *                 type: string
 *                 example: ramesh.gupta@example.com
 *               lead_source:
 *                 type: string
 *                 enum: [Website, Referral, Cold Call, Social Media, Email Campaign, Walk-in, Partner, Other]
 *                 example: Website
 *               product_type:
 *                 type: string
 *                 enum: [Health Insurance, Life Insurance, Motor Insurance, Travel Insurance, Home Insurance, Business Insurance, Other]
 *                 example: Life Insurance
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High, Urgent]
 *                 example: High
 *               pincode:
 *                 type: string
 *                 example: 110001
 *               city:
 *                 type: string
 *                 example: Delhi
 *               state:
 *                 type: string
 *                 example: Delhi
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other, Prefer not to say]
 *                 example: Male
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-15
 *           examples:
 *             sampleLead:
 *               summary: Dummy lead for testing
 *               value:
 *                 first_name: Ramesh
 *                 last_name: Gupta
 *                 mobile_number: "9876543210"
 *                 email: ramesh.gupta@example.com
 *                 lead_source: Website
 *                 product_type: Life Insurance
 *                 priority: High
 *                 pincode: "110001"
 *                 city: Delhi
 *                 state: Delhi
 *                 gender: Male
 *                 date_of_birth: "1990-01-15"
 *     responses:
 *       201:
 *         description: Lead created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lead created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Lead'
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
leadRouter.post('/',protect, createLead);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Retrieve a paginated list of leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by lead status
 *       - in: query
 *         name: lead_source
 *         schema:
 *           type: string
 *         description: Filter by source
 *       - in: query
 *         name: assigned_to
 *         schema:
 *           type: string
 *         description: Filter by assigned user
 *       - in: query
 *         name: product_type
 *         schema:
 *           type: string
 *         description: Filter by product type
 *       - in: query
 *         name: from_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Created after this date
 *       - in: query
 *         name: to_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Created before this date (inclusive)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for name/mobile/lead number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Results per page (default 10)
 *     responses:
 *       200:
 *         description: List of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lead'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Server error
 */
leadRouter.get('/',protect, getLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Get a single lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the lead
 *     responses:
 *       200:
 *         description: Lead object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
leadRouter.get('/:id',protect, getLeadById);

/**
 * @swagger
 * /api/leads/{id}:
 *   put:
 *     summary: Update a lead's details
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the lead
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               mobile_number:
 *                 type: string
 *               email:
 *                 type: string
 *               lead_source:
 *                 type: string
 *               product_type:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               assigned_to:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated lead
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Bad request or invalid update
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
leadRouter.put('/:id',protect, updateLead);

/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Soft-delete a lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the lead
 *     responses:
 *       200:
 *         description: Deletion confirmation
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
leadRouter.delete('/:id',protect, deleteLead);

/**
 * @swagger
 * /api/leads/converted/{id}:
 *   post:
 *     summary: Convert a lead to a quote
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the lead to convert
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quote_id]
 *             properties:
 *               quote_id:
 *                 type: string
 *               premium_amount:
 *                 type: number
 *               sum_insured:
 *                 type: number
 *     responses:
 *       200:
 *         description: Lead converted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Invalid lead status or request
 *       404:
 *         description: Lead not found
 *       409:
 *         description: Lead already converted
 *       500:
 *         description: Server error
 */
leadRouter.post('/converted/:id',protect, convertLead);


export default leadRouter;