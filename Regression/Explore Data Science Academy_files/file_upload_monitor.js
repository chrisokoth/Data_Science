$(document).on('change', 'input[type=file]', function() {
    var all_files = this.files;
    $.each(all_files, function () {
        var sizeinbytes = this.size;
        fSize = sizeinbytes / 1024 / 1024;
        if(fSize > 100){
           alert('Maximum file size should be less than 100 MB');
        }
    });
});