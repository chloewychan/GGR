const CANVAS_UKULELE = document.getElementById('canvas-ukulele') as HTMLCanvasElement;
const P_TABS = document.getElementById('p-tabs') as HTMLParagraphElement;

// Red rectangle coordinates and dimensions
const STRING_1: {
    x: number,
    y: number,
    width: number,
    height: number,
    fret: number,
    tab: string,
    strum: any
} = {
    x: 400,
    y: 100,
    width: 300,
    height: 50,
    fret: 0,
    tab: '|',
    strum: (fret: number) => {
        audios[1][fret].play().catch((error: any) => {
            console.error("Playback failed:", error);
        });
        STRING_1.tab += `--${fret}`;
    }
};

const STRING_2: {
    x: number,
    y: number,
    width: number,
    height: number,
    fret: number,
    tab: string,
    strum: any
} = {
    x: 400,
    y: 150,
    width: 300,
    height: 50,
    fret: 0,
    tab: '|',
    strum: (fret: number) => {
        audios[2][fret].play().catch((error: any) => {
            console.error("Playback failed:", error);
        });
        STRING_2.tab += `--${fret}`;
    }
}

const STRING_3: {
    x: number,
    y: number,
    width: number,
    height: number,
    fret: number,
    tab: string,
    strum: any
} = {
    x: 400,
    y: 200,
    width: 300,
    height: 50,
    fret: 0,
    tab: '|',
    strum: (fret: number) => {
        audios[3][fret].play().catch((error: any) => {
            console.error("Playback failed:", error);
        });
        STRING_3.tab += `--${fret}`;
    }
};

const STRING_4: {
    x: number,
    y: number,
    width: number,
    height: number,
    fret: number,
    tab: string,
    strum: any
} = {
    x: 400,
    y: 250,
    width: 300,
    height: 50,
    fret: 0,
    tab: '|',
    strum: (fret: number) => {
        audios[4][fret].play().catch((error: any) => {
            console.error("Playback failed:", error);
        });
        STRING_4.tab += `--${fret}`;
    }
}

function levelTab(): void {

    let length: number = Math.max(STRING_1.tab.length, STRING_2.tab.length, STRING_3.tab.length, STRING_4.tab.length);

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
    ${STRING_4.tab}`

}

const audios: HTMLAudioElement[][] = [
    [
        new Audio("./audio/g0.mp3"),
        new Audio("./audio/g1.mp3"),
        new Audio("./audio/g2.mp3"),
        new Audio("./audio/g3.mp3"),
        new Audio("./audio/g4.mp3"),
        new Audio("./audio/g5.mp3"),
        new Audio("./audio/g6.mp3"),
        new Audio("./audio/g7.mp3"),
        new Audio("./audio/g8.mp3"),
        new Audio("./audio/g9.mp3"),
    ],
    [
        new Audio("./audio/c0.mp3"),
        new Audio("./audio/c1.mp3"),
        new Audio("./audio/c2.mp3"),
        new Audio("./audio/c3.mp3"),
        new Audio("./audio/c4.mp3"),
        new Audio("./audio/c5.mp3"),
        new Audio("./audio/c6.mp3"),
        new Audio("./audio/c7.mp3"),
        new Audio("./audio/c8.mp3"),
        new Audio("./audio/c9.mp3"),
    ],
    [
        new Audio("./audio/e0.mp3"),
        new Audio("./audio/e1.mp3"),
        new Audio("./audio/e2.mp3"),
        new Audio("./audio/e3.mp3"),
        new Audio("./audio/e4.mp3"),
        new Audio("./audio/e5.mp3"),
        new Audio("./audio/e6.mp3"),
        new Audio("./audio/e7.mp3"),
        new Audio("./audio/e8.mp3"),
        new Audio("./audio/e9.mp3"),
    ],
    [
        new Audio("./audio/a0.mp3"),
        new Audio("./audio/a1.mp3"),
        new Audio("./audio/a2.mp3"),
        new Audio("./audio/a3.mp3"),
        new Audio("./audio/a4.mp3"),
        new Audio("./audio/a5.mp3"),
        new Audio("./audio/a6.mp3"),
        new Audio("./audio/a7.mp3"),
        new Audio("./audio/a8.mp3"),
        new Audio("./audio/a9.mp3"),
    ]
    
]

let isMouseDown = false;
function getMouseCoords(event: MouseEvent): { x: number, y: number } {
    const rect = CANVAS_UKULELE.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function createStringHandler(string: any) {
    let isDraggingOverString = false;
    let wasMouseOverStringOnDown = false;

    function isMouseOverString(mouseX: number, mouseY: number): boolean {
        return mouseX >= string.x && 
               mouseX <= string.x + string.width && 
               mouseY >= string.y && 
               mouseY <= string.y + string.height;
    }

    return {
        handleMouseDown: (event: MouseEvent) => {
            isMouseDown = true;
        },

        handleMouseMove: (event: MouseEvent, isMouseDown: boolean) => {
            if (!isMouseDown) return;
            
            const coords = getMouseCoords(event);

            wasMouseOverStringOnDown = isMouseOverString(coords.x, coords.y);
            if (wasMouseOverStringOnDown) {
                isDraggingOverString = true;
            }

            if(!isDraggingOverString) return;
            
            const isCurrentlyOver = isMouseOverString(coords.x, coords.y);
            if (!isCurrentlyOver) {
                string.strum(string.fret); // button drag case
                isDraggingOverString = false;
            }
        },

        handleMouseUp: (event: MouseEvent) => {
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

    // Draw rectangles
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.strokeRect(STRING_1.x, STRING_1.y, STRING_1.width, STRING_1.height);
    ctx.strokeRect(STRING_2.x, STRING_2.y, STRING_2.width, STRING_2.height);
    ctx.strokeRect(STRING_3.x, STRING_3.y, STRING_3.width, STRING_3.height);
    ctx.strokeRect(STRING_4.x, STRING_4.y, STRING_4.width, STRING_4.height);
    
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

    const keysDown = new Set<string>();

    document.addEventListener('keydown', (event) => {
        keysDown.add(event.key);
        
        if (keysDown.has('0')) { STRING_1.fret = 10 }
        else if (keysDown.has('9')) { STRING_1.fret = 9 }
        else if (keysDown.has('8')) { STRING_1.fret = 8 }
        else if (keysDown.has('7')) { STRING_1.fret = 7 }
        else if (keysDown.has('6')) { STRING_1.fret = 6 }
        else if (keysDown.has('5')) { STRING_1.fret = 5 }
        else if (keysDown.has('4')) { STRING_1.fret = 4 }
        else if (keysDown.has('3')) { STRING_1.fret = 3 }
        else if (keysDown.has('2')) { STRING_1.fret = 2 }
        else if (keysDown.has('1')) { STRING_1.fret = 1 }
        else { STRING_1.fret = 0 }

        if (keysDown.has('p')) { STRING_2.fret = 10 }
        else if (keysDown.has('o')) { STRING_2.fret = 9 }
        else if (keysDown.has('i')) { STRING_2.fret = 8 }
        else if (keysDown.has('u')) { STRING_2.fret = 7 }
        else if (keysDown.has('y')) { STRING_2.fret = 6 }
        else if (keysDown.has('t')) { STRING_2.fret = 5 }
        else if (keysDown.has('r')) { STRING_2.fret = 4 }
        else if (keysDown.has('e')) { STRING_2.fret = 3 }
        else if (keysDown.has('w')) { STRING_2.fret = 2 }
        else if (keysDown.has('q')) { STRING_2.fret = 1 }
        else { STRING_2.fret = 0 }

        if (keysDown.has(';')) { STRING_3.fret = 10 }
        else if (keysDown.has('l')) { STRING_3.fret = 9 }
        else if (keysDown.has('k')) { STRING_3.fret = 8 }
        else if (keysDown.has('j')) { STRING_3.fret = 7 }
        else if (keysDown.has('h')) { STRING_3.fret = 6 }
        else if (keysDown.has('g')) { STRING_3.fret = 5 }
        else if (keysDown.has('f')) { STRING_3.fret = 4 }
        else if (keysDown.has('d')) { STRING_3.fret = 3 }
        else if (keysDown.has('s')) { STRING_3.fret = 2 }
        else if (keysDown.has('a')) { STRING_3.fret = 1 }
        else { STRING_3.fret = 0 }

        if (keysDown.has('/')) { STRING_4.fret = 10 }
        else if (keysDown.has('.')) { STRING_4.fret = 9 }
        else if (keysDown.has(',')) { STRING_4.fret = 8 }
        else if (keysDown.has('m')) { STRING_4.fret = 7 }
        else if (keysDown.has('n')) { STRING_4.fret = 6 }
        else if (keysDown.has('b')) { STRING_4.fret = 5 }
        else if (keysDown.has('v')) { STRING_4.fret = 4 }
        else if (keysDown.has('c')) { STRING_4.fret = 3 }
        else if (keysDown.has('x')) { STRING_4.fret = 2 }
        else if (keysDown.has('z')) { STRING_4.fret = 1 }
        else { STRING_4.fret = 0 }
    });
    
    document.addEventListener('keyup', (event) => {
        keysDown.delete(event.key);

        STRING_1.fret = 0;
        STRING_2.fret = 0;
        STRING_3.fret = 0;
        STRING_4.fret = 0;
    });
}

