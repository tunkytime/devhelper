	var apiKeyNews = "9d7028e6fd84446a83379f5c12519956";
	var apiKeyJobs = "a5ce6768d167cf7224dd2182eb9b14d4";
	var apiKeyQuotes = "eLaLSi9Uu337QxcUwX1_sAeF";
	var baseUrlNews = "https://newsapi.org/v2/everything?q=technology&pageSize=100&apiKey=" + apiKeyNews;
	var baseUrlJobs = "https://authenticjobs.com/api/?api_key=" + apiKeyJobs + "&method=aj.jobs.search&format=json&categories=3";
	var baseUrlQuotes = "http://quotes.rest/quote/search.json?category=achieving-dreams&api_key=" + apiKeyQuotes + "&maxlength=160";

	var articles = [];
	var articleNum = 0;
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

			//Used for Saved Articles
			articleTitle = article.title;
			articleURL = article.url;
			articleImage = article.image;

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

		var $newItemInput = $("input.new-item");
		var $todoContainer = $(".todo-container");

		$(document).on("click", "button.delete", deleteTodo);
		$(document).on("click", "button.complete", toggleComplete);
		$(document).on("click", ".todo-item", editTodo);
		$(document).on("keyup", ".todo-item", finishEdit);
		$(document).on("blur", ".todo-item", cancelEdit);
		$(document).on("submit", "#todo-form", insertTodo);

		var todos = [];

		getTodos();

		function initializeRows() {
			$todoContainer.empty();
			var rowsToAdd = [];
			for (var i = 0; i < todos.length; i++) {
				rowsToAdd.push(createNewRow(todos[i]));
			}
			$todoContainer.prepend(rowsToAdd);
		}

		function getTodos() {
			$.get("/api/goals", function (data) {
				todos = data;
				initializeRows();
			});
		}

		function deleteTodo(event) {
			event.stopPropagation();
			var id = $(this).data("id");
			$.ajax({
				method: "DELETE",
				url: "/api/goals/" + id
			}).then(getTodos);
		}

		function editTodo() {
			var currentTodo = $(this).data("todo");
			$(this).children().hide();
			$(this).children("input.edit").val(currentTodo.text);
			$(this).children("input.edit").show();
			$(this).children("input.edit").focus();
		}

		function toggleComplete(event) {
			event.stopPropagation();
			var todo = $(this).parent().data("todo");
			todo.complete = !todo.complete;
			updateTodo(todo);
		}

		function finishEdit(event) {
			var updatedTodo = $(this).data("todo");
			if (event.which === 13) {
				updatedTodo.text = $(this).children("input").val().trim();
				$(this).blur();
				updateTodo(updatedTodo);
			}
		}

		function updateTodo(todo) {
			$.ajax({
				method: "PUT",
				url: "/api/goals",
				data: todo
			}).then(getTodos);
		}

		function cancelEdit() {
			var currentTodo = $(this).data("todo");
			if (currentTodo) {
				$(this).children().hide();
				$(this).children("input.edit").val(currentTodo.text);
				$(this).children("span").show();
				$(this).children("button").show();
			}
		}

		function createNewRow(todo) {
			var $newInputRow = $(
				[
					`<li class="list-group-item todo-item">
					<span>
					${todo.text}
					</span>
					<input type="text" class="edit" style="display: none;">
					<button class="delete btn btn-danger">x</button>
					<button class="complete btn btn-primary">✓</button>
					</li>`
				].join("")
			);

			$newInputRow.find("button.delete").data("id", todo.id);
			$newInputRow.find("input.edit").css("display", "none");
			$newInputRow.data("todo", todo);
			if (todo.complete) {
				$newInputRow.find("span").css("text-decoration", "line-through");
			}
			return $newInputRow;
		}

		function insertTodo(event) {
			event.preventDefault();
			var todo = {
				text: $newItemInput.val().trim(),
				complete: false,
				UserId: userId
			};

			$.post("/api/goals", todo, getTodos);
			$newItemInput.val("");
		}
	});