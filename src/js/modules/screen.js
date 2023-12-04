export function init(main) {
    if (main.debug) console.log("Screen Manager Loaded");

    // Check if fullscreen is supported
    const fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

    if (fullscreenEnabled) {
        const element = document.documentElement; // You can replace this with the specific element you want to make fullscreen

        // Function to enter fullscreen mode
        function enterFullscreen() {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) { // Chrome and Safari
                element.webkitRequestFullScreen();
            }
        }

        // Function to exit fullscreen mode
        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        // Toggle fullscreen mode
        function toggleFullscreen() {
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
                exitFullscreen();
            } else {
                enterFullscreen();
            }
        }

        // You can trigger fullscreen based on user interaction, for example, a button click
        const fullscreenButton = document.getElementById('fullscreenButton'); // Replace with your button's ID

        if (fullscreenButton) {
            fullscreenButton.addEventListener('click', toggleFullscreen);
        }
    } else {
        console.log("Fullscreen not supported on this device/browser.");
    }


    for ( let i = 0; i < main.canvas_list.length; ++i ) {
        main.canvas_list[i].ca.width = main.resolution.w;
        main.canvas_list[i].ca.height = main.resolution.h;
        resize(main,  main.canvas_list[i].cx, main.canvas_list[i].ca);
    }

    window.addEventListener('resize', function(e) {
        for ( let i = 0; i < main.canvas_list.length; ++i ) {
            main.canvas_list[i].ca.width = main.resolution.w;
            main.canvas_list[i].ca.height = main.resolution.h;
            resize(main, main.canvas_list[i].cx, main.canvas_list[i].ca);
        }
    });
}
  
export function resize(main, _ctx, _canvas) {
    const border = 3;
    const aspect = {w:16, h:10};
    const img_smooth = true;
    let w = window.innerWidth;
    let h = w * (aspect.h / aspect.w);

    if (h < window.innerHeight){
        // Check window width
        w = window.innerWidth;
        h = w * (aspect.h / aspect.w);
    } else {
        // Check window height
        h = window.innerHeight;
        w = h * (aspect.w / aspect.h);
    }

    if (main.debug) console.log("Resized", "W", Math.floor(w), "H", Math.floor(h));

    _canvas.style.width = `${w - border}px`;
    _canvas.style.height = `${h - border}px`;

    // Graphic sharpness
    _ctx.mozImageSmoothingEnabled = img_smooth;
    _ctx.msImageSmoothingEnabled = img_smooth;
    _ctx.imageSmoothingEnabled = img_smooth;
}
  
  