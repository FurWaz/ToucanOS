<template>
    <div
        ref="background"
        class="flex grow flex-col min-h-0 h-full min-w-0 w-full"
    >
        <div class="fixed top-0 left-0 right-0 bottom-0 bg-dark" />
        <div class="fixed top-0 left-0 right-0 bottom-0 bg-light opacity-1 dark:opacity-0" />
        <p class="fixed top-0 right-2 text-slate-50/[0.6] dark:text-slate-50/[0.3]">
            Made by
            <a
                href="https://furwaz.fr"
                target="_blank"
                class="text-orange-500/[0.8] dark:text-orange-500/[0.5] font-semibold hover:underline"
            > FurWaz </a>
        </p>
        <comp-contextmenu />
        <div
            ref="playground"
            class="flex grow overflow-hidden"
        >
            <comp-window
                v-for="win in manager.windows"
                :key="win.id"
                :win="win"
            />
        </div>
        <comp-settings
            ref="settings-panel"
            class="hidden absolute right-2 bottom-14"
        />
        <div class="flex h-fit w-full backdrop-blur border-t-2 border-slate-200/[0.2] dark:border-slate-600/[0.4] p-1.5 z-40">
            <div class="flex grow space-x-2">
                <button
                    v-for="app in apps"
                    :key="app.name"
                    class="hover:bg-slate-200/[0.1] rounded-md p-1.5 text-slate-200 hover:text-slate-50 transition-all"
                    @click="app.callback"
                >
                    <svg
                        v-if="app.icon"
                        xmlns="http://www.w3.org/2000/svg"
                        :viewBox="app.viewBox ?? '0 0 512 512'"
                        fill="currentColor"
                        class="w-5 h-5"
                    >
                        <path :d="app.icon" />
                    </svg>
                    <img
                        v-if="app.img"
                        :src="app.img"
                        alt="icon"
                        class="w-5 h-5 all-white"
                    >
                </button>
            </div>
            <div class="flex space-x-2">
                <div class="flex flex-col justify-center items-end text-slate-200 -translate-y-1">
                    <p class="text-md font-bold">
                        {{ currentHour }}
                    </p>
                    <p class="text-xs font-bold -my-1">
                        {{ currentDate }}
                    </p>
                </div>
                <button
                    v-for="control in controls"
                    :key="control.name"
                    class="hover:bg-slate-200/[0.1] rounded-md p-1.5 text-slate-200 hover:text-slate-50 transition-all"
                    @click="control.callback"
                >
                    <svg
                        v-if="control.icon"
                        xmlns="http://www.w3.org/2000/svg"
                        :viewBox="control.viewBox ?? '0 0 512 512'"
                        fill="currentColor"
                        class="w-5 h-5"
                    >
                        <path :d="control.icon" />
                    </svg>
                    <img
                        v-if="control.img"
                        :src="control.img"
                        alt="icon"
                        class="w-5 h-5"
                    >
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CompToucanOs from '../components/CompToucanOs.vue';
import CompWindow from '../components/CompWindow.vue';
import WindowManager from '../scripts/WindowManager';
import ViewProjects from './windows/ViewProjects.vue';
import ViewAbout from './windows/ViewAbout.vue';
import {markRaw} from "vue";
import CompContextmenu from '../components/CompContextmenu.vue';
import CompSettings from '../components/CompSettings.vue';
import Settings from '../scripts/data/settings';

export default {
    name: "HomeView",
    components: {
        CompWindow,
        CompContextmenu,
        CompSettings
    },
    data() {
        return {
            manager: new WindowManager(),
            apps: [
                {
                    name: 'Accueil',
                    img: '/assets/ToucanOs.svg',
                    callback: () => { this.createHomeWindow(); }
                },
                {
                    name: 'Projets',
                    viewBox: '0 0 512 512',
                    icon: 'M64.7 34.6L160 107.9V160H107.9L34.6 64.7 64.7 34.6zM192 169.3c0-.4 0-.9 0-1.3V104c0-7.5-3.5-14.5-9.4-19L78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h64c.4 0 .9 0 1.3 0L271.2 293.9c-19.5 30-16.2 70.5 10.1 96.8l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-26.3-26.3-66.8-29.7-96.8-10.1L192 169.3zM304 304c17.7-17.7 46.3-17.7 64 0L480 416l-64 64L304 368c-17.7-17.7-17.7-46.3 0-64zM104 424a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM23.2 376.8C8.3 391.7 0 411.8 0 432.8C0 476.5 35.5 512 79.2 512c21 0 41.1-8.3 56-23.2L238.5 385.5c-5.7-11.2-9.3-23.1-10.9-35.3L112.1 465.7c-8.7 8.7-20.6 13.6-32.9 13.6c-25.7 0-46.6-20.8-46.6-46.6c0-12.3 4.9-24.2 13.6-32.9L189.1 257l-23.1-23.1L23.2 376.8zM479.4 160c0 44.8-23.1 84.1-58 106.8l23.5 23.5c40.7-29 67.2-76.6 67.2-130.3c0-24.8-5.7-48.3-15.7-69.3c-4.4-9.2-16.5-10.5-23.7-3.3l-67.9 67.9c-3 3-7.1 4.7-11.3 4.7H368c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l67.9-67.9c7.2-7.2 5.9-19.3-3.3-23.7C400.3 5.7 376.8 0 352 0C296.1 0 246.9 28.6 218.3 72.1l26 20C266.8 56.3 306.7 32.6 352 32.6c10.3 0 20.2 1.2 29.7 3.5L333.6 84.2c-9.1 9.1-14.2 21.5-14.2 34.4V144c0 26.9 21.8 48.6 48.6 48.6h25.4c12.9 0 25.3-5.1 34.4-14.2l48.1-48.1c2.3 9.5 3.5 19.5 3.5 29.7z',
                    callback: () => { this.createProjectWindow(); }
                },
                {
                    name: 'À propos',
                    viewBox: '0 0 512 512',
                    icon: 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z',
                    callback: () => { this.createAboutWindow(); }
                }
            ],
            controls: [
                {
                    name: 'Paramètres',
                    viewBox: '0 0 512 512',
                    icon: 'M256 0c17 0 33.6 1.7 49.8 4.8c7.9 1.5 21.8 6.1 29.4 20.1c2 3.7 3.6 7.6 4.6 11.8l9.3 38.5C350.5 81 360.3 86.7 366 85l38-11.2c4-1.2 8.1-1.8 12.2-1.9c16.1-.5 27 9.4 32.3 15.4c22.1 25.1 39.1 54.6 49.9 86.3c2.6 7.6 5.6 21.8-2.7 35.4c-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10c8.2 13.6 5.2 27.8 2.7 35.4c-10.8 31.7-27.8 61.1-49.9 86.3c-5.3 6-16.3 15.9-32.3 15.4c-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8c-7.7 14-21.6 18.5-29.4 20.1C289.6 510.3 273 512 256 512s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1c-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9c-16.1 .5-27-9.4-32.3-15.4c-22-25.1-39.1-54.6-49.9-86.3c-2.6-7.6-5.6-21.8 2.7-35.4c2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5L24.2 218.9c-3.1-3-5.8-6.4-8-10C8 195.3 11 181.1 13.6 173.6c10.8-31.7 27.8-61.1 49.9-86.3c5.3-6 16.3-15.9 32.3-15.4c4.1 .1 8.2 .8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8c7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zM218.1 51.4l-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6L97.9 120.9c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89L59.9 325.4c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z',
                    callback: () => { this.toggleSettings() }
                }
            ],
            currentHour: this.getCurrentHour(),
            currentDate: this.getCurrentDate(),
            showSeconds: false
        };
    },
    mounted() {
        this.manager.setPlayground(this.$refs['playground']);
        this.createHomeWindow();

        this.$refs['background'].addEventListener('contextmenu', ev => {
            // ContextMenu.setPosition(ev.x, ev.y);
            // ContextMenu.setOptions(backgroundOptions);
            // ContextMenu.display();
            ev.preventDefault();
        });

        setInterval(() => {
            this.currentHour = this.getCurrentHour();
            this.currentDate = this.getCurrentDate();
        }, 1000);

        Settings.addSettingListener('showSeconds', (value) => {
            this.showSeconds = value;
            this.currentHour = this.getCurrentHour();
        });
        Settings.getSetting('showSeconds').then(value => {
            this.showSeconds = value;
            this.currentHour = this.getCurrentHour();
        });
    },
    methods: {
        createWindow(title, comp) {
            const window = this.manager.getWindow(title);
            if (window) {
                window.focus();
            } else {
                this.manager.createWindow(undefined, undefined, undefined, undefined, title, markRaw(comp));
            }
        },
        createHomeWindow() { this.createWindow('Bienvenue', CompToucanOs); },
        createProjectWindow() { this.createWindow('Projets', ViewProjects); },
        createAboutWindow() { this.createWindow('À propos', ViewAbout); },
        getCurrentHour() { return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: this.showSeconds ? '2-digit' : undefined }) },
        getCurrentDate() { return new Date().toLocaleDateString('fr-FR') },
        toggleSettings() {
            const panel = this.$refs['settings-panel'];
            panel.$el.classList.remove('hidden');
            if (panel.$el.classList.contains('show-up')) {
                panel.$el.classList.remove('show-up');
                panel.$el.classList.add('hide-down');
            } else {
                panel.$el.classList.remove('hide-down');
                panel.$el.classList.add('show-up');
            }
        }
    }
}
</script>
