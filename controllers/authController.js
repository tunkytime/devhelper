var exports = module.exports = {}

exports.signup = (req, res) => {
    res.render("signup");
};

exports.signin = (req, res) => {
    res.render("signin");
};

exports.dashboard = (req, res) => {
    res.render("dashboard", {
        username: req.user
    });
};

exports.jobs = (req, res) => {
    res.render("jobs", {
        username: req.user
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};