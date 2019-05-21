// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $accompList = $("#accomp-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  moveGoal: function (id){
    return $.ajax({
      url: "api/examples/" + id,
      type: "PUT",
      //data: "completed"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id)
        .attr("href", "/example/" + example.completed);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = [
      $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Delete")
      ];
      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
  console.log("example");
  console.log(example);
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
  //  description: $exampleDescription.val().trim()
    completed: false
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  //$exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// var handleMoveBtnClick = function(){
//   var idToMove = $(this).
//     parent()
//     .attr("data-id");

//     var accomplished = $(this).data("accomplished");
//     var accomplishedState = {
//       accomp: accomplished
//     };
//     console.log("move button pressed");
//     API.moveGoal(idToMove).then(function(){
//       refreshExamples();
//     })

    // $.ajax("/api/examples/" + id, {
    //   type: "PUT",
    //   data: accomplishedState
    // }).then(
    //   function() {
    //     console.log("new Accomplishment", accomplished);
    //     // Reload the page to get the updated list
    //     location.reload();
    //   }
    // );
//};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
//$exampleList.on("click",".move", handleMoveBtnClick); 