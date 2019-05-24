var bodyParser = require("body-parser");

var data = "This is working";
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/dashboard', function(req, res){
        res.render('dashboard',{todos: data});
    });
    app.post('/dashboard', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });
    app.delete('/dashboard/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        Response.json(data);
    });
};

