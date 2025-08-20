import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

            if (!token) {
                return resizeBy.status(401).json({ success: false, message: "No token, Authorization denied." })
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next();

        } else {
            return res.status(401).json({ success: false, message: "Authorization header missing or invalid." });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}