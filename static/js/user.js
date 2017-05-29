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
    var requrl4 = '/api/users/'+params.id+'/images'
    requrlpost = requrl2;
    addfriend = '/api/friends/' + params.id;

    $.get(requrl1, function (data) {
        $("#nameuser").append("<h3>" + data.name + " " + data.surname + "</h3>");
        if(data.location != null && data.location != "")
            $("#information").append("<p class='text-center h4' >Местоположение:</p><p class='text-center h4' >" + data.location+"</p>" );
        if(data.birtdate != null && data.birtdate != "")
            $("#information").append("<p class='text-center h4' >День рождения:</p><p class='text-center h4' >" + data.birtdate+"</p>" );
        if(data.phone != null && data.phone != "")
            $("#information").append("<p class='text-center h4' >Телефон:</p><p class='text-center h4' >" + data.phone+"</p>" );
        if(data.about != null && data.about != "")
            $("#information").append("<p class='text-center h4' >О себе:</p><p class='text-center h4' >" + data.about+"</p>" );
        if(data.status != null && data.status != "")
            $("#centerblock").prepend("<div class='col-lg-12' id='status'><blockquoteq class='text-center h4' >" + data.status+"</blockquoteq></div>");

    });


    $.ajax({
        url: requrl4,
        type: "GET",
        success: function (data) {
            $("#avatar").attr('src',data.path);
        },
        error: function () {
            $("#avatar").attr('src',"/img/2.jpg");
        }
    })



    $.get(requrl2, function (data) {
        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';

            $.ajax({
                url: url,
                async: false,
                type: "GET",
                success: function (data2) {
                    $("#wall").append("<div class='post col-lg-12'><b>" + data2.name+" "+data2.surname  + ":</b> " + post.message + "</div>");
                }
            })
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
                        $.ajax({
                            url: url,
                            async: false,
                            type: "GET",
                            success: function (data2) {
                                $("#wall").append("<div class='post col-lg-12'><b>" +  data2.name+" "+data2.surname + ":</b> "
                                    + post.message + "</div>");
                            }
                        })
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
        toastr.success("Сообщение отправлено!");
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
                        $.ajax({
                            url: url,
                            async: false,
                            type: "GET",
                            success: function (data2) {
                                $("#wall").append("<div class='post col-lg-12'><b>" + data2.name+" "+data2.surname + ":</b> "
                                    + post.message + "</div>");
                            }
                        })

                    });
                });
            }
        });
        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                success: function (data2) {
                    $("#wall").append("<div class='post col-lg-12'><b>" + data2.name+" "+data2.surname + ":</b> "
                        + post.message + "</div>");
                }
            })
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


$("#addpresent").click(function () {

    var url = "/api/gifts/"+id;
    $.post(url,{type:$("#presents option:selected").val()}, function (data2) {
        toastr.success("Подарок отправлен!!");
    });
});