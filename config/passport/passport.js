var bcrypt = require("bcrypt-nodejs");

module.exports = (passport, user) => {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },

        (req, email, password, done) => {
            var generateHash = (password) => {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, {
                        message: "That email has already been used"
                    });
                } else {
                    var userPwd = generateHash(password);
                    var data = {
                        email: email,
                        password: userPwd,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };
                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //serialize
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //derialize user
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    // Local signin
    passport.use("local-signin", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },

        (req, email, password, done) => {
            var User = user;
            var isValidPassword = (userpass, password) => {
                return bcrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: "Email does not exist"
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Invalid password"
                    });
                }
                var userInfo = user.get();
                // console.log(userInfo)
                return done(null, userInfo);
            }).catch((err) => {
                console.log("Error:", err);
                return done(null, false, {
                    message: "Hmm... something went wrong."
                });
            });
        }
    ));
};