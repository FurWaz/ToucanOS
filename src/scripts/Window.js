let WINDOW_ID_COUNTER = 0;

class Window {
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    title = "";
    maximized = false;
    manager = null;
    id = WINDOW_ID_COUNTER++;
    content = null;

    constructor(manager, x, y, width, height, title, content) {
        const isMobile = window.innerWidth < 768;
        this.manager = manager;
        this.x = x ?? (isMobile? 0: 0.2);
        this.y = y ?? (isMobile? 0: 0.2);
        this.width = width ?? (isMobile? 1: 0.6);
        this.height = height ?? (isMobile? 1: 0.6);
        this.title = title ?? this.title;
        this.content = content ?? this.content;
    }

    toggleMaximize() {
        this.maximized = !this.maximized;
    }

    isFocused() {
        return this.manager.getFocusedWindow() === this;
    }

    focus() {
        this.manager.setFocusedWindow(this);
    }

    close() {
        this.manager?.removeWindow(this);
    }

    getWidth() {
        return this.maximized ? 1 : this.width;
    }

    getHeight() {
        return this.maximized ? 1 : this.height;
    }

    getX() {
        return this.maximized ? 0 : this.x;
    }

    getY() {
        return this.maximized ? 0 : this.y;
    }

    getTitle() {
        return this.title;
    }

    getManager() {
        return this.manager;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setTitle(title) {
        this.title = title;
    }
}

export default Window;
