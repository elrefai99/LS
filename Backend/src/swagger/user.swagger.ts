/**
 * @swagger
 * /admin/api/user/:
 *   get:
 *     summary: User Profile
 *     description: Authenticate user with email and password
 *     tags: [User]
 *     security:
 *       - BearerAuth: [token]  
 *     parameters:
 *       - in: query or headers
 *         name: token
 *         schema:
 *           type: string
 *         required: false
 *         description: Authentication token as a query parameter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               data: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
  * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 */
