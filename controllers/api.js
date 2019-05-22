var express = require('express');
var router = express.Router();
var request = require('request');
var axios = require('axios')


//var quoteAPI = {
    // method: 'GET',
    // url: "http://api.theysaidso.com/qod.json/",
    // data: {
    // method:"getQuote",
    // lang: "en",
    // format:"json&jsonp",
    // api_key: 'd50548305ff81a83c1c65efa4ce59583'
    //},
var quoteAPI = "http://api.theysaidso.com/qod.json";

var callQuoteAPI = function (){

    axios({
        url: "http://quotes.rest/quote/random.json?api_key=eLaLSi9Uu337QxcUwX1_sAeF",
        method: "get",
        // data:{
        // method: "getQuote",
        // lang: "en",
        // format: "json&jsonp",
        // api_key: "eLaLSi9Uu337QxcUwX1_sAeF"
                    // }
    })
    .then(function(response){
        console.log(response.data.contents.quote)
                    //    var quote = response.contents.quote;
                    //     author = response.contents.author
                    //     console.log(quote);
                    //     console.log(author);
                    //     console.log(response.contents.permalink);
                    //     console.log(response);
                    //     $("#quote").text(quote);
                    //     $("#author").text(author);
        
    }).catch(function(error){
        console.log(error)
    });
};    

module.exports.callQuoteAPI = callQuoteAPI;