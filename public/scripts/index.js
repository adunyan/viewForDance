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
                video.loadeddata = function (e) {
                    console.log("video URL revoked");
                    window.URL.revokeObjectURL(this.src);
                }
                video.load();
                
                viewer.appendChild(video);
                
                
                const sv_3 = document.getElementById("shift-value-3");
                const sv_5 = document.getElementById("shift-value-5");
                const sv_10 = document.getElementById("shift-value-10");
                sv_5.style.color = "#f00";
                let shiftValue = 5;
                sv_3.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    sv_5.style.color = "#00B7FF";
                    sv_10.style.color = "#00B7FF";
                    shiftValue = 3;
                });
                sv_5.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    sv_3.style.color = "#00B7FF";
                    sv_10.style.color = "#00B7FF";
                    shiftValue = 5;
                });
                sv_10.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    sv_3.style.color = "#00B7FF";
                    sv_5.style.color = "#00B7FF";
                    shiftValue = 10;
                });

                
                
                const half = document.getElementById("rate-h");
                const normal = document.getElementById("rate-1");
                const double = document.getElementById("rate-2");
                normal.style.color = "#f00";
                let rate = 1.0;
                half.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    normal.style.color = "#00B7FF";
                    double.style.color = "#00B7FF";
                    rate = 0.5;
                    if (video) {
                        video.playbackRate = rate;
                    }
                });
                normal.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    half.style.color = "#00B7FF";
                    double.style.color = "#00B7FF";
                    rate = 1.0;
                    if (video) {
                        video.playbackRate = rate;
                    }
                });
                double.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.target.style.color = "#f00";
                    half.style.color = "#00B7FF";
                    normal.style.color = "#00B7FF";
                    rate = 2.0;
                    if (video) {
                        video.playbackRate = rate;
                    }
                });





                const prev = document.getElementById("prev");
                const next = document.getElementById("next");
                const play = document.getElementById("play");
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