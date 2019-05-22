var express = require("express");
var router = express.Router();
var request = require("request");
var axios = require("axios")

var quoteAPI = "http://api.theysaidso.com/qod.json";

var callQuoteAPI = function () {
    axios({
            url: "http://quotes.rest/quote/qod.json?api_key=eLaLSi9Uu337QxcUwX1_sAeF",
            method: "GET",
        })
        .then(function (response) {
            console.log(response.data.contents.quote)
        }).catch(function (error) {
            console.log(error)
        });
};

module.exports.callQuoteAPI = callQuoteAPI;