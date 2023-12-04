// Map Array
import {Example, Gear_01, Gear_02, Gear_03} from './objects/example.js';
import * as Screen from './modules/screen.js';
import * as Mouse from './modules/mouse.js';
import * as Touch from './modules/touch.js';
import * as Image_Loader from './modules/image_loader.js';
import * as Graphics from './modules/graphics.js';

window.addEventListener('load', function(){
    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.debug = false;

            this.resolution = {w: 1280, h: 800};

            this.canvas_list = [
                {cx: ctx, ca: canvas}, 
                {cx: overlayCtx, ca: overlay}
            ];

            this.images = {
                gear_icon: Image_Loader.load('src/images/gear.png'),
            };

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

            const gears_offset = {x:64, y:-70};

            // Add Gear 1
            this.instance(this.objects, Gear_01, {x:canvas.width*0.5+gears_offset.x, y:canvas.height*0.5+64+gears_offset.y}, 0.4);

            // Add Gear 2
            this.instance(this.objects, Gear_02, {x:canvas.width*0.5-140+gears_offset.x, y:canvas.height*0.5+140+gears_offset.y}, -0.4);

            // Add Gear 3
            this.instance(this.objects, Gear_03, {x:canvas.width*0.5-35+gears_offset.x, y:canvas.height*0.5+240+gears_offset.y}, 0.4);
        }

        update(deltaTime){
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){
            this.objects.forEach(ob => ob.draw());

            // Draw Text
            Graphics.text(ctx, "Blank JS Project", 'Noto Sans', 40, "center", 'Gold', 1, {x:canvas.width*0.5, y:canvas.height*0.5-168});

            // Show Mouse Position
            if (this.mouse.pos.x || this.mouse.pos.y) {
                Graphics.box(overlayCtx, {w:32, h:32}, 'Teal', 1, {x:this.mouse.pos.x-16, y:this.mouse.pos.y-16})
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
    Screen.init(game);
    game.init();

    Mouse.move(game, canvas);
    Mouse.leave(game);
    Mouse.down(game, canvas);
    Mouse.up(game);
    Touch.init(game);

    let lastTime = 1;
    function animate(timeStamp){
        for (let i = 0; i < game.canvas_list.length; ++i) game.canvas_list[i].cx.clearRect(0,0,game.canvas_list[i].ca.width, game.canvas_list[i].ca.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});


