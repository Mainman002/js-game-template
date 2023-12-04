export function init(main) {
    document.addEventListener("touchstart", touch2Mouse, true);
    document.addEventListener("touchmove", touch2Mouse, true);
    document.addEventListener("touchend", touch2Mouse, true);

    function touch2Mouse(e) {
        let theTouch = e.changedTouches[0];
        let mouseEv;

        switch(e.type)
        {
            case "touchstart": 
                mouseEv="mousedown";
                main.mouse.click = true; 
                break;  
            case "touchend":   mouseEv="mouseup";
                main.mouse.click = false; 
                break;  
            case "touchmove":  mouseEv="mousemove"; break;
            default: return;
        }

        const mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
        theTouch.target.dispatchEvent(mouseEvent);

        // e.preventDefault();
    }
}
  
