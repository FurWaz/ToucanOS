<template>
    <div
        v-if="option.type == 'separation'"
        class="flex w-full"
    >
        <span class="w-full h-0.5 bg-slate-200/[0.2] rounded-full" />
    </div>
    <button
        v-else
        class="flex relative w-full hover:bg-slate-50/[0.3] px-2 py-1 rounded-md transition-all space-x-2"
        @click="call"
    >
        <div
            v-if="option.icon"
            class="flex justify-center items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                :viewBox="option.icon.viewBox ?? '0 0 512 512'"
                fill="currentColor"
                class="w-4 h-4"
            >
                <path :d="option.icon.path" />
            </svg>
        </div>
        <div class="flex grow text-md font-semibold pb-0.5">
            {{ option.name }}
        </div>
        <div
            v-if="option.elements"
            class="flex justify-center items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
                class="w-4 h-4"
            >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
            </svg>
        </div>
        <div
            v-show="hovered && option.elements"
            class="absolute -right-20 pl-8 top-0 w-fit h-fit"
        >
            <div class="rounded-lg border-2 backdrop-blur border-slate-200/[0.2] dark:border-slate-600/[0.4] select-none p-1 space-y-1">
                <comp-context-option
                    v-for="element in option.elements"
                    :key="element.name"
                    :option="element"
                />
            </div>
        </div>
    </button>
</template>

<script>
import ContextMenu from '../scripts/ContextMenu';
export default {
    name: "CompContextOption",
    components: {
        
    },
    props: {
        option: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hovered: false
        }
    },
    mounted() {
        this.$el.addEventListener('mouseenter', () => {
            this.hovered = true;
        });
        this.$el.addEventListener('mouseleave', () => {
            this.hovered = false;
        });
    },
    methods: {
        call(ev) {
            if (this.option.callback && !ev.handled) {
                ev.handled = this.option.callback({...ev, data: ContextMenu.getData()});
                ev.preventDefault();
            }
        }
    }
}
</script>