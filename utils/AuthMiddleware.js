
const authorizationCheck = (req, res, next) => {
    if(!req.session.authorized){
        req.session.message = {
        loginError: "You need to Log In"
    }
        return res.redirect("/user/login")
    }

    next()
}

const refuse = (req, res, next) => {
    if(req.session.authorized){
        return res.redirect("/")
    }

    next()
}

module.exports = {
    authorizationCheck,
    refuse
}