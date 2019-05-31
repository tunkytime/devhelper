	var apiKeyNews = "9d7028e6fd84446a83379f5c12519956";
	var baseUrlNews = "https://newsapi.org/v2/everything?q=technology&pageSize=100&apiKey=" + apiKeyNews;

	var articles = [];
	var articleNum = 0;
	var articleTitle;
	var articleURL;
	var articleImage;

	var apiKeyJobs = "a5ce6768d167cf7224dd2182eb9b14d4";
	var baseUrlJobs = "https://authenticjobs.com/api/?api_key=" + apiKeyJobs + "&method=aj.jobs.search&format=json&categories=3";

	var apiKeyQuote = "eLaLSi9Uu337QxcUwX1_sAeF";
	var quoteURL = "http://quotes.rest/quote/search.json?category=achieving-dreams&api_key=" + apiKeyQuote + "&maxlength=160";

	$.ajax({
	    url: baseUrlNews,
	    type: "GET",
	    success: function (res) {
	        console.log(res);
	        for (var i = 0; i < res.articles.length; i++) {
	            articles.push(res.articles[i]);
	        };
	        getArticles(articleNum);
	    },
	    error: (req, err) => {
	        console.log("Request: " + JSON.stringify(req));
	    }
	});

	$.ajax({
	    url: quoteURL,
	    type: "GET",
	    success: function (res) {
	        
			$("#quote").text(res.contents.quote);
			$("#author").text(res.contents.author);
	    },
	    error: function (req, err) {
	        console.log("Request: " + JSON.stringify(req));
	    }
	});

	$("#getNext").on("click", function () {
	    if (articleNum == (articles.length)) {
	        articleNum = 0;
	    } else {
	        articleNum++;
	    }
	    getArticles(articleNum);
	});

	$("#previous").on("click", function () {
	    if (articleNum === 0) {
	        getArticles(articleNum);
	        return;
	    } else {
	        getArticles((articleNum--) - 1);
	    }
	});

	/*<categories>
	<category id="3" name="Design &amp; User Experience"/>
	<category id="4" name="Front-end Engineering"/>
	<category id="2" name="Back-end Engineering"/>
	<category id="5" name="Apps"/>*/
	$("#getJobs").on("click", function () {
	    getJobs();
	});

	function getArticles(index) {
	    var title = articles[index].title;
	    var author = articles[index].author;
	    var date = articles[index].publishedAt;
	    var url = articles[index].url;
		var content = articles[index].content;
		var image = articles[index].urlToImage;
		
		//Used for Saved Articles
		articleTitle = title;
		articleURL = url;
		articleImage = image;

	    content = `${content.substring(0, content.length - 13)}`;
	    $("#title").text(title);
	    $("#author").text(author);
	    $("#date").text(date);
	    $("#url").attr("href", url);
	    $("#content").text(content);
	};

	function getJobs() {
	    $.ajax({
	        url: baseUrlJobs,
	        type: "GET",
	        crossDomain: true,
	        dataType: "jsonp",
	        success: (res) => {
	            console.log(res);
	            var listing = res.listings.listing[0];
	            $("#jobs").html(`<p>${listing.title}</p><p>${listing.category.name}</p>`);
	        },
	        error: (req, err) => {
	            console.log("Request: " + JSON.stringify(req));
	        },
	        beforeSend: setHeader
	    });

	    function setHeader(xhr) {
	        xhr.setRequestHeader('Authorization', apiKey2);
	    };
	};


	$("#articles").on("click", function() {
		
		$.ajax("/articles", {
            type: "GET",
			data: articles,
            success: function(data){	
				console.log("Articles button has been pressed")
			}
		});	
		
	});

	$("#save-article").on("click", function () {
		
		var savedArticle = {
			url: articleURL,
			title: articleTitle,
			image: articleImage,

		};
		$.ajax("/articles", {
            type: "POST",
			data: savedArticle,
            success: function(data){
				console.log("Article saved");  
				console.log(savedArticle);
			}
		});	
	});

	$("#delete-article").on("click", function () {
		console.log("Delete button has been pressed");
		var id = $(this).data("id");
		
		console.log(id);
		// Send the DELETE request.
		$.ajax("/articles/" + id, {
		  type: "DELETE"
		}).then(
		  function() {
			console.log("Article Deleted", id);
			// Reload the page to get the updated list
			location.reload();
		  }
		);
	  });


