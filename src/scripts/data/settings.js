function jsonc2json(jsonc) {
    return jsonc.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
}

class Settings {
    static settings = null;
    static defaultSettings = null;
    static listeners = {};

    static async loadSettings() {
        if (this.settings === null) {
            this.settings = await this.fetchSettings();
        }
        return this.settings;
    }

    static async fetchSettings() {
        if (this.defaultSettings === null) {
            await this.fetchDefaultSettings();
        }

        const res = localStorage.getItem('settings');
        if (res === null) {
            return this.defaultSettings;
        }
        
        const data = JSON.parse(res);
        return data;
    }

    static async fetchDefaultSettings() {
        const res = await fetch('/data/defaultSettings.jsonc');
        const data = await res.text();
        const json = JSON.parse(jsonc2json(data));
        return json;
    }

    static async getSettings() {
        if (this.settings === null) {
            await this.loadSettings();
        }

        return {...this.settings, ...this.defaultSettings};
    }

    static async getDefaultSetting(key) {
        if (this.defaultSettings === null) {
            this.defaultSettings = await this.fetchDefaultSettings();
        }

        return this.defaultSettings[key];
    }

    static async setSettings(settings, save=true) {
        this.settings = settings;

        for (const key in this.listeners) {
            if (this.listeners[key] !== undefined) {
                for (const callback of this.listeners[key]) {
                    callback(settings[key]);
                }
            }
        }

        if (save) await this.saveSettings();
    }

    static async resetSettings() {
        this.settings = this.defaultSettings;
    }

    static async saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    static async getSetting(key) {
        const settings = await this.getSettings();
        return settings[key] ?? await this.getDefaultSetting(key);
    }

    static async setSetting(key, value, save=true) {
        if (this.settings === null) {
            await this.loadSettings();
        }
        this.settings[key] = value;

        if (this.listeners[key] !== undefined) {
            for (const callback of this.listeners[key]) {
                callback(value);
            }
        }

        if (save) await this.saveSettings();
    }

    static addSettingListener(key, callback) {
        if (this.listeners[key] === undefined) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }
}

export default Settings;
