$(document).ready(function() {
	$(function() {
   		if($( "#tabs").length > 0){
            $( "#tabs").tabs();
        }
    });
    	   
    $(document).on("click",".todo-list ul li", function(){
        $(this).toggleClass("active");
    });
    $(document).on("click",".menu_bar_small .menu-bar-open a", function(){
        $("body").addClass("show-menubar");
    });
    $(document).on("click",".menu_bar_big a", function(){
        $("body").removeClass("show-menubar");
    });
    $(document).on("click",".admin-bar", function(){
        $(".admin-menu").slideToggle();
    });
    $(document).on("click",".course-menu > .dropdown > a", function(){
        $(this).parent().toggleClass("current");
    });
   
    $(document).on("click",".course-menu .dropdown .main-submenu .dropdown > a", function(){
        $(this).parent().toggleClass("current");
    });

    $(document).on("click",".course-menus-btn", function(){
        $("body").addClass("course-menusshow");
    });
    $(document).on("click",".close-btn3", function(){
        $("body").removeClass("course-menusshow");
    });
    $(document).on("click",".lesson-overview-select .lesson-select-box > ul > li > a", function(){
        $(this).next(".select-item-box").slideToggle();
    });    
});

function set_technical_thrive() {
    $(".switch-slider").click(function () {
        if($(this).hasClass('slid-rate')) {
            if ($(this).parents('.switch.slid-rate-switch').hasClass('checked')){
                $(this).parents('.switch.slid-rate-switch').removeClass('checked');
                $(this).parents('.switch.slid-rate-switch').find('input[name="rateusertype"]').prop("checked", false);
                $("#student-select-rating").show();
                $("#teacher-select-rating").hide();
            } else {
                $(this).parents('.switch.slid-rate-switch').addClass('checked');
                $(this).parents('.switch.slid-rate-switch').find('input[name="rateusertype"]').prop("checked", true);
                $("#student-select-rating").hide();
                $("#teacher-select-rating").show();
            }
        } else if($(this).hasClass('slid-dash')) {
            if ($(this).parents('.switch').hasClass('checked')){
                $(this).parents('.switch').removeClass('checked');
                $(this).parents('.switch').find('input').prop("checked", false);
                window.location.href = $(this).siblings('.before-checked').data('url');
            } else {
                $(this).parents('.switch').addClass('checked');
                $(this).parents('.switch').find('input').prop("checked", true);
                window.location.href = $(this).siblings('.after-checked').data('url');
            }
        } else {
            if(!$(this).hasClass('slid-predict')) {
                var tab = '';
                if($("#tab_index").length > 0){
                    var tab = '/'+$("#tab_index").val();
                }
                if ($(this).parents('.switch').hasClass('checked')){
                    $(this).parents('.switch').removeClass('checked');
                    $(this).parents('.switch').find('input').prop("checked", false)
                    if(technical_click_event){
                        window.location.href = technical_click_event + tab;
                    }
                    else{
                        $(this).parents('.switch').addClass('checked');
                        $(this).parents('.switch').find('input').prop("checked", true);
                        alert('Content does not exist');
                    }
                } else {
                    $(this).parents('.switch').addClass('checked');
                    $(this).parents('.switch').find('input').prop("checked", true)
                    if(life_click_event){
                        window.location.href = life_click_event + tab;
                    }
                    else{
                        $(this).parents('.switch').removeClass('checked');
                        $(this).parents('.switch').find('input').prop("checked", false);
                        alert('Content does not exist');
                    }
                }
            }
        }          
    });
    $('.before-checked').click(function () {
        var tab = '';
            if($("#tab_index").length > 0){
                var tab = '/'+$("#tab_index").val();
            }
        if($(this).hasClass('slid-bef')) {
            if ($(this).parents('.switch').hasClass('checked')){
            $(this).parents('.switch').removeClass('checked');
            $(this).parents('.switch').find('input').prop("checked", false);
            window.location.href = $(this).data('url');
            }
        } else {
            $(this).parents('.switch').removeClass('checked');
            $(this).parents('.switch').find('input').prop("checked", false);
            if(technical_click_event){
                window.location.href = technical_click_event + tab;
            } else{
                $(this).parents('.switch').addClass('checked');
                $(this).parents('.switch').find('input').prop("checked", true);
                alert('Content does not exist');
            }
        }    
    });
    $('.after-checked').click(function () {
        var tab = '';
            if($("#tab_index").length > 0){
                var tab = '/'+$("#tab_index").val();
            }
        if($(this).hasClass('slid-after')) {
            if (!$(this).parents('.switch').hasClass('checked')){
            $(this).parents('.switch').addClass('checked');
            $(this).parents('.switch').find('input').prop("checked", true);
            window.location.href = $(this).data('url');
            }
        } else {
            $(this).parents('.switch').addClass('checked');
            $(this).parents('.switch').find('input').prop("checked", true);
            if(life_click_event){
                window.location.href = life_click_event + tab;
            }
            else{
                $(this).parents('.switch').removeClass('checked');
                $(this).parents('.switch').find('input').prop("checked", false);
                alert('Content does not exist');
            }
        }
    });
}
