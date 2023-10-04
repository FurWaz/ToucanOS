import Window from "./Window";

class WindowManager {
    constructor(playground) {
        /** @type {Window[]} window array */
        this.windows = [];
        this.focusedWindow = null;
        this.playground = playground;
        this.bounds = this.playground?.getBoundingClientRect();
        
        window.addEventListener("resize", () => {
            this.bounds = this.playground?.getBoundingClientRect();
        });
    }

    createWindow(...params) {
        const window = new Window(this, ...params);
        let positionValid = false;
        let maxIterations = 100;
        console.log("Finding good position for window");
        while (!positionValid && maxIterations-- > 0) {
            positionValid = true;
            this.windows.forEach(w => {
                if (w.getX() === window.getX() && w.getY() === window.getY()) {
                    positionValid = false;
                    console.log("Found overlapping window, moving it");
                }
            });
            if (!positionValid) {
                window.setX(window.getX() + 0.02 % 0.8);
                window.setY(window.getY() + 0.02 % 0.8);
                console.log("Position is now " + window.getX() + ", " + window.getY());
            };
        }
        console.log("Position is now " + window.getX() + ", " + window.getY());
        this.windows.push(window);
        this.focusedWindow = window;
        return window;
    }

    removeWindow(window) {
        const index = this.windows.indexOf(window);
        if (index > -1) {
            this.windows.splice(index, 1);
        }
        this.focusedWindow = this.windows.length > 0 ? this.windows[this.windows.length - 1] : null;
    }

    getWindows() {
        return this.windows;
    }

    getWindow(title) {
        return this.windows.find(w => w.getTitle() === title);
    }

    setFocusedWindow(window) {
        this.focusedWindow = window;
    }

    getFocusedWindow() {
        return this.focusedWindow;
    }

    setPlayground(playground) {
        this.playground = playground;
        this.bounds = this.playground?.getBoundingClientRect();
    }

    getPlayground() {
        return {
            div: this.playground,
            width: this.bounds.width,
            height: this.bounds.height,
            top: this.bounds.top,
            left: this.bounds.left
        };
    }
}

export default WindowManager;
