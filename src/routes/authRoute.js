import express from 'express';
import { login, register } from '../controllers/authController.js';

const authRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@scholigence.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *               role:
 *                 type: string
 *                 enum: [Admin, Agent, Manager]
 *                 default: Agent
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: Email already exists
 */
authRouter.post('/register',register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@scholigence.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *           examples:
 *             Admin:
 *               value:
 *                 email: admin@scholigence.com
 *                 password: admin123456
 *             Agent:
 *               value:
 *                 email: akhil@gmail.com
 *                 password: 12345678
 *             Manager:
 *               value:
 *                 email: manager@scholigence.com
 *                 password: manager123456
 *     responses:
 *       201:
 *         description: Login successful - returns user data and JWT token
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
 *                   example: Login successfull
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@scholigence.com
 *                     role:
 *                       type: string
 *                       enum: [Admin, Agent, Manager]
 *                       example: Agent
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       401:
 *         description: User not found or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User is notFound
 *       500:
 *         description: Server error
 */
authRouter.post('/login',login)

export default authRouter;