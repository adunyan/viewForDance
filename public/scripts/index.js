window.URL = window.URL || window.webkitURL;

window.onload = () => {

    const reader = document.getElementById("reader"),
        viewer = document.getElementById("viewer"),
        selector = document.getElementById("selector");
    
    selector.addEventListener("click", function (e) {
        if (reader) {
            reader.click();
        }
        e.preventDefault();
    }, false);

    reader.addEventListener('change', (e) => {

        let files = e.target.files;

        if (!files.length) {
            viewer.innerHTML = "<p>No files selected!</p>";
        } else {
            for (var i = 0; i < files.length; i++) {
                let video = document.createElement("video");
                video.src = window.URL.createObjectURL(files[i]);
                
                video.onload = function (e) {
                    window.URL.revokeObjectURL(this.src);
                }

                viewer.appendChild(video);

            }
        }
    });

};