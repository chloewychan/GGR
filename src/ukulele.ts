import { Canvas } from "./canvas.js";

class Ukulele {
    constructor (
        public s1: String = new String(400, 200, 300, 50),
        public s2: String = new String(400, 200, 300, 50),
        public s3: String = new String(400, 200, 300, 50),
        public s4: String = new String(400, 200, 300, 50),
        private _image: string = 'https://m.media-amazon.com/images/I/61Ab58IiXUL.jpg'
    ) {
    }
    
    private strum(): void {
        console.log("strum!");
    }
}

class String {
    constructor (
        private _x: number,
        private _y: number,
        private _w: number,
        private _h: number,
        private _colour: string = 'pink'
    ) {
        let isDraggingOverRedRect = false;
        let wasMouseOverRedRectOnDown = false;
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }
    get w(): number {
        return this._w;
    }
    get h(): number {
        return this._h;
    }

    private isMouseOverString(mouseX: number, mouseY: number): boolean {
        return mouseX >= this._x && 
            mouseX <= this._x + this._w && 
            mouseY >= this._y && 
            mouseY <= this._y + this._h;
    }

    public createStringHandler(string: any) {

        let isDraggingOverString = false;
        let wasMouseOverStringOnDown = false;

        function isMouseOverString(mouseX: number, mouseY: number): boolean {
            return mouseX >= string.x && 
                mouseX <= string.x + string.width && 
                mouseY >= string.y && 
                mouseY <= string.y + string.height;
        }

        let isMouseDown = false;

        return {
            handleMouseDown: (event: MouseEvent) => {
                isMouseDown = true;
            },

            handleMouseMove: (event: MouseEvent, isMouseDown: boolean) => {
                if (!isMouseDown) return;
                
                const coords = Canvas.getMouseCoords(event);

                wasMouseOverRedRectOnDown = this.isMouseOverString(coords.x, coords.y);
                if (wasMouseOverRedRectOnDown) {
                    isDraggingOverRedRect = true;
                }

                if (!isDraggingOverRedRect) return;
                
                const isCurrentlyOver = this.isMouseOverString(coords.x, coords.y);
                // If we were dragging over red rectangle but now we're not, call drag-off function
                if (!isCurrentlyOver) {
                    this.strum();
                    isDraggingOverRedRect = false; // Stop tracking this drag
                }
                
            },

            handleMouseUp: (event: MouseEvent) => {
                isMouseDown = false;
                isDraggingOverRedRect = false;
                wasMouseOverRedRectOnDown = false;

                const coords = Canvas.getMouseCoords(event);

                wasMouseOverRedRectOnDown = this.isMouseOverString(coords.x, coords.y);
                if (wasMouseOverRedRectOnDown) {
                    isDraggingOverRedRect = true;
                    // Call button press function immediately
                    this.strum();
                }
            }
        };
    }

    private strum(): void {

    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this._colour;
        context.fillRect(this._x, this._y, this._w, this._h);
    }
}

export { Ukulele }
export { String }