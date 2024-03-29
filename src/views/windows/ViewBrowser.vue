<template>
    <div class="flex flex-col min-h-full h-fit min-w-fit w-full p-4">
        <div
            v-if="link === null"
            class="flex flex-col items-center h-fit min-w-full w-fit py-20">
            <div class="flex justify-center items-center space-x-4">
                <img
                    class="w-8 md:w-12 h-8 md:h-12 show-right"
                    src="/assets/ToucanOs.svg"
                >
                <div class="flex pb-3">
                    <p
                        v-for="(letter, index) in letters"
                        :key="index"
                        class="text-4xl md:text-6xl font-bold text-slate-700 dark:text-slate-50 show-left"
                        :class="letter.trim() === ''? 'px-2': ''"
                        :style="'animation-delay: ' + (index * 0.02) + 's'"
                    >
                        {{ letter }}
                    </p>
                </div>
            </div>
            <div
                class="flex show-up mt-2 space-x-2"
                style="animation-delay: 250ms"
            >
                <input
                    @keyup.enter="search"
                    type="text"
                    class="bg-white/[0.1] rounded-lg text-md p-1 px-2 outline-none border-2 border-transparent w-96 md:w-120 h-8 md:h-10
                           text-slate-700 dark:text-slate-50 focus:border-slate-200/[0.3] transition-all"
                >
                <button
                    @click="search"
                    class="bg-white/[0.1] rounded-lg text-md px-2 outline-none border-2 border-transparent
                           text-slate-700 dark:text-slate-50 focus:border-slate-200/[0.3] transition-all hover:bg-slate-200/[0.3]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div
            v-else
            class="flex grow"
            style="animation-delay: 250ms"
        >
            <iframe
                :src="link"
                class="flex grow border-0"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: "ViewBrowser",
    components: {
        
    },
    props: {
        
    },
    data() {
        return {
            letters: 'Navigateur',
            link: null
        };
    },
    mounted() {
        
    },
    methods: {
        search() {
            const input = document.querySelector('input[type="text"]');
            const value = input.value.trim();
            if (value === '') return;
            
            if (value.startsWith('http://') || value.startsWith('https://')) {
                this.link = value;
            } else {
                this.link = 'https://www.google.com/search?q=' + value;
            }
        }
    }
}
</script>
