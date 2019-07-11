$(document).ready(function () {
    function navCut () {
        var url = window.location.href;
        $('.navbar-nav li').each(function (index, ele) {
            if ($(ele).children('a')[0].href === url) {
                $('.navbar-nav .active').removeClass('active');
                $(ele).addClass('active');
            }
        })
    }
    navCut()
});