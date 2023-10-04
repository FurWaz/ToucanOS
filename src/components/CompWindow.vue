<template>
    <div
        class="flex fixed flex-col rounded-lg border-2 backdrop-blur border-slate-200/[0.2] dark:border-slate-600/[0.4] select-none min-w-[8em] min-h-[4em]"
        :class="win.isFocused() ? 'z-10 shadow-xl' : 'z-0 shadow-md'"
        :style="'top: ' + win.getY() * playground.height + 'px; left: ' + win.getX() * playground.width + 'px; width: ' + win.getWidth() * playground.width + 'px; height: ' + win.getHeight() * playground.height + 'px'"
    >
        <div
            ref="resize-bar"
            class="flex absolute -bottom-1.5 -right-1.5 w-3 h-3 cursor-se-resize"
        />
        <div class="flex justify-end">
            <div
                ref="move-bar"
                class="flex grow items-center overflow-hidden"
            >
                <p class="px-2 font-semibold text-slate-200 whitespace-nowrap text-ellipsis overflow-hidden">
                    {{ win.getTitle() }}
                </p>
            </div>
            <div class="flex space-x-2 p-2">
                <button
                    v-for="btn in winBtns"
                    :key="btn"
                    class="flex h-4 w-4 rounded-full justify-center items-center p-1"
                    :style="'background-color: ' + btn.color"
                    @click="btn.callback"
                >
                    <svg
                        class="flex text-white"
                        fill="currentColor"
                        :viewBox="btn.viewBox ?? '0 0 512 512'"
                    >
                        <path
                            :d="btn.icon"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex grow p-2 pt-0 max-h-full min-h-0">
            <div class="flex grow max-h-full min-h-0 w-full max-w-full bg-slate-600/[0.3] dark:bg-slate-800/[0.4] border-2 border-slate-200/[0.2] dark:border-slate-600/[0.4] rounded-md overflow-hidden select-auto">
                <div class="flex grow overflow-y-auto">
                    <iframe
                        v-if="typeof(win.content) === 'string' && win.content.startsWith('http')"
                        class="w-full h-full"
                        :src="win.content"
                        frameborder="0"
                    />
                    <component
                        :is="win.content"
                        v-else-if="typeof(win.content) === 'object'"
                    />
                    <p v-else-if="typeof(win.content) === 'string'">
                        {{ win.content }}
                    </p>
                    <slot v-else-if="win.content === undefined || win.content === null" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompWindow",
    components: {
        
    },
    props: {
        win: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            window,
            winBtns: [
                {
                    color: '#16a34a',
                    viewBox: '0 0 448 512',
                    icon: "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z",
                    callback: () => {  }
                },
                {
                    color: '#f59e0b',
                    icon: "M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z",
                    callback: () => { this.maximize() }
                },
                {
                    color: '#dc2626',
                    viewBox: '0 0 384 512',
                    icon: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z",
                    callback: () => { this.close(); }
                }
            ],
            playground: {
                width: this.win.getManager().getPlayground().width,
                height: this.win.getManager().getPlayground().height
            }
        };
    },
    mounted() {
        this.$el.addEventListener('mousedown', ev => {
            this.win.focus();
        });

        this.$el.classList.add('spawn-zoom');
        setTimeout(() => {
            this.$el.classList.remove('spawn-zoom');
        }, 100);

        window.addEventListener('resize', () => {
            this.playground.width = this.win.getManager().getPlayground().width;
            this.playground.height = this.win.getManager().getPlayground().height;
        });

        this.setupMoveBar();
        this.setupResizeBar();
    },
    methods: {
        maximize() {
            this.$el.classList.add('transition-all');
            this.win.toggleMaximize();
            setTimeout(() => {
                this.$el.classList.remove('transition-all');
            }, 250);
        },
        close() {
            this.$el.classList.add('despawn-zoom');
            setTimeout(() => {
                this.win.close();
            }, 100);
        },
        setupMoveBar() {
            /** @type {HTMLDivElement} */
            const moveBar = this.$refs["move-bar"];
            let mouseStartPos = { x: 0, y: 0 };
            let winStartPos = { x: 0, y: 0 };
            let mouseDown = false;
            let lastUpTime = 0;
            moveBar.addEventListener('mousedown', ev => {
                if (Date.now() - lastUpTime < 250) {
                    this.maximize();
                } else {
                    mouseDown = true;
                    mouseStartPos = { x: ev.clientX, y: ev.clientY };
                    winStartPos = { x: this.win.getX(), y: this.win.getY() };
                }
            });
            window.addEventListener('mouseup', ev => {
                mouseDown = false;
                lastUpTime = Date.now();
            });
            window.addEventListener('mousemove', ev => {
                if (mouseDown && !this.win.isMaximized()) {
                    const deltaX = ev.clientX - mouseStartPos.x;
                    const deltaY = ev.clientY - mouseStartPos.y;
                    this.win.setX(winStartPos.x + deltaX / window.innerWidth);
                    this.win.setY(winStartPos.y + deltaY / window.innerHeight);
                }
            });
        },
        setupResizeBar() {
            /** @type {HTMLDivElement} */
            const resizeBar = this.$refs["resize-bar"];
            let mouseStartPos = { x: 0, y: 0 };
            let winStartSize = { w: 0, h: 0 };
            let mouseDown = false;
            resizeBar.addEventListener('mousedown', ev => {
                mouseDown = true;
                mouseStartPos = { x: ev.clientX, y: ev.clientY };
                winStartSize = { w: this.win.getWidth(), h: this.win.getHeight() };
            });
            window.addEventListener('mouseup', ev => {
                mouseDown = false;
            });
            window.addEventListener('mousemove', ev => {
                if (mouseDown) {
                    const deltaX = ev.clientX - mouseStartPos.x;
                    const deltaY = ev.clientY - mouseStartPos.y;
                    this.win.setWidth(winStartSize.w + deltaX / window.innerWidth);
                    this.win.setHeight(winStartSize.h + deltaY / window.innerHeight);
                }
            });
        }
    }
}
</script>