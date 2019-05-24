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
			$("#author").text(res.contents.author);
		},
		error: function (req, err) {
			console.log("Request: " + JSON.stringify(req));
		}
	});

	$.ajax({
		url: "/api/questions",
		type: "GET",
		success: function (res) {
			console.log(res);
			$("#question").text(res[randomIndex(res)].question);
		},
		error: function (req, err) {
			console.log("Request: " + JSON.stringify(req));
		}
	});

	$.ajax({
		url: "/api/terms",
		type: "GET",
		success: function (res) {
			console.log(res);
			$("#term").text(res[randomIndex(res)].term);
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
		var title = articles[index].title;
		var author = articles[index].author;
		var date = articles[index].publishedAt;
		var url = articles[index].url;
		var description = articles[index].description;
		$("#title").text(title);
		$("#author").text(author);
		$("#date").text(date);
		$("#url").attr("href", url);
		$("#content").text(description);
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