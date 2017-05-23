$(function() {

    $.get('/api/friends', function(data) {

        data.rows.forEach( function (friend) {
            var url = '/api/users/' + friend.id+'/info';
            $.get(url, function (info) {

                $("#friends").append("<div class='post col-lg-12' id='"+friend.id+"'>"+info.name+" "+info.surname+"</div>");
            });
        });
        $("#light-pagination").pagination({
            items: data.count,
            itemsOnPage: 10,
            cssStyle: 'light-theme',
            onPageClick: function (page_number) {
                $("#friends").empty();
                $.get('/api/friends',{page:page_number}, function(data) {
                    data.rows.forEach( function (friend) {
                        var url = '/api/users/' + friend.id+'/info';
                        $.get(url, function (info) {
                            $("#friends").append("<div class='post col-lg-12' id='"+friend.id+"'>"+info.name+" "+info.surname+"</div>");
                        });
                    });
                });
            }
        });
    });



});

$('#friends').on('click','.post',function(){
    var friendid = $(this).attr("id");
    window.location = "user.html?id="+friendid;
});