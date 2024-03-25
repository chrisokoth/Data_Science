 function add_csrf(post_data,form_id)
 {
    var csrf_name = $("#"+form_id+" .csrf_token").attr('name');
    var csrf_value = $.trim($("#"+form_id+" .csrf_token").val());
    if (csrf_name && csrf_value) {
        post_data[csrf_name] = csrf_value;
    }
    return post_data;
 }