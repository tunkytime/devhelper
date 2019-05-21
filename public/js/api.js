$document.ready(function(){
    function getNewQuote(){
        var quote;
        var author;

        $.ajax({
            url: "http://api.theysaidso.com/qod.json",
            data:{
                method: "getQuote",
                lang: "en",
                format: "json&jsonp",
                api_key: "eLaLSi9Uu337QxcUwX1_sAeF"
            },
            getQuote: function(response){
                quote = response.contents.qoute;
                author = response.contents.author
                console.log(quote);
                console.log(author);
                console.log(response.contents.permalink);
                console.log(response);
                $("#quote").text(quote);
                $("#author").text(author);

            }
        });
    }   
    getNewQuote(); 
});



// API_URL = "http://api.theysaidso.com/qod.json"
// API_URL = "http://quotes.rest/quote/random.json?api_key=eLaLSi9Uu337QxcUwX1_sAeF"
// var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&jsonp=?";
