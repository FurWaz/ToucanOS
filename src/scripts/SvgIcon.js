class SvgIcon {
    constructor (path, viewBox = undefined) {
        this.path = path;
        this.viewBox = viewBox;
    }

    getPath() {
        return this.path;
    }

    getViewBox() {
        return this.viewBox;
    }
};

export default SvgIcon;