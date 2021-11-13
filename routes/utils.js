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
        
    } catch ({name, message}) {
        next({name, message});
    }
}

function requireAdmin(req, res, next) {
    try {
        if (!req.user.isAdmin) {
            res.status(409)
            next({
                name: "MissingAdminError",
                message: "You must be an admin to perform this action"
            });
        }
    
        next();
    } catch ({name, message}) {
        next({name, message});
    }
}

module.exports = {
    requireUser,
    requireAdmin
}