module.exports = ( role ) =>{

    return (req, res, next) => {
        
        if(req.session.authUser && (role !== "ADMIN" || req.session.authUser.role === "ADMIN")) {
            next();
            return ;
        }

        if(req.accepts("html")) {
            res.redirect( req.session.authUser ? "/" :"/user/login" );
            return ;
        }

        res.send({
            result: "Denied",
            data: null,
            message: "Access Denied"
        })
    }
}