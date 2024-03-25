function openSetResourceComplete(){
    $("#lightbox").fadeIn();
	var content = $('#setResourceCompleteModal').html();
	$('#lightbox-body').html(content);
}
function set_resource_completed(phase_id,sprint_id,resource_id) {
    show_ajax_loader();
    var post_data = {};

    $('#lightbox-body').fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/lesson-preprocessing/set-resource-completed/'+phase_id+'/'+sprint_id+'/'+resource_id+'/?rand='+Math.random(),
            post_data,
            function(data){
                if (data['success'] == 1) {
                    $('.lightbox-close').click();
                    $('#status_completed').html(data['html']);
                    $('#content_progress_bar').css('width','100%');
                    $("#content_status").removeClass('status-incomplete').addClass('status-completed').text('Completed');
                    $("#nav_"+resource_id+" a").addClass('done');
                } else {
                    $('#error_message').css('display','block');
                    $('#error_message').html(data['message']);
                }
                $('#lightbox-body').fadeTo('slow', 1);
                hide_ajax_loader();
            },
            'json'
        );
    });
}

function set_pre_processing_rating(rating,content_id) {
    var post_data = {
        'rating':rating,
        'content_id':content_id
    };
    $('#pre_processing_rating_wrapper').fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/lesson-preprocessing/set_pre_processing_rating?rand='+Math.random(),
            post_data,
            function(data){
                if (data['success'] == 1) {
                    $('#p_rating_text').html('You rated this pre-processing');
                    $('#pre_processing_rating_wrapper').html(data['html']);
                } else {
                    $("#lightbox").fadeIn();
                    $('#lightbox-body').html("<h2>Error</h2><p>"+data['message']+"</p>");
                }
                $('#pre_processing_rating_wrapper').fadeTo('slow', 1);
            },
            'json'
        );
    });
}

function delete_pre_processing_rating(rating,content_id) {
    var post_data = {
        'rating':rating,
        'content_id':content_id
    };
    $('#pre_processing_rating_wrapper').fadeTo('slow', 0.2, function() {
        $.post(
            base_url+'student/lesson-preprocessing/delete_pre_processing_rating?rand='+Math.random(),
            post_data,
            function(data){
                if (data['success'] == 1) {
                    $('#p_rating_text').html('Rate this pre-processing');
                    $('#pre_processing_rating_wrapper').html(data['html']);
                } else {
                    $("#lightbox").fadeIn();
                    $('#lightbox-body').html("<h2>Error</h2><p>"+data['message']+"</p>");
                }
                $('#pre_processing_rating_wrapper').fadeTo('slow', 1);
            },
            'json'
        );
    });
}
