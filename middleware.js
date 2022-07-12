export const isAuth = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, "secret");
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
