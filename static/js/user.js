var requrlpost;
var addfriend;
var id;

$(function () {
    var url = document.location.href;
    url = url.substr(url.indexOf('?') + 1);
    url = url.split('&');
    var params = {};
    for (var i in url) {
        var arr = url[i].split('=');
        params[arr[0]] = arr[1];
    }

    id = params.id;

    var requrl1 = '/api/users/' + params.id + '/info';
    var requrl2 = '/api/users/' + params.id + '/posts';
    var requrl3 = '/api/messages/' + params.id;
    requrlpost = requrl2;
    addfriend = '/api/friends/' + params.id;

    $.get(requrl1, function (data) {
        $("#nameuser").append("<h3>" + data.name + " " + data.surname + "</h3>");
        $("#info").append("<span class='label label-primary'>" + data.location + "</span>");
        $("#info").append("<span class='label label-info'>" + data.birtdate + "</span>")

    });

    $.get(requrl2, function (data) {
        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';
            $.get(url, function (data2) {
                $("#wall").append("<div class='post col-lg-12'><b>" + data2.name + ":</b> " + post.message + "</div>");
            });
        });
        $("#light-pagination").pagination({
            items: data.count,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            onPageClick: function (page_number) {
                $("#wall").empty();
                $.get(requrl2, {page: page_number}, function (data) {
                    data.rows.forEach(function (post) {
                        var url = '/api/users/' + post.sender + '/info';
                        $.get(url, function (data2) {
                            $("#wall").append("<div class='post col-lg-12'><b>" + data2.name + ":</b> "
                                + post.message + "</div>");
                        });
                    });
                });
            }
        });
    });

    $.get("/api/friends", function (data) {
        data.rows.forEach(function (friend) {
            if (friend.id == params.id)
                $("#addfriend").attr('disabled', true);
        });
    });

    $(".btn").click(function () {
        $("#myModal").modal('show');
    });

    $("#sendmsg").click(function () {
        toastr.success("Пост Добавлен!");
        $.post(requrl3, {text: $("#message").val()});

    });

    $("#historymsg").click(function () {
        var friendid = $(this).attr("id");
        window.location = "history.html?id=" + id;
    });


});


function refreshWall(req) {
    $("#wall").empty();
    $.get(req, function (data) {
        $("#light-pagination").pagination({
            items: data.count,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            onPageClick: function (page_number) {
                $("#wall").empty();
                $.get(requrl2, {page: page_number}, function (data) {
                    data.rows.forEach(function (post) {
                        var url = '/api/users/' + post.sender + '/info';
                        $.get(url, function (data2) {
                            $("#wall").append("<div class='post col-lg-12'><b>" + data2.name + ":</b> "
                                + post.message + "</div>");
                        });
                    });
                });
            }
        });
        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';
            $.get(url, function (data2) {
                $("#wall").append("<div class='post col-lg-12'><b>" + data2.name + ":</b> "
                    + post.message + "</div>");
            });
        });

    });
}

$("#walltext").keyup(function (event) {
    if (event.keyCode == 13) {
        $.post(requrlpost, {message: $("#walltext").val()}, function (data) {
            $("#walltext").val("");
            refreshWall(requrlpost);
        });
    }
});


$("#addfriend").click(function () {
    $.post(addfriend, {}, function (data) {
        $("#addfriend").attr('disabled', true);
        toastr.success("Добавлен в друзья!");
    });
});


$("#addmessage").click(function () {
    $("#mymodal").show();
});