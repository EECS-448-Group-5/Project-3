//returns a position given the desired x,y location on screen (0 < x,y < 1)
export function propPos(xPercent, yPercent){
    return pos(width() * xPercent, height() * yPercent);
}

//scales the object to take up a given percentage of the width/height of the screen. 0 < x,y < 1 or x,y = -1 or -2.
//x,y = -1  =>  scale the other axis as needed, maintain aspect ratio
//x,y = -2  =>  keep the scale the same as it was before
export function scaleToProp(obj, xPercent, yPercent){
    onLoad(()=>{
    let xScale, yScale;
    if(xPercent == -1){
        xScale = height() / obj.height * yPercent;
    }else if(xPercent == -2){
        xScale = obj.scale.x;
    }else{
        xScale = width()*1.0 / obj.width * xPercent;
    }

    if(yPercent == -1){
        yScale = xScale;
    }else if(yPercent == -2){
        yScale = obj.scale.y;
    }else{
        yScale = height()*1.0 / obj.height * yPercent;
    }
    obj.scaleTo(xScale, yScale);
    });
}

//from https://www.javascripttutorial.net/javascript-queue/
export class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
}
