function set_content_view(phase_id,sprint_id,content_id,content_type, is_overview, is_dashboard, is_test_view) {
    if(is_overview == 1 || is_dashboard==1 || is_test_view==1 || content_type == CONTENT_GROUP_TEST) {
        if (content_type == CONTENT_GROUP_TEST) {
            window.location.href= base_url+'student/lesson/content-test/'+phase_id+'/'+sprint_id+'/'+content_id;
        } else {
            window.location.href= base_url+'student/lesson/content-view/'+phase_id+'/'+sprint_id+'/'+content_id+'/'+content_type;
        }
    }
    else {
        load_content_wrapper(phase_id,sprint_id,content_id,content_type);
    }
}

function set_url(url) {
    var refresh = url;
    window.history.pushState({ path: refresh }, '', refresh);
}

function reload_predict_card(phase_id, sprint_id, content_id) {
    var post_data = {
        content_id: content_id,
        phase_id: phase_id,
        sprint_id: sprint_id
    }
    show_ajax_loader();
    $('#predict_'+content_id).fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/lesson/get_predict_card',
            post_data,
            function(data){
                if (data['success']) {
                    $('#predict_'+content_id).replaceWith(data['predict_card']);
                }
                else {
                    $('#lightbox-body').html("<h2>Error</h2><p>" + data['message'] + "</p>");
                    $("#lightbox").fadeIn();
                }
                $('#predict_'+content_id).fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function set_announcement_view(announcement_id) {
    var post_data = {
        announcement_id: announcement_id
    }
    show_ajax_loader();
    $('.content-area').fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/announcements/get_announcement_details',
            post_data,
            function(data){
                if (data['success']) {
                    $('#an_title').html(data['an_title']);
                    $('#an_body').html(data['an_announcement']);
                    $("#step1 li").removeClass("active");
                    $("#nav_"+announcement_id).addClass("active");
                }
                else {
                    $('#an_title').html('');
                    $('#an_body').html('Something wrong with this announcement.');
                }
                $('.content-area').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function get_announcements_from_programme() {
    var selected_value = $.trim($('#cr_programme_id').val());
    var selected_value_split = selected_value.split('_');
    var programme_id = selected_value_split[0];

    var post_data = {
        'programme_id':programme_id
	};

	$('.course-sec').fadeTo('slow', 0.2, function() {
		$.post(
			base_url+'student/announcements/get_dashboard',
			post_data,
			function(data){
			    if (data['success'] == 1) {	
                    $('.course-sec').html(data['html']);
                    set_technical_thrive();
                    if(typeof(data['top_bar_buttons'])!=='undefined')
                    {
                        $('.topbar_buttons').html(data['top_bar_buttons']);
                    }
                    var url = base_url+'student/dashboard';
                    set_url(url);
			    } else {
                   window.location.href= data['url'];
			    }
				$('.course-sec').fadeTo('slow', 1);
			},
			'json'
		);
	});
}

function load_announcement_from_programme() {
    var programme_id = document.getElementById("cr_programme_id").value;
    window.location.href= base_url+'student/announcements/list_items/'+programme_id;
}

function set_meeting_view(meeting_id) {
    var post_data = {
        meeting_id: meeting_id
    }
    show_ajax_loader();
    $('.content-area').fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/meetings/get_meeting_details',
            post_data,
            function(data){
                if (data['success']) {
                    $('.content-area').html(data['me_content']);
                    $("#step1 li").removeClass("active");
                    $("#nav_"+meeting_id).addClass("active");
                }
                else {
                    $('.content-area').html('');
                }
                $('.content-area').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}


function load_meeting_from_programme() {
    var programme_id = document.getElementById("cr_programme_id").value;
    window.location.href= base_url+'student/meetings/list_items/'+programme_id;
}