import * as Graphics from '../modules/graphics.js';

// Gears
export class Example {
    constructor(game){
        this.game = game;
        this.ctx = game.canvas_list[0].cx;
        this.overlayCtx = game.canvas_list[1].cx;
        this.image = game.images.gear_icon;
        this.spriteSize = {w:256, h:256};
        this.angle = 0 * Math.PI / 180.0;
        this.interact = false;
        this.hovering = false;
        this.markedForDeletion = false;
    }

    init(){
        if (this.game.debug) {
            console.log("Added Gear", this.game.objects.length);
        }
    }

update(deltaTime){

        // Rotate
        this.angle += this.speed * Math.PI / 180.0;

        // Mouse Interaction
        if (this.game.mouse.pos.x > this.pos.x-this.size.w*0.5 && this.game.mouse.pos.x < this.pos.x-this.size.w*0.5 + this.size.w && 
            this.game.mouse.pos.y > this.pos.y-this.size.h*0.5 && this.game.mouse.pos.y < this.pos.y-this.size.h*0.5 + this.size.h){
                this.hovering = true;
            } else {
                this.hovering = false;
            }
    }

    draw(){
        // Display image, rotate canvas, reset canvas rotation
        this.ctx.save();
        this.ctx.translate(this.pos.x, this.pos.y);
        this.ctx.rotate(this.angle);
        this.ctx.drawImage(this.image, 
            0, 0, this.spriteSize.w, this.spriteSize.h, 
            this.pos.x-this.pos.x-this.size.w*0.5, this.pos.y-this.pos.y-this.size.h*0.5, this.size.w, this.size.h);
        this.ctx.restore();

        // Show Mouse Interact Bounds
        if (!this.game.mouse.click && this.hovering) {
            Graphics.bevel_outline(this.overlayCtx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Red', 1);
        } else if (this.game.mouse.click && this.hovering) {
            Graphics.bevel_outline(this.overlayCtx, this.pos.x-this.size.w*0.5, this.pos.y-this.size.h*0.5, this.size.w, this.size.h, 2, 'Green', 1);
        }
    }
}


export class Gear_01 extends Example {
    constructor(game, pos, speed){
        super(game);
        this.pos = pos;
        this.size = {w:180, h:180};
        this.speed = speed;
    }
}


export class Gear_02 extends Example {
    constructor(game, pos, speed){
        super(game);
        this.pos = pos;
        this.size = {w:160, h:160};
        this.speed = speed;
    }
}


export class Gear_03 extends Example {
    constructor(game, pos, speed){
        super(game);
        this.pos = pos;
        this.size = {w:140, h:140};
        this.speed = speed;
    }
}


