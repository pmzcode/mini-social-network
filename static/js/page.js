$(function() {

    $.get('/api/info', function(data) {
        $("#nameuser").append("<h3>"+data.name+" "+data.surname+"</h3>");
        $("#info").append("<span class='label label-primary'>"+data.location+"</span>");
        $("#info").append("<span class='label label-info'>"+data.birtdate+"</span>")

    });

    $.get('/api/posts', function(data) {
        data.forEach( function (post){
            var url = '/api/users/' + post.sender +'/info';
            $.get(url, function(data2) {
                $("#wall").append("<div class='post col-lg-12'><b>"+ data2.name+":</b> "
                    + post.message+"<button class='delbtn' id='"+post.id+"' onclick='deletePost("+post.id+")'>" +
                    "<img class='delimg' src='img\\close.ico'></button></div>");
            });
        });
    });


});

function deletePost (id){
    $.ajax({
        url: '/api/posts',
        data: {post_id:id},
        type: 'DELETE',
        success: function(result) {
            var id2 = "#"+id;
            alert(id2);
            $(id2).parent().remove();
        }
    });
}

$("#walltext").keyup(function(event){
    if(event.keyCode == 13){
        $.post('/api/posts',{message:$("#walltext").val()}, function(data) {
            $("#wall").append('<div class="post col-lg-12">'+ $("#walltext").val() + '</div>');
        });
    }
});



