<template>
    <div class="flex flex-col grow min-w-0 min-h-0 overflow-hidden">        
        <router-view />
    </div>
</template>

<script>
import Settings from './scripts/data/settings';
export default {
    name: "App",
    components: {
        
    },
    data() {
        return {}
    },
    mounted() {
        const updateTheme = theme => {
            currentTheme = theme;
            if (!theme || theme === 'auto') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };
        let currentTheme = null;

        Settings.getSetting("theme").then(updateTheme);
        Settings.addSettingListener("theme", updateTheme);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (currentTheme !== null && currentTheme !== 'auto')
                return;
            
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }
};
</script>
