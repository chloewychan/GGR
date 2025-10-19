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
// function strum() {
//     console.log('strum!');
//     // You can add any functionality you want here
//     // For example: change colors, play sounds, show tooltips, etc.
// }
// function checkStrum(string: "s1" | "s2" | "s3" | "s4", ) {
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
//     // Mouse down event
//     CANVAS_UKULELE.addEventListener('mousedown', () => {
//         isMouseDown = true;
//         // Check if mouse down started over red rectangle
//     });
//     // Helper function to get mouse coordinates relative to canvas
//     function getMouseCoords(event: MouseEvent): { x: number, y: number } {
//         const rect = CANVAS_UKULELE.getBoundingClientRect();
//         return {
//             x: event.clientX - rect.left,
//             y: event.clientY - rect.top
//         };
//     }
//     let isDraggingOverRedRect = false;
//     let wasMouseOverRedRectOnDown = false;
//     // Helper function to check if mouse is over red rectangle
//     function isMouseOverRedRect(mouseX: number, mouseY: number): boolean {
//         return mouseX >= RED_RECT.x && 
//                mouseX <= RED_RECT.x + RED_RECT.width && 
//                mouseY >= RED_RECT.y && 
//                mouseY <= RED_RECT.y + RED_RECT.height;
//     }
//     // Mouse move event (only when dragging)
//     CANVAS_UKULELE.addEventListener('mousemove', (event) => {
//         if (!isMouseDown) return;
//         const coords = getMouseCoords(event);
//         wasMouseOverRedRectOnDown = isMouseOverRedRect(coords.x, coords.y);
//         if (wasMouseOverRedRectOnDown) {
//             isDraggingOverRedRect = true;
//         }
//         if (!isDraggingOverRedRect) return;
//         const isCurrentlyOver = isMouseOverRedRect(coords.x, coords.y);
//         // If we were dragging over red rectangle but now we're not, call drag-off function
//         if (!isCurrentlyOver) {
//             strum();
//             isDraggingOverRedRect = false; // Stop tracking this drag
//         }
//     });
//     // Mouse up event
//     CANVAS_UKULELE.addEventListener('mouseup', (event) => {
//         isMouseDown = false;
//         isDraggingOverRedRect = false;
//         wasMouseOverRedRectOnDown = false;
//         const coords = getMouseCoords(event);
//         wasMouseOverRedRectOnDown = isMouseOverRedRect(coords.x, coords.y);
//         if (wasMouseOverRedRectOnDown) {
//             isDraggingOverRedRect = true;
//             // Call button press function immediately
//             strum();
//         }
//     }
// );
// }
//# sourceMappingURL=index.js.map