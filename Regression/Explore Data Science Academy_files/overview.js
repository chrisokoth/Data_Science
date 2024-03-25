$( document ).ready(function() {
    if($('li.active-content').length > 0){
        var activID = $('li.active-content').attr("id")
        var activElem = document.getElementById(activID);
        activElem.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
        });
    }
});


function get_overview_content_from_programme() {
    var selected_value = $.trim($('#cr_programme_id').val());
    var selected_value_split = selected_value.split('_');
    var programme_id = selected_value_split[0];
    var class_id = selected_value_split[1];
    var programme_type = selected_value_split[2];

    var post_data = {
        'programme_id': programme_id,
        'class_id': class_id,
        'programme_type': programme_type
    };
    show_ajax_loader();
    $('.course-sec').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/lesson/get_overview?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    var url = base_url + 'student/lesson/overview/' + data['phase_id'] + '/' + data['sprint_id'];
                    set_url(url);

                    if (data['is_life_sprint'] == 1) {
                        $('.switch').removeClass('checked');
                        if (data['is_thrive']) {
                            $('.switch').addClass('checked');
                        }
                        $('.before-checked').attr('data-url', base_url + 'student/lesson/overview/' + data['technical_phase_id'] + '/' + data['technical_sprint_id']);
                        $('.after-checked').attr('data-url', base_url + 'student/lesson/overview/' + data['life_phase_id'] + '/' + data['life_sprint_id']);
                        $('.switch').css('display', 'block');
                    } else {
                        $('.switch').css('display', 'none');
                    }

                    $('.course-sec').html(data['html']);
                } else {
                    window.location.href = data['url'];
                }
                $('.course-sec').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function scroll_to_lesson_content(sprint_id) {
    $('.course-dis').animate({
        scrollTop: $('#lesson_content_wrapper_' + sprint_id).offset().top
    }, 3000);
}

function set_lesson_content_type() {
    $('#lesson_content_wrapper').fadeTo('slow', 0.2, function () {
        show_hide_content_type();
        $('#lesson_content_wrapper').fadeTo('slow', 1);
    });
}

function show_hide_content_type() {
    var content_type = [
        CONTENT_GROUP_PROBLEM_STATEMENT,
        CONTENT_GROUP_PRE_PROCESSING,
        CONTENT_GROUP_TRAIN,
        CONTENT_GROUP_TEST,
        CONTENT_GROUP_PREDICT
    ];

    for (var i in content_type) {
        if ($('#lesson_type_checkbox_' + content_type[i]).prop("checked") == true) {
            $('.lesson-group-' + content_type[i]).css('display', 'flex');
        } else {
            $('.lesson-group-' + content_type[i]).css('display', 'none');
        }
    }
}

function load_lesson_content() {
    var phase_id = $.trim($('#phase_id').val());

    var sprint_ids = [];
    $("input[name='sprint_ids[]']:checked").each(function () {
        sprint_ids.push(parseInt($(this).val()));
    });

    var content_types = [];
    $("input[name='content_types[]']:checked").each(function () {
        content_types.push(parseInt($(this).val()));
    });

    var post_data = {
        'phase_id': phase_id,
        'sprint_ids': sprint_ids,
        'content_types': content_types
    };
    post_data = add_csrf(post_data, 'lesson_and_content_type_filter');

    show_ajax_loader();
    $('#lesson_content_wrapper').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/lesson/load_lesson_content',
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    $("[id^=lesson_content_wrapper_]").html('');
                    for (var i in sprint_ids) {
                        $('#lesson_content_wrapper_' + sprint_ids[i]).html(data['content_listing_html'][sprint_ids[i]]);
                    }

                    $('#ul_sprints').css('display', 'none');
                    $('#ul_content_type').css('display', 'none');
                    $('#lesson_content_wrapper').fadeTo('slow', 1);

                    hide_ajax_loader();
                } else {
                    window.location.href = data['url'];
                }
            },
            'json'
        );
    });
}

function get_phase_change_in_overview() {
    var phase_id = $.trim($('#phase_id').val());
    var post_data = {
        'phase_id': phase_id
    };
    show_ajax_loader();
    $('.course-sec').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/lesson/get_phase_overview?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    var url = base_url + 'student/lesson/overview/' + data['phase_id'] + '/' + data['sprint_id'];
                    set_url(url);

                    $('.course-sec').html(data['html']);
                } else {
                    window.location.href = data['url'];
                }
                $('.course-sec').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function load_content_wrapper(phase_id, sprint_id, content_id, content_type) {
    show_ajax_loader();
    $('.course-sec').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/lesson/content_view/' + phase_id + '/' + sprint_id + '/' + content_id + '/' + content_type + '?rand=' + Math.random(),
            function (data) {
                if (data['success'] == 1) {
                    var url = base_url + 'student/lesson/content-view/' + phase_id + '/' + sprint_id + '/' + content_id + '/' + content_type;
                    set_url(url);
                    set_active(content_id);
                    $('#content_area').html(data['content_html']);
                    $('#content_buttons_container').html(data['content_buttons_html']);
                } else {
                    window.location.href = base_url + 'student/lesson/content_view/' + phase_id + '/' + sprint_id + '/' + content_id + '/' + content_type;
                }
                $('.course-sec').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function set_active(content_id) {
    $('.course-menu li').removeClass('active-content');
    $('#nav_' + content_id).addClass('active-content')
}

function view_rubric_template(template_id) {
    var post_data = {
        'template_id': template_id
    };
    $.post(
        base_url+'student/lesson-predict/rubric_template',
        post_data,
        function(data)
        {
			if (data['success'] == 1) {
				$('#lightbox-ir-body').html(data['html']);
		    } else {
				$('#lightbox-ir-body').html(data['message']);
		    }
		},
		'json'
    );
    $("#lightbox-ir").fadeIn();
}

function view_rubric_mark(phase_id, sprint_id, template_id) {
    var post_data = {
        'phase_id': phase_id,
        'sprint_id': sprint_id,
        'template_id': template_id
    };
    $.post(
        base_url+'student/lesson-predict/rubric_mark',
        post_data,
        function(data)
        {
			if (data['success'] == 1) {
				$('#lightbox-ir-body').html(data['html']);
		    } else {
				$('#lightbox-ir-body').html(data['message']);
		    }
		},
		'json'
    );
    $("#lightbox-ir").fadeIn();
}

function checkFileUpload(current_prediction_type) {
    if(current_prediction_type == PREDICT_SECTION_TYPE_FILE_UPLOAD || current_prediction_type == PREDICT_SECTION_TYPE_AUTOGRADED) {
       const selected_file =  $.trim($('.ajax-file-upload-filename').text());
       if((selected_file)) {
           $('#lightbox-body').html("<h2>Warning</h2><p>You have not uploaded "+ selected_file +". Click Upload to complete the upload.</p>");
               $("#lightbox").fadeIn();
           return false;
       }
    }
    return true;
}