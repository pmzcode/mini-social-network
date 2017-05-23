$(function () {


    $.get('/api/posts',{type:"all"}, function (data) {

        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';
            var url2 = '/api/users/' + post.receiver + '/info';
            $.get(url, function (data2) {
                $.get(url2, function (data3) {
                    $("#wall").append("<div class='post col-lg-4 news'><b>" + data2.name + " " + data2.surname + "<br/></b> "
                        + data3.name+" "+data3.surname+"<br/><span class='msgstyle'>"+ post.message+"</span>"+
                        "<br/>"+post.date+"</div>");
                });
            });
        });

        $("#light-pagination").pagination({
            items: data.count,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            onPageClick: function (page_number) {
                $.get('/api/posts', {page: page_number,type:"all"}, function (data) {
                    $("#wall").empty();
                    data.rows.forEach(function (post) {
                        var url = '/api/users/' + post.sender + '/info';
                        var url2 = '/api/users/' + post.receiver + '/info';
                        $.get(url, function (data2) {
                            $.get(url2, function (data3) {
                                $("#wall").append("<div class='post col-lg-4 news'><b>" + data2.name + " " + data2.surname + "<br/></b> "
                                    + data3.name+" "+data3.surname+"<br/><span class='msgstyle'>"+ post.message+"</span>"+
                                    "<br/>"+post.date+"</div>");
                            });
                        });
                    });
                });
            }
        });
    });
});



function refreshWall(){
    $("#wall").empty();
    $.get('/api/posts', function (data) {
        $("#light-pagination").pagination({ items: data.count,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            onPageClick: function (page_number) {
                $.get('/api/posts', {page: page_number,type: "all"}, function (data) {
                    $("#wall").empty();
                    data.rows.forEach(function (post) {
                        var url = '/api/users/' + post.sender + '/info';
                        var url2 = '/api/users/' + post.receiver + '/info';
                        $.get(url, function (data2) {
                            $.get(url2, function (data3) {
                                $("#wall").append("<div class='post col-lg-4 news'><b>" + data2.name + " " + data2.surname + "<br/></b> "
                                    + data3.name+" "+data3.surname+"<br/><span class='msgstyle'>"+ post.message+"</span>"+
                                    "<br/>"+post.date+"</div>");
                            });
                        });
                    });
                });
            }})
        data.rows.forEach(function (post) {
            var url = '/api/users/' + post.sender + '/info';
            var url2 = '/api/users/' + post.receiver + '/info';
            $.get(url, function (data2) {
                $.get(url2, function (data3) {
                    $("#wall").append("<div class='post col-lg-4 news'><b>" + data2.name + " " + data2.surname + "<br/></b> "
                        + data3.name+" "+data3.surname+"<br/><span class='msgstyle'>"+ post.message+"</span>"+
                        "<br/>"+post.date+"</div>");
                });
            });
        });
    });
}


$("#logout").click(function () {
    $.ajax({
        url: '/api/sessions',
        type: 'DELETE'
    });
})



