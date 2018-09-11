window.URL = window.URL || window.webkitURL;

window.onload = () => {

    const reader = document.getElementById("reader"),
        selector = document.getElementById("selector"),
        viewer = document.getElementById("viewer"),
        videoContainer = document.getElementById("container");
        videoUi = document.getElementById("ui");

    let shiftValue = 5;
    let rateValue = 1.0;
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
                

                //シークバー
                const seek = videoUi.querySelector("#seek");
                console.log(seek);
                const progress = seek.querySelector("#progress");
                
                let progressWidth = 0;
                video.addEventListener("timeupdate", (e) => {
                    progressWidth = seek.offsetWidth * video.currentTime / video.duration;
                    console.log(video.currentTime , video.duration, progressWidth);
                    progress.style.width = progressWidth + "px";
                });
                
                
                

                






                //jump値の選択
                const shifts = document.getElementById("shift");
                for(let i = 0; i < shifts.children.length; i++) {
                    const ele = shifts.children[i];
                    ele.addEventListener("click", (e) =>{
                        for (let j = 0; j < shifts.children.length; j++) {
                            shifts.children[j].classList.remove("active");
                        }
                        ele.classList.add("active");
                        let value = ele.dataset.value;
                    shiftValue = Number(value);
                    });
                }
                
                //再生レートの選択
                const rates = document.getElementById("rate");
                console.log(rate.children);
                for (let i = 0; i < rates.children.length; i++) {
                    const ele = rates.children[i];
                    ele.addEventListener("click", (e) => {
                        for (let j = 0; j < rates.children.length; j++) {
                            rates.children[j].classList.remove("active");
                        }
                        ele.classList.add("active");
                        const value = ele.dataset.value;
                        rateValue = Number(value);
                        if (video) {
                            video.playbackRate = rateValue;
                        }
                    });
                }

                //ジャンプ機能
                const leftOfLayer1 = videoContainer.querySelector(".layer-1.left");
                const rightOfLayer1 = videoContainer.querySelector(".layer-1.right");
        
                leftOfLayer1.addEventListener("click", (e) => {
                    if (video) {
                        video.currentTime -= shiftValue;
                        console.log("prev clicked", shiftValue, video.currentTime);
                    }
                });
                rightOfLayer1.addEventListener("click", (e) => {
                    if (video) {
                        video.currentTime += shiftValue;
                        console.log("next clicked", shiftValue, video.currentTime);
                    }
                });
                
                //再生機能
                const play = document.getElementById("play");
                play.addEventListener("click", (e) => {
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