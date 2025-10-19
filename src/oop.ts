
import { Canvas } from "./canvas.js";
import { Ukulele } from "./ukulele.js"

class Webapp {
    private static _instance: Webapp;
    private ukulele: Ukulele = new Ukulele();

    private _isMouseDown: boolean = false;

    private constructor() {
        this.instantiate();
    }

    private instantiate(): void {
        this.main();
    }

    private main(): void {

        // Create string handler for the red rectangle
        const stringHandler = this.ukulele.s1.createStringHandler(this.ukulele.s1);

        // Mouse down event
        Canvas.element.addEventListener('mousedown', (event: any) => {
            this._isMouseDown = true;
            stringHandler.handleMouseDown(event);
        });

        // Mouse move event
        Canvas.element.addEventListener('mousemove', (event: any) => {
            stringHandler.handleMouseMove(event, this._isMouseDown);
        });

        // Mouse up event
        Canvas.element.addEventListener('mouseup', (event: any) => {
            this._isMouseDown = false;
            stringHandler.handleMouseUp(event);
        });

    }

    
    public static get instance(): Webapp {
        if (!Webapp._instance) Webapp._instance = new Webapp();
        return Webapp._instance;
    }

}

class Driver {
    constructor() {
        Webapp.instance;
    }
}

new Driver();
