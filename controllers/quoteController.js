var express = require("express");

var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/api/quote", function (req, res) {
    cat.all(function (data) {
        var hbsObject = {
            cats: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Export routes for server.js to use.
module.exports = router;