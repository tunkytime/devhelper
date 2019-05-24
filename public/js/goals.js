$(document).ready(function(){

    $("form").on("submit", function(){

        event.preventDefault();

        var todo = $("#form-input").val().trim()
        
        $.ajax("/todos", {
            type: "POST",
            url: "/todo",
            data: "todo",
            success: function(data){
                location.reload();
            }
        });
        console.log(todo);
        return false;
    });

    $("li").on("click", function(){
        var item = $(this).text().replace(/ /g, "-");
        
        $.ajax({
            type: "DELETE",
            url: "/todo/" + item,
            success: function (data){
                location.reload();
            }
        });
    });
});
