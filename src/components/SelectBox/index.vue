<template>
    <div 
        id="SelectBox"
        class="select-box" 
        data-target="poster-item"
        data-target="poster-item"
        v-show="SelectBox.show"
        :style="'width:'+width+';height:'+height+';top:'+top+';left:'+left+';'"
    >   
        <template v-if="SelectBox.type==='img'">
            <i data-target="resize" data-resize="topLeft" class="top left"></i>
            <i data-target="resize" data-resize="topRight" class="top right"></i>
            <i data-target="resize" data-resize="bottomLeft" class="bottom left"></i>
            <i data-target="resize" data-resize="bottomRight" class="bottom right"></i>
        </template>
        <template v-else-if="SelectBox.type==='text'">
            <i data-target="resize" data-resize="centerRight" class="center right"></i>
        </template>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        height:function(){
            let h = this.SelectBox.height;
            return `${h}px`;
        },
        width:function(){
            let w = this.SelectBox.width;
            return `${w}px`;
        },
        top:function(){
            let t = this.SelectBox.top;
            return `${t}px`;
        },
        left:function(){
            let l = this.SelectBox.left;
            return `${l}px`;
        },
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
        width: var(--select-point-width);
        height: var(--select-point-width);
        border-radius: 50%;
        background: var(--select-box-color);

        &.top {
            top: calc(var(--select-point-width) * -0.5);
        }
        &.left {
            left: calc(var(--select-point-width) * -0.5);
        }
        &.bottom {
            bottom: calc(var(--select-point-width) * -0.5);
        }
        &.right {
            right: calc(var(--select-point-width) * -0.5);
        }


        &.center.right{
            top:0;
            bottom:0;
            margin:auto;
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
        &.center.right,
        &.center.left {
            cursor: e-resize;
        }
    }
}
</style>
