let path = window.location.protocol + "//" + window.location.host + "/video/displayVideo";

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(path, requestOptions)
    .then(response => response.json())
    .then(result => {
        let videos = result.videos;

        videos.forEach(element => {
            var node = document.createElement("video");                 
            node.classList.add("file-upload-image");
            node.style = "height: 100%;";
            node.poster=element.thumbnailPath ? element.thumbnailPath : "";
            node.controls;

            var textnode = document.createElement("source");         
            textnode.classList.add("file-upload-video");
            textnode.src=element.videoPath;
            textnode.type="video/mp4"
            node.appendChild(textnode);                              
            document.getElementById("myList").appendChild(node);     

            var imgnode = document.createElement("img");
            imgnode.src="../public/arrow.png";
            imgnode.style="height:100%";
            document.getElementById("myList").appendChild(imgnode); 

            var node2 = document.createElement("video");           
            node2.classList.add("file-upload-image");
            node2.style = "height: 100%;";
            node2.poster=element.thumbnailPath ? element.thumbnailPath : "";
            node2.controls;
            var textnode2 = document.createElement("source");    
            textnode2.classList.add("file-upload-video");
            textnode2.src=element.trimmedVideo;
            textnode2.type="video/mp4"
            node2.appendChild(textnode2);                         
            document.getElementById("myList").appendChild(node2);   
        });
    })
    .catch(error => console.log('error', error));
