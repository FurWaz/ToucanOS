<template>
    <div class="rounded-lg border-2 backdrop-blur border-slate-200/[0.2] dark:border-slate-600/[0.4] select-none p-2">
        <p class="text-lg font-semibold">
            Paramètres
        </p>
        <span class="flex grow w-full h-0.5 rounded-full bg-slate-200/[0.5]" />
        <div class="flex flex-col space-y-4 py-2 px-1">
            <comp-setting
                v-for="setting in settings"
                :key="setting.name"
                :setting="setting"
            />
        </div>
    </div>
</template>

<script>
import CompSetting from './CompSetting.vue';
import Settings from '../scripts/data/settings';

const settings = [
    {
        name: "Thème",
        type: "select",
        values: [
            {
                name: "Sombre",
                value: "dark"
            },
            {
                name: "Auto",
                value: "auto"
            },
            {
                name: "Clair",
                value: "light"
            }
        ],
        value: Settings.getSetting("theme"),
        onchange: (value) => {
            Settings.setSetting("theme", value);
        }
    },
    {
        name: "Afficher les secondes",
        type: "checkbox",
        value: Settings.getSetting("showSeconds"),
        onchange: (value) => {
            Settings.setSetting("showSeconds", value);
        }
    }
];

export default {
    name: "CompSettings",
    components: {
        CompSetting
    },
    props: {
        
    },
    data() {
        return {
            settings
        }
    },
    methods: {
        
    }
}
</script>