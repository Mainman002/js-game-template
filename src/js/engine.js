// Map Array
import {Example} from './modules/example.js';

window.addEventListener('load', function(){
    const border = 100;
    const aspect = {w:6.5, h:4};
    const img_smooth = true;

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    canvas.width = 1088;
    canvas.height = 640;

    overlay.width = canvas.width;
    overlay.height = canvas.height;

    screen_resize(ctx, canvas);
    screen_resize(overlayCtx, overlay);


    window.addEventListener('resize', function(e) {
        screen_resize(ctx, canvas);
        screen_resize(overlayCtx, overlay);
    });


    function screen_resize(_ctx, _canvas){
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

        _canvas.style.width = `${w - border}px`;
        _canvas.style.height = `${h - border}px`;

        // Graphic sharpness
        _ctx.mozImageSmoothingEnabled = img_smooth;
        _ctx.msImageSmoothingEnabled = img_smooth;
        _ctx.imageSmoothingEnabled = img_smooth;
    }


    window.addEventListener('mousemove', function(e) {
        let bounds = canvas.getBoundingClientRect();

        // get the mouse coordinates, subtract the canvas top left and any scrolling
        game.mouse.pos.x = e.pageX - bounds.left - scrollX;
        game.mouse.pos.y = e.pageY - bounds.top - scrollY;

        // first normalize the mouse coordinates from 0 to 1 (0,0) top left
        // off canvas and (1,1) bottom right by dividing by the bounds width and height
        game.mouse.pos.x /= bounds.width; 
        game.mouse.pos.y /= bounds.height; 

        // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
        game.mouse.pos.x *= canvas.width;
        game.mouse.pos.y *= canvas.height;
    });


    window.addEventListener('mouseleave', function(e) {
        game.mouse.pos.x = null;
        game.mouse.pos.y = null;

        game.mouse.click = false;
    });


    function draw_text(_ctx, _text, _font, _size, _align, _color, _a, _pos){
        _ctx.globalAlpha = _a;
        _ctx.textAlign = _align;
        _ctx.fillStyle = _color;
        _ctx.font = `${_size}px ${_font}`;
        _ctx.fillText(`${_text}`, _pos.x, _pos.y);
        _ctx.globalAlpha = 1;
    }


    function draw_box(_ctx, _size, _color, _a, _pos){
        _ctx.globalAlpha = _a;
        _ctx.fillStyle = _color;
        _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h);
        _ctx.globalAlpha = 1;
    }


    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.ctx = ctx;
            this.overlayCtx = overlayCtx;
            this.size = size;

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:0.2, h:0.2},
                click:false,
            }

            this.objects = [];
        }

        init(){
            console.log("Game Started");

            const offset = {x:64, y:-70};

            // Add Gear 1
            this.instance(this.objects, Example, {x:canvas.width*0.5+offset.x, y:canvas.height*0.5+64+offset.y}, 0.4);
            this.objects[0].angle = 0 * Math.PI / 180.0;

            // Add Gear 2
            this.instance(this.objects, Example, {x:canvas.width*0.5-140+offset.x, y:canvas.height*0.5+140+offset.y}, -0.4);
            this.objects[1].size = {w:160, h:160};
            this.objects[1].angle = 0 * Math.PI / 180.0;

            // Add Gear 3
            this.instance(this.objects, Example, {x:canvas.width*0.5-35+offset.x, y:canvas.height*0.5+240+offset.y}, 0.4);
            this.objects[2].size = {w:140, h:140};
            this.objects[1].angle = 0 * Math.PI / 180.0;
        }

        update(deltaTime){
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){
            this.objects.forEach(ob => ob.draw());

            // Draw Text
            draw_text(ctx, "Blank JS Project", 'Noto Sans', 40, "center", 'Gold', 1, {x:canvas.width*0.5, y:canvas.height*0.5-168});

            // Show Mouse Position
            if (this.mouse.pos.x || this.mouse.pos.y) {
                draw_box(overlayCtx, {w:32, h:32}, 'Teal', 1, {x:this.mouse.pos.x-16, y:this.mouse.pos.y-16})
            }
        }

        instance(_list, _ob, _pos, _speed){
            if (_ob !== null){
                _list.push(new _ob(this, _pos, _speed));
                _list[_list.length-1].init();

                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
            }
        }

        remove_instance(_list, _ob){
            _list = _list.filter(_ob => !_ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game(ctx, {w:canvas.width, h:canvas.height});
    game.init();
    let lastTime = 1;
    function animate(timeStamp){
        game.ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();


});


