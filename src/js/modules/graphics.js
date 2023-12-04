export function text(_ctx, _text, _font, _size, _align, _color, _a, _pos){
    _ctx.globalAlpha = _a;
    _ctx.textAlign = _align;
    _ctx.fillStyle = _color;
    _ctx.font = `${_size}px ${_font}`;
    _ctx.fillText(`${_text}`, _pos.x, _pos.y);
    _ctx.globalAlpha = 1;
}

export function box(_ctx, _size, _color, _a, _pos){
    _ctx.globalAlpha = _a;
    _ctx.fillStyle = _color;
    _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h);
    _ctx.globalAlpha = 1;
}

export function bevel_outline(_ctx, _x, _y, _w, _h, _r, _color, _a){
    _ctx.beginPath();

    _ctx.strokeStyle = _color;
    _ctx.globalAlpha = _a;

    // Set faux rounded corners
    _ctx.lineJoin = "round";
    _ctx.lineWidth = _r;

    // Stroke Outline
    _ctx.strokeRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);
    
    _ctx.closePath();
    _ctx.globalAlpha = 1.0;

  }

  export function image(_ctx, _image, _frame, _spriteSize, _pos, _size, _rot, _a) {
    _ctx.globalAlpha = _a;
  
    _ctx.save();
    _ctx.translate(_pos.x, _pos.y);
    _ctx.rotate(_rot);
  
    _ctx.drawImage(_image, 
    _frame.x, _frame.y, _spriteSize.w, _spriteSize.h, 
    _pos.x-_pos.x-_size.w * 0.5, _pos.y-_pos.y-_size.h * 0.5, 
    _size.w, _size.h);
  
    _ctx.restore();
    _ctx.globalAlpha = 1.0;
  }
  
  
  export function image_simple(_ctx, _image, _pos, _size, _a) {
    _ctx.globalAlpha = _a;
  
    _ctx.drawImage(_image, 
    _pos.x, _pos.y, _size.w, _size.h);
    _ctx.globalAlpha = 1.0;
  }