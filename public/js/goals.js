// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
    saveGoal: function (example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/goals",
            data: JSON.stringify(example)
        });
    },
    getGoals: function () {
        return $.ajax({
            url: "api/goals",
            type: "GET"
        });
    },
    deleteGoal: function (id) {
        return $.ajax({
            url: "api/goals/" + id,
            type: "DELETE"
        });
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshGoals = function () {
    API.getGoals().then(function (data) {
        var $examples = data.map(function (example) {
            var $a = $("<a>")
                .text(goal.title)
                .attr("href", "/goal/" + goal.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": goal.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();

    var goal = {
        title: $exampleText.val().trim(),
        body: $exampleDescription.val().trim()
    };

    if (!(goal.title && goal.body)) {
        alert("You must enter an example text and description!");
        return;
    }

    API.saveGoal(goal).then(function () {
        refreshGoals();
    });

    $exampleText.val("");
    $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteGoal(idToDelete).then(function () {
        refreshGoals();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
