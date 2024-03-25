$(document).ready(function () {
    $("#fp_email").keydown(function (e) {
        if (e.keyCode == 13) {
            forgot_password_email_submit();
        }
    });

    $("#fp2_password").keydown(function (e) {
        if (e.keyCode == 13) {
            password_submit();
        }
    });
});
var popup_message = '';

var curriculum_programme_id = 0;
var curriculum_class_id = 0;

function set_login() {
    $('#password').keydown(function (e) {
        if (e.keyCode == 13) {
            login();
        }
    });
}

function login() {
    var username = $.trim($('#username').val());
    var password = $.trim($('#password').val());
    if (!username || !password) {
        alert('Please enter Username and Password');
    } else {
        var post_data = {
            'username': username,
            'password': password
        };
        post_data = add_csrf(post_data,'login_wrapper');
        $('#login_wrapper').fadeTo('slow', 0.2, function () {
            $.post(
                base_url + 'home/check_login',
                post_data,
                function (data) {
                    if (data['success'] == 1) {
                        location.href = base_url + data['url'];
                    } else {
                        alert(data['message']);
                    }

                    $('#login_wrapper').fadeTo('slow', 1);
                },
                'json'
            );
        });
    }
}

function password() {
    var current_password = $.trim($('#current_password').val());
    var new_password = $.trim($('#new_password').val());
    var confirm_password = $.trim($('#confirm_password').val());

    if (!current_password || !new_password || !confirm_password) {
        alert('Please enter Passwords');
    } else if (new_password != confirm_password) {
        alert('Passwords does not match');
    } else {
        var post_data = {
            'current_password': current_password,
            'new_password': new_password
        };

        $('.password-wrapper').fadeTo('slow', 0.2, function () {
            $.post(
                base_url + 'user/change-password?rand=' + Math.random(),
                post_data,
                function (data) {
                    alert(data['message']);

                    if (data['success'] == 1) {
                        location.href = base_url;
                    }

                    $('.password-wrapper').fadeTo('slow', 1);
                },
                'json'
            );
        });
    }
}

function logout() {
    $('body').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'home/logout?rand=' + Math.random(),
            function (data) {
                if (data['success'] == 1) {
                    if (data['logout_redirect_url']) {
                        location.href = data['logout_redirect_url'];
                    } else {
                        location.href = base_url;
                    }
                } else {
                    alert(data['message']);
                }

                $('body').fadeTo('slow', 1);
            },
            'json'
        );
    });
}

function redirect(url) {
    location.href = url;
}

function set_current_date() {
    var current_date = $.trim($('#current_date').val());

    if (!current_date) {
        alert('Please enter Date');
    } else {
        var post_data = {
            'current_date': current_date
        };

        $('#main_body').fadeTo('slow', 0.2, function () {
            post_data = add_csrf(post_data,'frm_date');
            $.post(
                base_url + 'student/dashboard/set_current_date',
                post_data,
                function (data) {
                    if (data['success'] == 1) {
                        location.href = base_url + 'student/dashboard';
                    } else {
                        alert(data['message']);
                    }

                    $('#main_body').fadeTo('slow', 1);
                },
                'json'
            );
        });
    }
}

function lesson_set_current_date() {
    var current_date = $.trim($('#current_date').val());

    if (!current_date) {
        alert('Please enter Date');
    } else {
        var post_data = {
            'current_date': current_date
        };

        $('.main-outer').fadeTo('slow', 0.2, function () {
            post_data = add_csrf(post_data,'frm_date');
            $.post(
                base_url + 'student/dashboard/set_current_date',
                post_data,
                function (data) {
                    if (data['success'] == 1) {
                        location.href = base_url + 'student/dashboard';
                    } else {
                        alert(data['message']);
                    }

                    $('.main-outer').fadeTo('slow', 1);
                },
                'json'
            );
        });
    }
}

function set_student_programme(programme_id, programme_type, class_id) {
    if (programme_id) {
        var post_data = {
            'programme_id': programme_id,
            'programme_type': programme_type,
            'class_id': class_id
        };

        $('#main_body').fadeTo('slow', 0.2, function () {
            $.post(
                base_url + 'student/dashboard/set-student-programme?rand=' + Math.random(),
                post_data,
                function (data) {
                    location.href = base_url + 'student/curriculum/index/' + programme_id;
                },
                'json'
            );
        });

    }
}

function forgot_password_email_submit() {
    var email = $.trim($('#fp_email').val());
    if (email) {
        var post_data = {
            'email': email
        };
        $('.lightbox-body').fadeTo('slow', 0.2, function () {
            $.post(
                base_url + 'home/forgot_password_email?rand=' + Math.random(),
                post_data,
                function (data) {
                    if (data['success'] == 1) {
                        $(".lightbox-body").fadeTo('slow', 1);
                        alert(data['message']);
                        location.href = base_url;
                    } else {
                        $(".lightbox-body").fadeTo('slow', 1);
                        alert('An email has been sent to your email address.');
                    }

                    $('.lightbox-body').fadeTo('slow', 1);
                },
                'json'
            );
        });
    } else {
        alert('Please enter Email');
    }
}

function password_submit() {
    var password = $.trim($('#fp2_password').val());
    var username = $.trim($('#fp2_username').val());
    var post_data = {
        'password': password,
        'username': username
    };
    $('.lightbox-body').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'home/password_new?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    $(".lightbox-body").fadeTo('slow', 1);
                    alert(data['message']);
                    location.href = base_url;
                } else {
                    $(".lightbox-body").fadeTo('slow', 1);
                    var message_text = data['message'];
                    if (Array.isArray(data['message_arr'])) {
                        message_text = data['message_arr'].join("\n");
                    }
                    BootstrapDialog.show({
                        title: 'Error',
                        buttons: [{
                            label: 'OK',
                            cssClass: 'BG-blue white',
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }],
                        message: message_text
                    });
                }

                $('.lightbox-body').fadeTo('slow', 1);
            },
            'json'
        );
    });
}

function get_curriculum_in_dashboard() {
    var selected_value = $.trim($('#cr_programme_id').val());
    var selected_value_split = selected_value.split('_');
    var cr_programme_id = selected_value_split[0];

    curriculum_programme_id = cr_programme_id;
    curriculum_class_id = selected_value_split[1];

    var cr_programme_type = selected_value_split[2];

    var post_data = {
        'programme_id': cr_programme_id,
        'class_id': curriculum_class_id,
        'programme_type': cr_programme_type
    };

    $('#student_dashboard').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/dashboard/get_curriculum?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    location.reload();
                } else {
                    alert(data['message']);
                }
            },
            'json'
        );
    });
}

function get_curriculum() {
    var selected_value = $.trim($('#cr_programme_id').val());
    var selected_value_split = selected_value.split('_');
    var cr_programme_id = selected_value_split[0];

    curriculum_programme_id = cr_programme_id;
    curriculum_class_id = selected_value_split[1];

    var cr_programme_type = selected_value_split[2];

    var post_data = {
        'programme_id': cr_programme_id,
        'class_id': curriculum_class_id,
        'programme_type': cr_programme_type
    };

    $('#curriculum_container').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/curriculum/get_curriculum?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    $('#curriculum_pr_sp_container').html(data['html']);
                } else {
                    alert(data['message']);
                }

                $('#curriculum_container').fadeTo('slow', 1);
            },
            'json'
        );
    });
}

function set_single_login() {
    var mul_id = $('#single_login').val();

    location.href = base_url + 'home/multi_user/' + mul_id;
}

function show_popup_message() {
    $('#popup_message_container').html(popup_message);
    $("#Message-lightbox").fadeIn();
    $("html").addClass('popup-open');
}

function hide_popup_message() {
    $('#popup_message_container').html('');
    $("#Message-lightbox").fadeOut();
    $("html").removeClass('popup-open');
}

function set_admission_login() {
    var post_data = {};

    $('body').fadeTo('slow', 0.2, function () {
        $.post(
            base_url + 'student/dashboard/set_admission_login?rand=' + Math.random(),
            post_data,
            function (data) {
                if (data['success'] == 1) {
                    var url = admission_url + 'home/athena-login/' + data['code'];
                    window.open(url, '_blank');
                } else {
                    popup_message = data['message'];
                    show_popup_message();
                }

                $('body').fadeTo('slow', 1);
            },
            'json'
        );
    });
}

function show_ajax_loader() {
    $('#div_ajax_loader').css('display', 'block');
}

function hide_ajax_loader() {
    $('#div_ajax_loader').css('display', 'none');
}

function show_tooltip(id) {
    $('#tl_tip_' + id).position({
        my: "left top",
        at: "left bottom",
        of: $('#tl_' + id),
        collision: "fit"
    });
    var x = $('#tl_tip_' + id).position();
    var left = x.left + 50;
    $('#tl_tip_' + id).css('left', left + 'px');
    $('#tl_tip_' + id).css('visibility', 'visible');
}

function hide_tooltip(id) {
    $('#tl_tip_' + id).css('visibility', 'hidden');
}

function add_csrf(post_data,form_id)
{
   var csrf_name = $("#"+form_id+" .csrf_token").attr('name');
   var csrf_value = $.trim($("#"+form_id+" .csrf_token").val());
   if (csrf_name && csrf_value) {
       post_data[csrf_name] = csrf_value;
   }
   return post_data;
}

$(document).on('keyup paste', 'input[type="number"]', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
});