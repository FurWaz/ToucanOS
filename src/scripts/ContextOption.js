class ContextOption {
    constructor (name, callback, icon = undefined, elements = undefined) {
        this.name = name;
        this.callback = callback;
        this.icon = icon;
        this.elements = elements;
        this.type = 'option';
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getCallback() {
        return this.callback;
    }

    getIcon() {
        return this.icon;
    }

    getElements() {
        return this.elements;
    }
};

export default ContextOption;