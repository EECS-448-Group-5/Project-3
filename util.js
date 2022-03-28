export function propPos(xPercent, yPercent){
    return pos(width() * xPercent, height() * yPercent);
}

export function scaleToProp(obj, xPercent, yPercent){
    onLoad(()=>{
    let xScale, yScale;
    if(xPercent != -1){
        xScale = width()*1.0 / obj.width * xPercent;
    }else{
        xScale = height() / obj.height * yPercent;
    }

    if(yPercent != -1){
        yScale = height()*1.0 / obj.height * yPercent;
    }else{
        yScale = xScale;
    }
    obj.scaleTo(xScale, yScale);
    });
}
