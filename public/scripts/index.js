window.URL = window.URL || window.webkitURL;

window.onload = () => {

    const reader = document.getElementById("reader"),
        selector = document.getElementById("selector"),
        viewer = document.getElementById("viewer"),
        videoContainer = document.getElementById("container");

    let shiftValue = 5;
    let rate = 1.0;
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
                
                videoContainer.appendChild(video);
                
                //進度の選択
                const shifts = document.getElementById("shift");
                console.log(shifts.children);
                for(let i = 0; i < shifts.children.length; i++) {
                    const ele = shifts.children[i];
                    console.log(ele);
                    ele.addEventListener("click", (e) =>{
                        e.preventDefault();
                        for (let j = 0; j < shifts.children.length; j++) {
                            shifts.children[j].classList.remove("active");
                        }
                        ele.classList.add("active");
                        let value = ele.dataset.value;
                        shiftValue = value;
                        console.log(value, shiftValue);
                    });
                }
                
                //再生レートの選択
                const half = document.getElementById("rate-h");
                const normal = document.getElementById("rate-1");
                const double = document.getElementById("rate-2");
                normal.style.color = "#f00";
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




                //ジャンプ機能
                const leftOfLayer1 = videoContainer.querySelector(".layer-1.left");
                const rightOfLayer1 = videoContainer.querySelector(".layer-1.right");
        
                leftOfLayer1.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("prev clicked");
                    if (video) {
                        video.currentTime -= shiftValue;
                    }
                });
                rightOfLayer1.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("next clicked");
                    if (video) {
                        video.currentTime += shiftValue;
                    }
                });
                

                //再生機能
                const play = document.getElementById("play");
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