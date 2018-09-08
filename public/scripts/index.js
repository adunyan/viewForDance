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
                    console.log("video URL revoked");
                    window.URL.revokeObjectURL(this.src);
                }
                video.load();
                
                viewer.appendChild(video);
                
                const prev = document.getElementById("prev");
                const next = document.getElementById("next");
                const play = document.getElementById("play");

                let rate = 1.0;
                let shiftValue = 5;
                prev.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("prev clicked");
                    if (video) {
                        video.currentTime -= shiftValue;
                    }
                });
                next.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("prev clicked");
                    if (video) {
                        video.currentTime += shiftValue;
                    }
                });

                play.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("play clicked");

                    if (video) {

                        if(video.played == 0) {
                            console.log("video started");

                            video.play();
                        } else {
                            if(!video.paused){
                                console.log("video paused");

                                video.pause();
                            } else {
                                console.log("video is playing");
                                video.play();
                            }
                        }
                    }
                });
                



            }
        }
    });

};