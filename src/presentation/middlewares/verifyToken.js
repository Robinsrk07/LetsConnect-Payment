const { AuthenticationError } = require("../errors/customError");

class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }

    async verifyToken(req, res, next) {
        console.log("here")
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new AuthenticationError("Token not present in the presentation layer");
            }

            const response = await this.authService.verifyToken(token);
            console.log(response);

            // Attach the decoded token or user information to the request object
            req.user = response;

            // Proceed to the next middleware or route handler
            next();
        } catch (err) {
            // Pass the error to the next error-handling middleware
            next(err);
        }
    }
}

module.exports = AuthMiddleware;