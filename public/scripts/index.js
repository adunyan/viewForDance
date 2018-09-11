window.URL = window.URL || window.webkitURL;

window.onload = () => {

    const reader = document.getElementById("reader"),
        selector = document.getElementById("selector"),
        viewer = document.getElementById("viewer"),
        videoContainer = document.getElementById("container");

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
                


                






                //進度の選択
                const shifts = document.getElementById("shift");
                for(let i = 0; i < shifts.children.length; i++) {
                    const ele = shifts.children[i];
                    ele.addEventListener("click", (e) =>{
                        for (let j = 0; j < shifts.children.length; j++) {
                            shifts.children[j].classList.remove("active");
                        }
                        ele.classList.add("active");
                        let value = ele.dataset.value;
                        shiftValue = value;
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
                        rateValue = value;
                        if (video) {
                            video.playbackRate = rateValue;
                        }
                    });
                }

                //ジャンプ機能
                const leftOfLayer1 = videoContainer.querySelector(".layer-1.left");
                const rightOfLayer1 = videoContainer.querySelector(".layer-1.right");
        
                leftOfLayer1.addEventListener("click", (e) => {
                    console.log("prev clicked");
                    if (video) {
                        video.currentTime -= shiftValue;
                    }
                });
                rightOfLayer1.addEventListener("click", (e) => {
                    console.log("next clicked");
                    if (video) {
                        video.currentTime += shiftValue;
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