var exports = module.exports = {}

exports.signup = (req, res) => {
    res.render("signup");
};

exports.signin = (req, res) => {
    res.render("signin");
};

exports.dashboard = (req, res) => {
    res.render("dashboard", {user: req.user});
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
};

exports.articles = (req, res) => {
    res.render("articles");
};