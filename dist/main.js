"use strict";
const CANVAS_UKULELE = document.getElementById('canvas-ukulele');
const P_TABS = document.getElementById('p-tabs');
const IMG_UKULELE = document.getElementById('img-ukulele');
// Red rectangle coordinates and dimensions
const STRING_1 = {
    x: 450,
    y: 170,
    width: 300,
    height: 23,
    fret: 0,
    tab: '|',
    strum: (fret) => {
        audios[0][fret].play().catch((error) => {
            console.error("Playback failed:", error);
        });
        STRING_1.tab += `--${fret}`;
    }
};
const STRING_2 = {
    x: 450,
    y: 193,
    width: 300,
    height: 23,
    fret: 0,
    tab: '|',
    strum: (fret) => {
        audios[1][fret].play().catch((error) => {
            console.error("Playback failed:", error);
        });
        STRING_2.tab += `--${fret}`;
    }
};
const STRING_3 = {
    x: 450,
    y: 216,
    width: 300,
    height: 23,
    fret: 0,
    tab: '|',
    strum: (fret) => {
        audios[2][fret].play().catch((error) => {
            console.error("Playback failed:", error);
        });
        STRING_3.tab += `--${fret}`;
    }
};
const STRING_4 = {
    x: 450,
    y: 239,
    width: 300,
    height: 23,
    fret: 0,
    tab: '|',
    strum: (fret) => {
        audios[3][fret].play().catch((error) => {
            console.error("Playback failed:", error);
        });
        STRING_4.tab += `--${fret}`;
    }
};
function levelTab() {
    let length = Math.max(STRING_1.tab.length, STRING_2.tab.length, STRING_3.tab.length, STRING_4.tab.length);
    for (let i = STRING_1.tab.length; i < length; i++) {
        STRING_1.tab += '-';
    }
    for (let i = STRING_2.tab.length; i < length; i++) {
        STRING_2.tab += '-';
    }
    for (let i = STRING_3.tab.length; i < length; i++) {
        STRING_3.tab += '-';
    }
    for (let i = STRING_4.tab.length; i < length; i++) {
        STRING_4.tab += '-';
    }
    P_TABS.innerText = `${STRING_1.tab}
    ${STRING_2.tab}
    ${STRING_3.tab}
    ${STRING_4.tab}`;
}
// audio files found in this Google Drive link: https://drive.google.com/drive/folders/1cJSK0jtXuQZE_C63SuF6PsKBtmzBNdq5?usp=sharing
const audios = [
    [
        new Audio("../audio/A0.m4a"),
        new Audio("../audio/A1.m4a"),
        new Audio("../audio/A2.m4a"),
        new Audio("../audio/A3.m4a"),
        new Audio("../audio/A4.m4a"),
        new Audio("../audio/A5.m4a"),
        new Audio("../audio/A6.m4a"),
        new Audio("../audio/A7.m4a"),
        new Audio("../audio/A8.m4a"),
        new Audio("../audio/A9.m4a"),
    ],
    [
        new Audio("../audio/E0.m4a"),
        new Audio("../audio/E1.m4a"),
        new Audio("../audio/E2.m4a"),
        new Audio("../audio/E3.m4a"),
        new Audio("../audio/E4.m4a"),
        new Audio("../audio/E5.m4a"),
        new Audio("../audio/E6.m4a"),
        new Audio("../audio/E7.m4a"),
        new Audio("../audio/E8.m4a"),
        new Audio("../audio/E9.m4a"),
    ],
    [
        new Audio("../audio/C0.m4a"),
        new Audio("../audio/C1.m4a"),
        new Audio("../audio/C2.m4a"),
        new Audio("../audio/C3.m4a"),
        new Audio("../audio/C4.m4a"),
        new Audio("../audio/C5.m4a"),
        new Audio("../audio/C6.m4a"),
        new Audio("../audio/C7.m4a"),
        new Audio("../audio/C8.m4a"),
        new Audio("../audio/C9.m4a"),
    ],
    [
        new Audio("../audio/G0.m4a"),
        new Audio("../audio/G1.m4a"),
        new Audio("../audio/G2.m4a"),
        new Audio("../audio/G3.m4a"),
        new Audio("../audio/G4.m4a"),
        new Audio("../audio/G5.m4a"),
        new Audio("../audio/G6.m4a"),
        new Audio("../audio/G7.m4a"),
        new Audio("../audio/G8.m4a"),
        new Audio("../audio/G9.m4a"),
    ],
];
let isMouseDown = false;
function getMouseCoords(event) {
    const rect = CANVAS_UKULELE.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
function createStringHandler(string) {
    let isDraggingOverString = false;
    let wasMouseOverStringOnDown = false;
    function isMouseOverString(mouseX, mouseY) {
        return mouseX >= string.x &&
            mouseX <= string.x + string.width &&
            mouseY >= string.y &&
            mouseY <= string.y + string.height;
    }
    return {
        handleMouseDown: (event) => {
            isMouseDown = true;
        },
        handleMouseMove: (event, isMouseDown) => {
            if (!isMouseDown)
                return;
            const coords = getMouseCoords(event);
            wasMouseOverStringOnDown = isMouseOverString(coords.x, coords.y);
            if (wasMouseOverStringOnDown) {
                isDraggingOverString = true;
            }
            if (!isDraggingOverString)
                return;
            const isCurrentlyOver = isMouseOverString(coords.x, coords.y);
            if (!isCurrentlyOver) {
                string.strum(string.fret); // button drag case
                isDraggingOverString = false;
            }
        },
        handleMouseUp: (event) => {
            isMouseDown = false;
            isDraggingOverString = false;
            wasMouseOverStringOnDown = false;
            const coords = getMouseCoords(event);
            wasMouseOverStringOnDown = isMouseOverString(coords.x, coords.y);
            if (wasMouseOverStringOnDown) {
                isDraggingOverString = true;
                string.strum(string.fret); // button press case
            }
        }
    };
}
function main() {
    // Set canvas size
    CANVAS_UKULELE.width = 800;
    CANVAS_UKULELE.height = 400;
    const ctx = CANVAS_UKULELE.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get context');
    }
    levelTab();
    // Draw ukulele image - scale it to fit canvas and draw last so it's on top
    const drawUkuleleImage = () => {
        try {
            // Scale the image to fit the canvas (800x400)
            const canvasWidth = CANVAS_UKULELE.width;
            const canvasHeight = CANVAS_UKULELE.height;
            const imageWidth = IMG_UKULELE.naturalWidth;
            const imageHeight = IMG_UKULELE.naturalHeight;
            // Calculate scale to fit image in canvas while maintaining aspect ratio
            const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
            const scaledWidth = imageWidth * scale + 200;
            const scaledHeight = imageHeight * scale + 200;
            // Center the image
            const x = (canvasWidth - scaledWidth) / 2;
            const y = (canvasHeight - scaledHeight) / 2;
            ctx.drawImage(IMG_UKULELE, x, y, scaledWidth, scaledHeight);
            console.log(`Drew ukulele image at (${x}, ${y}) with size ${scaledWidth}x${scaledHeight}`);
        }
        catch (error) {
            console.error('Error drawing ukulele image:', error);
        }
    };
    // Check if image is already loaded
    if (IMG_UKULELE.complete && IMG_UKULELE.naturalWidth > 0) {
        drawUkuleleImage();
    }
    else {
        // Set up onload handler
        IMG_UKULELE.onload = () => {
            console.log('Image loaded, drawing now');
            drawUkuleleImage();
        };
        // Also set up onerror handler to catch loading issues
        IMG_UKULELE.onerror = () => {
            console.error('Failed to load ukulele image');
        };
    }
    // Draw rectangles
    // ctx.strokeStyle = "gray";
    // ctx.lineWidth = 2;
    // ctx.strokeRect(STRING_1.x, STRING_1.y, STRING_1.width, STRING_1.height);
    // ctx.strokeRect(STRING_2.x, STRING_2.y, STRING_2.width, STRING_2.height);
    // ctx.strokeRect(STRING_3.x, STRING_3.y, STRING_3.width, STRING_3.height);
    // ctx.strokeRect(STRING_4.x, STRING_4.y, STRING_4.width, STRING_4.height);
    // Create string handler for the red rectangle
    const stringHandler1 = createStringHandler(STRING_1);
    const stringHandler2 = createStringHandler(STRING_2);
    const stringHandler3 = createStringHandler(STRING_3);
    const stringHandler4 = createStringHandler(STRING_4);
    // Mouse down event
    CANVAS_UKULELE.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        stringHandler1.handleMouseDown(event);
        stringHandler2.handleMouseDown(event);
        stringHandler3.handleMouseDown(event);
        stringHandler4.handleMouseDown(event);
    });
    // Mouse move event
    CANVAS_UKULELE.addEventListener('mousemove', (event) => {
        stringHandler1.handleMouseMove(event, isMouseDown);
        stringHandler2.handleMouseMove(event, isMouseDown);
        stringHandler3.handleMouseMove(event, isMouseDown);
        stringHandler4.handleMouseMove(event, isMouseDown);
    });
    // Mouse up event
    CANVAS_UKULELE.addEventListener('mouseup', (event) => {
        isMouseDown = false;
        stringHandler1.handleMouseUp(event);
        stringHandler2.handleMouseUp(event);
        stringHandler3.handleMouseUp(event);
        stringHandler4.handleMouseUp(event);
        levelTab();
    });
    const keysDown = new Set();
    document.addEventListener('keydown', (event) => {
        keysDown.add(event.key);
        if (keysDown.has('0')) {
            STRING_1.fret = 10;
        }
        else if (keysDown.has('9')) {
            STRING_1.fret = 9;
        }
        else if (keysDown.has('8')) {
            STRING_1.fret = 8;
        }
        else if (keysDown.has('7')) {
            STRING_1.fret = 7;
        }
        else if (keysDown.has('6')) {
            STRING_1.fret = 6;
        }
        else if (keysDown.has('5')) {
            STRING_1.fret = 5;
        }
        else if (keysDown.has('4')) {
            STRING_1.fret = 4;
        }
        else if (keysDown.has('3')) {
            STRING_1.fret = 3;
        }
        else if (keysDown.has('2')) {
            STRING_1.fret = 2;
        }
        else if (keysDown.has('1')) {
            STRING_1.fret = 1;
        }
        else {
            STRING_1.fret = 0;
        }
        if (keysDown.has('p')) {
            STRING_2.fret = 10;
        }
        else if (keysDown.has('o')) {
            STRING_2.fret = 9;
        }
        else if (keysDown.has('i')) {
            STRING_2.fret = 8;
        }
        else if (keysDown.has('u')) {
            STRING_2.fret = 7;
        }
        else if (keysDown.has('y')) {
            STRING_2.fret = 6;
        }
        else if (keysDown.has('t')) {
            STRING_2.fret = 5;
        }
        else if (keysDown.has('r')) {
            STRING_2.fret = 4;
        }
        else if (keysDown.has('e')) {
            STRING_2.fret = 3;
        }
        else if (keysDown.has('w')) {
            STRING_2.fret = 2;
        }
        else if (keysDown.has('q')) {
            STRING_2.fret = 1;
        }
        else {
            STRING_2.fret = 0;
        }
        if (keysDown.has(';')) {
            STRING_3.fret = 10;
        }
        else if (keysDown.has('l')) {
            STRING_3.fret = 9;
        }
        else if (keysDown.has('k')) {
            STRING_3.fret = 8;
        }
        else if (keysDown.has('j')) {
            STRING_3.fret = 7;
        }
        else if (keysDown.has('h')) {
            STRING_3.fret = 6;
        }
        else if (keysDown.has('g')) {
            STRING_3.fret = 5;
        }
        else if (keysDown.has('f')) {
            STRING_3.fret = 4;
        }
        else if (keysDown.has('d')) {
            STRING_3.fret = 3;
        }
        else if (keysDown.has('s')) {
            STRING_3.fret = 2;
        }
        else if (keysDown.has('a')) {
            STRING_3.fret = 1;
        }
        else {
            STRING_3.fret = 0;
        }
        if (keysDown.has('/')) {
            STRING_4.fret = 10;
        }
        else if (keysDown.has('.')) {
            STRING_4.fret = 9;
        }
        else if (keysDown.has(',')) {
            STRING_4.fret = 8;
        }
        else if (keysDown.has('m')) {
            STRING_4.fret = 7;
        }
        else if (keysDown.has('n')) {
            STRING_4.fret = 6;
        }
        else if (keysDown.has('b')) {
            STRING_4.fret = 5;
        }
        else if (keysDown.has('v')) {
            STRING_4.fret = 4;
        }
        else if (keysDown.has('c')) {
            STRING_4.fret = 3;
        }
        else if (keysDown.has('x')) {
            STRING_4.fret = 2;
        }
        else if (keysDown.has('z')) {
            STRING_4.fret = 1;
        }
        else {
            STRING_4.fret = 0;
        }
    });
    document.addEventListener('keyup', (event) => {
        keysDown.delete(event.key);
        STRING_1.fret = 0;
        STRING_2.fret = 0;
        STRING_3.fret = 0;
        STRING_4.fret = 0;
    });
}
function saveTextAsFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href); // optional cleanup
}
function saveTabs() {
    saveTextAsFile("guitar-guitar-revolution-tabs.txt", `${STRING_1.tab}
        ${STRING_2.tab}
        ${STRING_3.tab}
        ${STRING_4.tab})`);
}
//# sourceMappingURL=main.js.map