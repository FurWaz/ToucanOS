<template>
    <div class="flex flex-col min-h-full h-fit min-w-fit w-full p-4">
        <div class="flex flex-col items-center h-fit min-w-full w-fit py-20">
            <div class="flex justify-center items-center space-x-4">
                <img
                    class="w-8 md:w-12 h-8 md:h-12 show-right"
                    src="/assets/ToucanOs.svg"
                >
                <div class="flex">
                    <p
                        v-for="(letter, index) in letters"
                        :key="index"
                        class="text-4xl md:text-6xl font-bold show-left"
                        :class="index >= letters.length - 2? 'text-orange-500': 'text-slate-700 dark:text-slate-50'"
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
                Bienvenue sur ToucanOS
            </p>
        </div>
        <div class="show-up h-fit w-full text-lg md:text-xl space-y-4">
            <h2 class="text-3xl md:text-4xl font-semibold">
                Bienvenue sur ToucanOS !
            </h2>
            <p>
                Sur ToucanOS, vous pouvez voir mes différents projets, et même les tester !
                Pour cela, cliquez sur le bouton "Projets" dans la barre de navigation.
            </p>
            <p>
                Si vous vous demandez qui je suis, vous pouvez aussi cliquer sur le bouton "À propos" !
                Vous y retrouverez toutes les informations me concernant.
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: "CompToucanOs",
    components: {
        
    },
    props: {
        
    },
    data() {
        return {
            letters: 'ToucanOS'
        };
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>
