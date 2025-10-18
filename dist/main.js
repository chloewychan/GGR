"use strict";
// const DIV_CONTAINER = document.getElementById('div-container');
// const CANVAS_UKULELE = document.getElementById('canvas-ukulele') as HTMLCanvasElement;
// // Red rectangle coordinates and dimensions
// const RED_RECT = {
//     x: 400,
//     y: 200,
//     width: 300,
//     height: 50
// };
// // Function to get mouse coordinates relative to canvas
// function getMouseCoords(event: MouseEvent): { x: number, y: number } {
//     const rect = CANVAS_UKULELE.getBoundingClientRect();
//     return {
//         x: event.clientX - rect.left,
//         y: event.clientY - rect.top
//     };
// }
// function strum() {
//     console.log('strum!');
// }
// function createStringHandler(string: any) {
//     let isDraggingOverString = false;
//     let wasMouseOverStringOnDown = false;
//     function isMouseOverString(mouseX: number, mouseY: number): boolean {
//         return mouseX >= string.x && 
//                mouseX <= string.x + string.width && 
//                mouseY >= string.y && 
//                mouseY <= string.y + string.height;
//     }
//     return {
//         handleMouseDown: (event: MouseEvent) => {
//             const coords = getMouseCoords(event);
//             wasMouseOverStringOnDown = isMouseOverString(coords.x, coords.y);
//             if (wasMouseOverStringOnDown) {
//                 isDraggingOverString = true;
//             }
//         },
//         handleMouseMove: (event: MouseEvent, isMouseDown: boolean) => {
//             if (!isMouseDown) return;
//             const coords = getMouseCoords(event);
//             if(!isDraggingOverString) return;
//             const isCurrentlyOver = isMouseOverString(coords.x, coords.y);
//             if (!isCurrentlyOver) {
//                 strum(); // button drag case
//                 isDraggingOverString = false;
//             }
//         },
//         handleMouseUp: (event: MouseEvent) => {
//             isDraggingOverString = false;
//             wasMouseOverStringOnDown = false;
//             const coords = getMouseCoords(event);
//             wasMouseOverStringOnDown = isMouseOverString(coords.x, coords.y);
//             if (wasMouseOverStringOnDown) {
//                 isDraggingOverString = true;
//                 strum(); // button press case
//             }
//         }
//     };
// }
// function main() {
//     // Set canvas size
//     CANVAS_UKULELE.width = 800;
//     CANVAS_UKULELE.height = 600;
//     const ctx = CANVAS_UKULELE.getContext('2d');
//     if (!ctx) {
//         throw new Error('Could not get context');
//     }
//     // Draw rectangles
//     ctx.fillStyle = 'red';
//     ctx.fillRect(RED_RECT.x, RED_RECT.y, RED_RECT.width, RED_RECT.height);
//     ctx.fillRect(400, 250, 300, 50);
//     ctx.fillRect(400, 300, 300, 50);
//     ctx.fillRect(400, 350, 300, 50);
//     let isMouseDown = false;
//     // Create string handler for the red rectangle
//     const stringHandler = createStringHandler(RED_RECT);
//     // Mouse down event
//     CANVAS_UKULELE.addEventListener('mousedown', (event) => {
//         isMouseDown = true;
//         stringHandler.handleMouseDown(event);
//     });
//     // Mouse move event
//     CANVAS_UKULELE.addEventListener('mousemove', (event) => {
//         stringHandler.handleMouseMove(event, isMouseDown);
//     });
//     // Mouse up event
//     CANVAS_UKULELE.addEventListener('mouseup', (event) => {
//         isMouseDown = false;
//         stringHandler.handleMouseUp(event);
//     });
// }
//# sourceMappingURL=main.js.map