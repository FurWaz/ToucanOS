import ContextOption from "./ContextOption";
import SvgIcon from "./SvgIcon";

class ContextMenu {
    static displayed = false;
    static vue = null;
    static position = {x: 0, y: 0};
    static isSetup = false;
    static options = [];
    static data = null;

    static setup() {
        if (this.isSetup) return;
        this.isSetup = true;
        window.addEventListener('click', ev => {
            if (this.displayed && ev.button === 0) {
                setTimeout(() => {
                    this.hide();
                }, 10);
            }
        });
    }

    static setData(data) {
        this.data = data;
    }

    static getData() {
        return this.data;
    }

    static getOptions() {
        return this.options;
    }

    static setOptions(options) {
        this.options = options;
    }

    static getPosition() {
        return this.position;
    }

    static setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    static isDisplayed() {
        return this.displayed;
    }

    static registerDom(vue) {
        this.vue = vue;
    }

    static display() {
        this.setup();
        this.displayed = true;
        this.vue?.$forceUpdate();
    }

    static hide() {
        this.displayed = false;
        this.vue?.$forceUpdate();
    }
};

export default ContextMenu;