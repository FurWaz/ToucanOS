<template>
    <div class="flex flex-col min-h-full h-fit min-w-fit w-full p-4">
        <div class="flex flex-col items-center h-fit min-w-full w-fit py-20">
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
                        :style="'animation-delay: ' + (index * 0.1) + 's'"
                    >
                        {{ letter }}
                    </p>
                </div>
            </div>
            <p
                class="text-md md:text-lg italic show-up"
                style="animation-delay: 1s"
            >
                Mes projets
            </p>
        </div>
        <div class="show-up h-fit w-full">
            // TODO: Add content
        </div>
    </div>
</template>

<script>

export default {
    name: "ViewProjects",
    components: {
        
    },
    props: {
        
    },
    data() {
        return {
            letters: 'Projets'
        };
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>
