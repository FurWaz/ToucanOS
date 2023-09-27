<template>
    <div class="flex flex-col grow min-w-0 min-h-0 overflow-hidden">        
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    components: {
        
    },
    data() {
        return {}
    },
    mounted() {
        let theme = localStorage.getItem('theme');
        if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }
};
</script>
