<template>
    <div 
        id="SelectBox"
        class="select-box" 
        data-target="poster-item"
        v-show="SelectBox.show"
        :style="'width:'+SelectBox.width+'px;height:'+SelectBox.height+'px;top:'+SelectBox.top+'px;left:'+SelectBox.left+'px;'"
    >
        <i data-target="resize" data-resize="topLeft" class="top left"></i>
        <i data-target="resize" data-resize="topRight" class="top right"></i>
        <i data-target="resize" data-resize="bottomLeft" class="bottom left"></i>
        <i data-target="resize" data-resize="bottomRight" class="bottom right"></i>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState([
            'SelectBox',
        ])
    },
    methods:{

    }
};

</script>

<style lang="scss" scoped>
.select-box {
    position: absolute;
    z-index: 1000;
    border: 1px solid var(--select-box-color);
    cursor: pointer;
    & > i {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--select-box-color);

        &.top {
            top: -4px;
        }
        &.left {
            left: -4px;
        }
        &.bottom {
            bottom: -4px;
        }
        &.right {
            right: -4px;
        }

        &.top.left {
            cursor: nw-resize;
        }
        &.top.right {
            cursor: ne-resize;
        }
        &.bottom.left {
            cursor: sw-resize;
        }
        &.bottom.right {
            cursor: se-resize;
        }
    }
}
</style>
