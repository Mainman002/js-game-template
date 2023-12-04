export function init(main) {
    if (main.debug) console.log("Screen Manager Loaded");

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
    const aspect = { w: 16, h: 10 };
    const img_smooth = true;
    const border = 100;

    let targetWidth = window.innerWidth - border;
    let targetHeight = targetWidth * (aspect.h / aspect.w);

    if (targetHeight > window.innerHeight - border) {
        targetHeight = window.innerHeight - border;
        targetWidth = targetHeight * (aspect.w / aspect.h);
    }

    if (main.debug) console.log("Resized", "W", Math.floor(targetWidth), "H", Math.floor(targetHeight));

    _canvas.style.width = `${targetWidth}px`;
    _canvas.style.height = `${targetHeight}px`;

    // Graphic sharpness
    _ctx.mozImageSmoothingEnabled = img_smooth;
    _ctx.msImageSmoothingEnabled = img_smooth;
    _ctx.imageSmoothingEnabled = img_smooth;
}

  
  