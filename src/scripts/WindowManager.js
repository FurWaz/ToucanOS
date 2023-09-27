import Window from "./Window";

class WindowManager {
    constructor(playground) {
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
