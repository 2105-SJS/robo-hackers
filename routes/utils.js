function requireUser(req, res, next) {
    try {
        if (!req.user) {
            res.status(409)
            next({
                name: "MissingUserError",
                message: "You must be logged in to perform this action"
            });
        }
    
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    requireUser
}