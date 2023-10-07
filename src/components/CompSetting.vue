<template>
    <div class="flex justify-between space-x-4">
        <div class="flex grow justify-start items-center">
            <p>
                {{ setting.name }}
            </p>
        </div>
        <div>
            <div v-if="setting.type === 'checkbox'">
                <input
                    type="checkbox"
                    class="w-5 h-5"
                    :checked="val"
                    @change="setting.onchange($event.target.checked)"
                >
            </div>
            <div v-else-if="setting.type === 'select'">
                <select
                    class="w-full h-full bg-transparent border-2 border-slate-200/[0.2] rounded-md py-1 px-2"
                    :value="val"
                    @change="setting.onchange($event.target.value)"
                >
                    <option
                        v-for="value in setting.values"
                        :key="value.value"
                        :value="value.value"
                    >
                        {{ value.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompSetting",
    components: {
        
    },
    props: {
        setting: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            val: null
        }
    },
    mounted() {
        if (this.setting.value === undefined) {
            if (this.setting.values !== undefined)
                this.val = this.setting.values[0].value;
            else this.val = "";
        } else if (this.setting.value instanceof Promise) {
            this.setting.value.then(value => {
                this.val = value;
                console.log(this.val);
            });
        } else this.val = this.setting.value;
    },
    methods: {
        
    }
}
</script>