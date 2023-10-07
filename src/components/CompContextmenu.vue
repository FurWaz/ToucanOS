<template>
    <div
        v-show="ContextMenu.isDisplayed()"
        class="absolute z-50 rounded-lg border-2 backdrop-blur border-slate-200/[0.2] dark:border-slate-600/[0.4] select-none min-w-[8em] min-h-[4em] p-1 space-y-1"
        :style="'top: ' + ContextMenu.getPosition().y + 'px; left: ' + ContextMenu.getPosition().x + 'px'"
    >
        <comp-context-option
            v-for="option in ContextMenu.getOptions()"
            :key="option.name"
            :option="option"
        />
    </div>
</template>

<script>
import ContextMenu from '../scripts/ContextMenu';
import CompContextOption from './CompContextOption.vue';

export default {
    name: "CompContextmenu",
    components: {
        CompContextOption
    },
    props: {
        
    },
    data() {
        return {
            ContextMenu
        }
    },
    mounted() {
        ContextMenu.registerDom(this);
    },
    methods: {
        
    }
}
</script>