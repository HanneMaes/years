window.addEventListener("load",()=>{
    console.log("dom loaded")

    const setCanvasToScreen = (cnvs) =>{
        //console.log(window.innerHeight,window.innerWidth)
        cnvs.height = window.innerHeight
        cnvs.width = window.innerWidth
    }

    const canvas = document.getElementById("canvas")
   
    setCanvasToScreen(canvas)
    window.addEventListener('resize',()=>{setCanvasToScreen(canvas)})

    const ctx = canvas.getContext("2d")
    let videoContainer
    
    //https://riptutorial.com/html5-canvas/example/14974/basic-loading-and-playing-a-video-on-the-canvas-

    let video = document.createElement("video"); // create a video element
    
    video.src = "./art/characters/00.mp4"; 
    // the video will now begin to load.
    // As some additional info is needed we will place the video in a
    // containing object for convenience
    video.muted = true;
    video.autoPlay = true; // ensure that the video does not auto play
    video.loop = true; // set the video to loop.
   
    videoContainer = {  // we will add properties as needed
        video : video,
        ready : false,   
    };
    
    video.oncanplay = readyToPlayVideo; // set the event to the play function that 
    // can be found below
    // let fistImg = new Image()
    // fistImg.src = "./henri.png"

    /* ***** */
    /* lines */
    /* ***** */

    let layerList = []
    for (let i = 0; i < 13; i++) {
        layerList.push(new Image())
        layerList[i].src = "./art/lines/" + fourDigitsNumber(i + 1) + ".png"
        console.log('layerList[i].src:', layerList[i].src)
    }
    console.log(layerList)

    let currentLayer= null;
    let currentPos = 0;
    layerList[0].onload = () =>{
        currentLayer = layerList[0]
    }

    // fistImg.onload = ()=>{
    //     ctx.drawImage(fistImg, 0, 0);
    // }
    setInterval(()=>{
        if(currentPos < layerList.length - 1){
            currentPos++;
            currentLayer = layerList[currentPos]
        }
        else{
            currentPos = 0
            currentLayer = layerList[0]
        }
    }, 5000)
                        
    function readyToPlayVideo(event){ // this is a referance to the video
        // the video may not match the canvas size so find a scale to fit
        videoContainer.scale = Math.min(
                             canvas.width / this.videoWidth, 
                             canvas.height / this.videoHeight); 
        videoContainer.ready = true;
        videoContainer.video.play();
        // the video can be played so hand it off to the display function
        requestAnimationFrame(updateCanvas);
    }

    function updateCanvas(){
        ctx.clearRect(0,0,canvas.width,canvas.height); // Though not always needed 
                                                         // you may get bad pixels from 
                                                         // previous videos so clear to be
                                                         // safe
        // only draw if loaded and ready
        if(videoContainer !== undefined && videoContainer.ready){ 
            // now just draw the video the correct size
            ctx.drawImage(videoContainer.video, 0, 0, canvas.width, canvas.height);
            // ctx.drawImage(fistImg, 0, 0, window.innerWidth * 0.3, window.innerHeight * 0.8);
            if(currentLayer !== null){
                ctx.drawImage(currentLayer, 0, 0, canvas.width, canvas.height);
            }
            if(videoContainer.video.paused){ // if not playing show the paused screen 
                drawPayIcon();
            }
        }
        // all done for display 
        // request the next frame in 1/60th of a second
        requestAnimationFrame(updateCanvas);
    }

    function fourDigitsNumber(number) {
        number = number.toString();
        while(number.length < 4) {
            number = "0" + number;
        }
        return number;
    }
})