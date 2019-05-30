	var apiKeyNews = "9d7028e6fd84446a83379f5c12519956";
	var apiKeyJobs = "a5ce6768d167cf7224dd2182eb9b14d4";
	var apiKeyQuotes = "eLaLSi9Uu337QxcUwX1_sAeF";
	var baseUrlNews = "https://newsapi.org/v2/everything?q=technology&pageSize=100&apiKey=" + apiKeyNews;
	var baseUrlJobs = "https://authenticjobs.com/api/?api_key=" + apiKeyJobs + "&method=aj.jobs.search&format=json&categories=3";
	var baseUrlQuotes = "http://quotes.rest/quote/search.json?category=achieving-dreams&api_key=" + apiKeyQuotes + "&maxlength=160";

	var articles = [];
	var articleNum = 0;
	var index;

	function randomIndex(array) {
		index = Math.floor(Math.random() * array.length);
		return index;
	};

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
		url: baseUrlQuotes,
		type: "GET",
		success: function (res) {
			console.log(res);
			$("#quote").text(res.contents.quote);
			$("#authorQuote").text(res.contents.author);
		},
		error: function (req, err) {
			console.log("Request: " + JSON.stringify(req));
		}
	});

	$.ajax({
		url: "/api/questions",
		type: "GET",
		success: function (res) {
			var currentQuestion = res[randomIndex(res)];
			var term = currentQuestion.question;
			var answer = currentQuestion.answer;
			$("#intQuestion").text(term);
			$("#intAnswer").text(answer);
		},
		error: function (req, err) {
			console.log("Request: " + JSON.stringify(req));
		}
	});

	$.ajax({
		url: "/api/terms",
		type: "GET",
		success: function (res) {
			var currentTerm = res[randomIndex(res)];
			var term = currentTerm.term;
			var answer = currentTerm.answer;
			$("#term").text(term);
			$("#termDefine").text(answer);
		},
		error: function (req, err) {
			console.log("Request: " + JSON.stringify(req));
		}
	});

	$("#nextArt").on("click", function () {
		if (articleNum === articles.length) {
			articleNum = 0;
		} else {
			articleNum++;
		}
		getArticles(articleNum);
	});

	$("#prevArt").on("click", function () {
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
		var date = articles[index].publishedAt;
		var d = new Date(date);
		var month = d.getUTCMonth() + 1;
		var day = d.getUTCDate();
		var year = d.getUTCFullYear();
		date = `${month}/${day}/${year}`



		var article = {
			title: articles[index].title,
			author: articles[index].author,
			date: date,
			url: articles[index].url,
			image: articles[index].urlToImage,
			description: articles[index].description
		}

		displayInfo(article);
	};

	function displayInfo(article) {
		$("#title").text(article.title);
		$("#author").text(article.author);
		$("#date").text(` | ${article.date}`);
		$("#url").attr("href", article.url);
		$("#articleImg").attr("src", article.image);
		$("#content").text(article.description);
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
			xhr.setRequestHeader('Authorization', apiKeyJobs);
		};
	};