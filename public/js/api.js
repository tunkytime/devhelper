$document.ready(function(){
    var randomQuote;
    var author;

    function getQuote(){
        var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&jsonp=?";
        $.getJSON(url, function(data){
            console.log(data);
        }); 
    };

    getQuote()
});
