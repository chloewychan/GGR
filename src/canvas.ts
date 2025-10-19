class Canvas {
    public static WIDTH: number = 800;
    public static HEIGHT: number = 600;
  
    public static element = document.getElementById("canvas-ukulele") as HTMLCanvasElement;
    public static context = Canvas.element.getContext("2d") as CanvasRenderingContext2D;

  
    constructor() {
        Canvas.element.width = Canvas.WIDTH;
        Canvas.element.height = Canvas.HEIGHT;
    }

    public static getMouseCoords(event: MouseEvent): { x: number, y: number } {
        const rect = Canvas.element.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}
  
export { Canvas };