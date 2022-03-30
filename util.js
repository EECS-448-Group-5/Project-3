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
