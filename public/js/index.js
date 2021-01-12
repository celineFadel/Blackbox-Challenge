function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
    
        reader.onload = function(e) {
            const lastDot = input.files[0].name.lastIndexOf('.');
            const ext = input.files[0].name.substring(lastDot + 1);

            if (ext === "mp4") {
                $('.image-upload-wrap').hide();
    
                $('.file-upload-video').attr('src', e.target.result);
                $('.file-upload-content').show();
        
                $('.image-title').html(input.files[0].name);
            } else {
                $('.image-upload-wrap').hide();
    
                $('.file-upload-image').attr('poster', e.target.result);
                $('.file-upload-content').show();
        
                $('.image-title').html(input.files[0].name);
            }
        };
    
        reader.readAsDataURL(input.files[0]);
  
    } else {
        removeUpload();
    }
}
  
function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.thumbnail-upload-input').replaceWith($('.thumbnail-upload-input').clone());
    $('.thumbnail-upload-content').hide();
    $('.image-upload-wrap').show();
}

function submitVideo() {
    // $('.file-upload-submit')
    var requestedFile = $('.file-upload-input')[0].files[0];
    var thumbnailFile = $('.thumbnail-upload-input')[0].files[0];

    var zip = new JSZip();

    zip.file(requestedFile.name, requestedFile, { binary: true });
    zip.generateAsync({ type: "blob" }).then(function (content) {
        //   saveAs(content, "example.zip");
    });
    let form = new FormData();
    form.append("path", requestedFile);
    form.append("thumbnail_path", thumbnailFile);

    let path = window.location.protocol + "//" + window.location.host + "/video/uploadVideo";

    fetch(path, {
        method: 'POST',
        body: form
    })
    .then((response) => {
        response.json();
    })
    .then((data) => {
        location.href = "/public/videoGallery.html"
    })
    .catch((error) => {
        console.log('error', error)
    });
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});

$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

