	var apiKeyNews = "9d7028e6fd84446a83379f5c12519956";
	var apiKeyJobs = "a5ce6768d167cf7224dd2182eb9b14d4";
	var apiKeyQuotes = "eLaLSi9Uu337QxcUwX1_sAeF";
	var baseUrlNews = "https://newsapi.org/v2/top-headlines?q=technology&pageSize=100&apiKey=" + apiKeyNews;
	var baseUrlJobs = "https://authenticjobs.com/api/?api_key=" + apiKeyJobs + "&method=aj.jobs.search&format=json&categories=3";
	var baseUrlQuotes = "https://quotes.rest/quote/search.json?category=achieving-dreams&api_key=" + apiKeyQuotes + "&maxlength=160";

	var articles = [];
	var terms = [{
			"id": 1,
			"term": "AGILE SOFTWARE DEVELOPMENT",
			"answer": "Agile Software Development is a methodology that calls for keeping code simple, testing often, and delivering small, functional bits of an application when they are ready (called “Sprints”). Expect to focus on building parts of an application rather than delivering one huge application at the end of the project. You may or may not learn Agile Development during a coding bootcamp, but a hiring manager will probably talk about it in interviews if their dev team uses it."
		},
		{
			"id": 2,
			"term": "AJAX",
			"answer": "AJAX stands for “Asynchronous JavaScript and XML.” AJAX is not a programming language but a set of web development techniques utilizing many web technologies on the client-side in order to create asynchronous web applications. In a nutshell, Ajax allows for website pages to dynamically change content without needing to reload the entire page."
		},
		{
			"id": 3,
			"term": "ALGORITHM",
			"answer": "An algorithm is a set of rules or processes to follow while creating a computer program. Algorithms are the basis for the theory behind most computer programming. For example, how does Google determine which website should appear on their front page of search results? A Search Algorithm! When skeptics talk about coding bootcamps, they usually point out that bootcamp alumni aren’t algorithm aces. Will you learn about algorithms at a coding bootcamp? Sure. Will you know as much as a Computer Science major? Probably not."
		},
		{
			"id": 4,
			"term": "API",
			"answer": "An API is an application programming interface with a set of routines, protocols, and tools for building software applications. API’s express software components in terms of their operations, inputs, outputs, and underlying types. For example, you may use a Google Maps API in your bootcamp final project in order to use existing geolocation infrastructure to create specialized maps."
		},
		{
			"id": 5,
			"term": "BACK-END",
			"answer": "Backend development refers to the server side of development where the main focus is on how the site works. This usually consists of three parts: a server, an application, and a database. Users can’t see the backend work, but code written by back end developers is what communicates the database information to the browser."
		},
		{
			"id": 6,
			"term": "BUILD",
			"answer": "Build, also known as software build or code build, refers to the process by which source code is converted into a stand-alone form that can be run on a computer or the form itself. Builds are created once a certain point in development has been reached or the code is deemed ready for implementation for testing or release."
		},
		{
			"id": 7,
			"term": "COMPILER",
			"answer": "A compiler is a set of computer programs that transforms one type of source code written in one language into a difference source code. For example, the compiler called gcc compiles a C program into an executable like Print (“Hello World”). Simply put, a complier is a source code translator."
		},
		{
			"id": 8,
			"term": "DATA SCIENCE",
			"answer": "According to NYC Data Science Academy, Data science is a multi-disciplinary field that combines computer science and statistics. The objective of data science is to pull insightful and useful knowledge out of datasets which, at times, can be too large for traditional statistics to analyze. This can include anything from analyzing complex genomic structures, to interpreting handwriting, to optimizing a marketing strategy. Most data science bootcamps require an aptitude for math and statistics, and in some cases knowledge of a programming language, such as R or Python."
		},
		{
			"id": 9,
			"term": "DEPLOYMENT",
			"answer": "Software is deployed when all of the activities that make a software system available for use are complete, tested, and ready for users. At a coding bootcamp, you should expect to be deploying to a platform like Heroku. Once code is deployed, it’s available to users."
		},
		{
			"id": 10,
			"term": "DJANGO",
			"answer": "A free, open source, web application framework written in Python which follows the model-view-controller (MVC) framework. Expect to learn Django at a coding bootcamp that teaches Python. It’s great for rapid development, along with clean and pragmatic design, and often used in Data Science roles."
		},
		{
			"id": 11,
			"term": "FRAMEWORK",
			"answer": "A framework is a reusable, hierarchical directory environment that indicates what kinds of programs can or should be built. Frameworks are similar to static and dynamic libraries called by applications to perform specific tasks. You’ll learn various JavaScript frameworks at a front-end or full stack coding bootcamp including Angular.Js, and React."
		},
		{
			"id": 12,
			"term": "FRONT-END",
			"answer": "Front end development refers to “client-side” development, where the focus is on what users see. Front end developers will be engaged in analyzing code, design, and debugging applications along with ensuring a seamless user experience."
		},
		{
			"id": 13,
			"term": "HTTP REQUEST",
			"answer": "HyperText Transfer Protocol (HTTP) is an application protocol for distributed, collaborative, hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web. If your browser fetches any file from a web server, it’s using an HTTP request."
		}
	];

	var questions = [{
			"id": 1,
			"question": "Describe the MVC design pattern.",
			"answer": "MVC is a software architecture pattern for developing web application. It is handled by three objects Model-View-Controller"
		},
		{
			"id": 2,
			"question": "What is namespacing in JavaScript?",
			"answer": "In brief, a namespace is a global object with a unique name that holds methods, properties and other objects. It’s used to increase modularity and reuse of code in web applications, and to prevent naming conflicts."
		},
		{
			"id": 3,
			"question": "What’s the difference between SOAP and REST?",
			"answer": "One of the key differences is that SOAP uses XML while REST also supports text, JSON and other formats."
		},
		{
			"id": 4,
			"question": "What is CORS? How does it work?",
			"answer": "Cross-origin resource sharing (CORS) is a mechanism that allows many resources (e.g., fonts, JavaScript, etc.) on a web page to be requested from another domain outside the domain from which the resource originated. It’s a mechanism supported in HTML5 that manages XMLHttpRequest access to a domain different."
		},
		{
			"id": 5,
			"question": "What’s the difference between GET and POST?",
			"answer": "Both are methods used in HTTP requests. Generally it is said that GET is to download data and PUT is to upload data. But we can do both downloading as well as uploading either by GET/POST."
		}
	];

	var articleNum = 0;
	var termNum = 0;
	var questionNum = 0;
	var articleTitle;
	var articleURL;
	var articleImage;
	var index;
	var userId = $(".currentUser").data("id");

	$(document).ready(function () {

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
				$("#quote").text(res.contents.quote);
				$("#authorQuote").text(res.contents.author);
			},
			error: function (req, err) {
				console.log("Request: " + JSON.stringify(req));
			}
		});

		// $.ajax({
		// 	url: "/api/questions",
		// 	type: "GET",
		// 	success: function (res) {
		// 		for (var i = 0; i < res.length; i++) {
		// 			questions.push(res[i]);
		// 		};
		// 		getQuestion(questionNum);
		// 	},
		// 	error: function (req, err) {
		// 		console.log("Request: " + JSON.stringify(req));
		// 	}
		// });

		getQuestion(questionNum)

		// $.ajax({
		// 	url: "/api/terms",
		// 	type: "GET",
		// 	success: function (res) {
		// 		for (var i = 0; i < res.length; i++) {
		// 			terms.push(res[i]);
		// 		};
		// 		getTerm(termNum);
		// 	},
		// 	error: function (req, err) {
		// 		console.log("Request: " + JSON.stringify(req));
		// 	}
		// });

		getTerm(termNum)

		$("#nextTerm").on("click", function () {
			if (termNum === (terms.length - 1)) {
				termNum = 0;
			} else {
				termNum++;
			}
			getTerm(termNum);
		});

		$("#nextQuestion").on("click", function () {
			if (questionNum === (questions.length - 1)) {
				questionNum = 0;
			} else {
				questionNum++;
			}
			getQuestion(questionNum);
		});

		$("#nextArt").on("click", function () {
			if (articleNum === (articles.length - 1)) {
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
		getJobs();

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

			//Used for Saved Articles
			articleTitle = article.title;
			articleURL = article.url;
			articleImage = article.image;

			displayInfo(article);
		};

		function getTerm(index) {
			var currentTerm = terms[index];
			var term = currentTerm.term;
			var answer = currentTerm.answer;
			$("#term").text(term);
			$("#termDefine").text(answer);
		}

		function getQuestion(index) {
			var currentQuestion = questions[index];
			var term = currentQuestion.question;
			var answer = currentQuestion.answer;
			$("#intQuestion").text(term);
			$("#intAnswer").text(answer);
		}

		function displayInfo(article) {
			$("#title").text(article.title);
			if (article.author === null) {
				$("#author").text("");
			} else {
				$("#author").text(`${article.author} | `);
			}
			$("#date").text(article.date);
			$("#url").attr("href", article.url);
			$("#articleImg").attr("src", article.image);
			$("#content").text(article.description);
		};

		function displayJobs(array) {

		}

		$("#save-article").on("click", function () {
			var savedArticle = {
				url: articleURL,
				title: articleTitle,
				image: articleImage,
				UserId: $(".currentUser").data("id")
			};

			$.ajax("/articles", {
				type: "POST",
				data: savedArticle,
				success: function (data) {
					console.log("Article saved");
				}
			});
		});

		$(document).on("click", "#delete-article", function () {
			var id = $(this).data("id");
			// Send the DELETE request.
			$.ajax("/articles/" + id, {
				type: "DELETE"
			}).then(
				function () {
					console.log("Article Deleted", id);
					// Reload the page to get the updated list
					location.reload();
				}
			);
		});

		function getJobs() {
			$.ajax({
				url: baseUrlJobs,
				type: "GET",
				crossDomain: true,
				dataType: "jsonp",
				success: (res) => {
					console.log(res);
					var res = res.listings.listing
					for (var i = 0; i < res.length; i++) {
						var title = $("<h2>").text(res[i].title);
						var desc = res[i].description;
						$("#jobsContainer").append(title, desc);
					}
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

		var newItemInput = $("input.new-item");
		var goalContainer = $(".goal-container");

		$(document).on("click", "button.delete", deleteGoal);
		$(document).on("click", "button.complete", toggleComplete);
		$(document).on("click", ".goal-item", editGoal);
		$(document).on("keyup", ".goal-item", finishEdit);
		$(document).on("blur", ".goal-item", cancelEdit);
		$(document).on("submit", "#goal-form", insertGoal);

		var goals = [];

		getGoals();

		function initializeRows() {
			goalContainer.empty();
			var rowsToAdd = [];
			for (var i = 0; i < goals.length; i++) {
				rowsToAdd.push(createNewRow(goals[i]));
			}
			goalContainer.prepend(rowsToAdd);
		}

		function getGoals() {
			$.get("/api/goals", function (data) {
				goals = data;
				initializeRows();
			});
		}

		function deleteGoal(event) {
			event.stopPropagation();
			var id = $(this).data("id");
			$.ajax({
				method: "DELETE",
				url: "/api/goals/" + id
			}).then(getGoals);
		}

		function editGoal() {
			var currentGoal = $(this).data("goal");
			$(this).children().hide();
			$(this).children("input.edit").val(currentGoal.text);
			$(this).children("input.edit").show();
			$(this).children("input.edit").focus();
		}

		function toggleComplete(event) {
			event.stopPropagation();
			var goal = $(this).parent().data("goal");
			goal.complete = !goal.complete;
			updateGoal(goal);
		}

		function finishEdit(event) {
			var updatedGoal = $(this).data("goal");
			if (event.which === 13) {
				updatedGoal.text = $(this).children("input").val().trim();
				$(this).blur();
				updateGoal(updatedGoal);
			}
		}

		function updateGoal(goal) {
			$.ajax({
				method: "PUT",
				url: "/api/goals",
				data: goal
			}).then(getGoals);
		}

		function cancelEdit() {
			var currentGoal = $(this).data("goal");
			if (currentGoal) {
				$(this).children().hide();
				$(this).children("input.edit").val(currentGoal.text);
				$(this).children("span").show();
				$(this).children("button").show();
			}
		}

		function createNewRow(goal) {
			var newInputRow = $(
				[
					"<li class='list-group-item goal-item text-left'>",
					"<span>",
					goal.text,
					"</span>",
					"<input type='text' class='edit' style='display: none;'>",
					"<button class='float-right complete btn btn-outline-dark ml-2'><i class='fas fa-check'></i></button>",
					"<button class='float-right delete btn btn-outline-danger'><i class='fas fa-times'></i></button>",
					"</li>"
				].join(""));

			newInputRow.find("button.delete").data("id", goal.id);
			newInputRow.find("input.edit").css("display", "none");
			newInputRow.data("goal", goal);
			if (goal.complete) {
				newInputRow.find("span").css("text-decoration", "line-through");
			}
			return newInputRow;
		}

		function insertGoal(event) {
			event.preventDefault();
			var goal = {
				text: newItemInput.val().trim(),
				complete: false,
				UserId: userId
			};

			$.post("/api/goals", goal, getGoals);
			newItemInput.val("");
		}

		// Currently Building
		var newItemInputBuild = $("input.new-item-build");
		var buildContainer = $(".build-container");

		$(document).on("click", "button.delete-build", deleteBuild);
		$(document).on("click", "button.complete-build", toggleCompleteBuild);
		$(document).on("click", ".build-item", editBuild);
		$(document).on("keyup", ".build-item", finishEditBuild);
		$(document).on("blur", ".build-item", cancelEditBuild);
		$(document).on("submit", "#build-form", insertBuild);

		var builds = [];

		getBuilds();

		function initializeRowsBuild() {
			buildContainer.empty();
			var rowsToAddBuild = [];
			for (var i = 0; i < builds.length; i++) {
				rowsToAddBuild.push(createNewRowBuild(builds[i]));
			}
			buildContainer.prepend(rowsToAddBuild);
		}

		function getBuilds() {
			$.get("/api/builds", function (data) {
				builds = data;
				initializeRowsBuild();
			});
		}

		function deleteBuild(event) {
			event.stopPropagation();
			var id = $(this).data("id");
			$.ajax({
				method: "DELETE",
				url: "/api/builds/" + id
			}).then(getBuilds);
		}

		function editBuild() {
			var currentBuild = $(this).data("build");
			$(this).children().hide();
			$(this).children("input.edit").val(currentBuild.text);
			$(this).children("input.edit").show();
			$(this).children("input.edit").focus();
		}

		function toggleCompleteBuild(event) {
			event.stopPropagation();
			var build = $(this).parent().data("build");
			build.complete = !build.complete;
			updateBuild(build);
		}

		function finishEditBuild(event) {
			var updatedBuild = $(this).data("build");
			if (event.which === 13) {
				updatedBuild.text = $(this).children("input").val().trim();
				$(this).blur();
				updateBuild(updatedBuild);
			}
		}

		function updateBuild(build) {
			$.ajax({
				method: "PUT",
				url: "/api/builds",
				data: build
			}).then(getBuilds);
		}

		function cancelEditBuild() {
			var currentBuild = $(this).data("build");
			if (currentBuild) {
				$(this).children().hide();
				$(this).children("input.edit").val(currentBuild.text);
				$(this).children("span").show();
				$(this).children("button").show();
			}
		}

		function createNewRowBuild(build) {
			var newInputRowBuild = $(
				[
					"<li class='list-group-item build-item text-left'>",
					"<span>",
					build.text,
					"</span>",
					"<input type='text' class='edit' style='display: none;'>",
					"<button class='float-right complete-build btn btn-outline-dark ml-2'><i class='fas fa-check'></i></button>",
					"<button class='float-right delete-build btn btn-outline-danger'><i class='fas fa-times'></i></button>",
					"</li>"
				].join(""));

			newInputRowBuild.find("button.delete-build").data("id", build.id);
			newInputRowBuild.find("input.edit").css("display", "none");
			newInputRowBuild.data("build", build);
			if (build.complete) {
				newInputRowBuild.find("span").css("text-decoration", "line-through");
			}
			return newInputRowBuild;
		}

		function insertBuild(event) {
			event.preventDefault();
			var build = {
				text: newItemInputBuild.val().trim(),
				complete: false,
				UserId: userId
			};

			$.post("/api/builds", build, getBuilds);
			newItemInputBuild.val("");
		}

		// Next Steps
		var newItemInputNext = $("input.new-item-next");
		var nextContainer = $(".next-container");

		$(document).on("click", "button.delete-next", deleteNext);
		$(document).on("click", "button.complete-next", toggleCompleteNext);
		$(document).on("click", ".next-item", editNext);
		$(document).on("keyup", ".next-item", finishEditNext);
		$(document).on("blur", ".next-item", cancelEditNext);
		$(document).on("submit", "#next-form", insertNext);

		var steps = [];

		getNext();

		function initializeRowsNext() {
			nextContainer.empty();
			var rowsToAddNext = [];
			for (var i = 0; i < steps.length; i++) {
				rowsToAddNext.push(createNewRowNext(steps[i]));
			}
			nextContainer.prepend(rowsToAddNext);
		}

		function getNext() {
			$.get("/api/next", function (data) {
				steps = data;
				initializeRowsNext();
			});
		}

		function deleteNext(event) {
			event.stopPropagation();
			var id = $(this).data("id");
			$.ajax({
				method: "DELETE",
				url: "/api/next/" + id
			}).then(getNext);
		}

		function editNext() {
			var currentNext = $(this).data("next");
			$(this).children().hide();
			$(this).children("input.edit").val(currentNext.text);
			$(this).children("input.edit").show();
			$(this).children("input.edit").focus();
		}

		function toggleCompleteNext(event) {
			event.stopPropagation();
			var next = $(this).parent().data("next");
			next.complete = !next.complete;
			updateNext(next);
		}

		function finishEditNext(event) {
			var updatedNext = $(this).data("next");
			if (event.which === 13) {
				updatedNext.text = $(this).children("input").val().trim();
				$(this).blur();
				updateNext(updatedNext);
			}
		}

		function updateNext(next) {
			$.ajax({
				method: "PUT",
				url: "/api/next",
				data: next
			}).then(getNext);
		}

		function cancelEditNext() {
			var currentNext = $(this).data("next");
			if (currentNext) {
				$(this).children().hide();
				$(this).children("input.edit").val(currentNext.text);
				$(this).children("span").show();
				$(this).children("button").show();
			}
		}

		function createNewRowNext(next) {
			var newInputRowNext = $(
				[
					"<li class='list-group-item next-item text-left'>",
					"<span>",
					next.text,
					"</span>",
					"<input type='text' class='edit' style='display: none;'>",
					"<button class='float-right complete-next btn btn-outline-dark ml-2'><i class='fas fa-check'></i></button>",
					"<button class='float-right delete-next btn btn-outline-danger'><i class='fas fa-times'></i></button>",
					"</li>"
				].join(""));

			newInputRowNext.find("button.delete-next").data("id", next.id);
			newInputRowNext.find("input.edit").css("display", "none");
			newInputRowNext.data("next", next);
			if (next.complete) {
				newInputRowNext.find("span").css("text-decoration", "line-through");
			}
			return newInputRowNext;
		}

		function insertNext(event) {
			event.preventDefault();
			var next = {
				text: newItemInputNext.val().trim(),
				complete: false,
				UserId: userId
			};

			$.post("/api/next", next, getNext);
			newItemInputNext.val("");
		}
	});