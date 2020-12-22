<template>
    <div class="poster-edit-page" @mousedown="posterClick">
        <SelectBox />
        <Item type="img" />
        <Item type="text" />
    </div>
</template>

<script>
import SelectBox from "@/components/SelectBox";
import Item from "@/components/Item";
import { mapMutations, mapState } from "vuex";

// 缩放时的方向
let direction;
let x = 0;
let y = 0;

export default {
    name: "PosterEdit",
    components: {
        SelectBox,
        Item,
    },
    computed: {
        ...mapState(["SelectBox","selectDom"]),
    },
    methods: {
        // 海报点击
        posterClick(e) {
            let _this = this;
            let dom = e.target;
            let { target, resize } = dom.dataset;

            // 点击 poster-item、resize元素的时候不需要隐藏选择框
            let hideSelectDom = ["poster-item", "resize"];
            if (!hideSelectDom.includes(target)) {
                this.hideSelectBox();
            }

            switch (target) {
                case "poster-item":
                    _this.itemPosterClick(dom, e);
                    document.onmousemove = _this.posterItemMove;
                    document.onmouseup = _this.onmouseup;
                    break;
                case "resize":
                    direction = resize;
                    _this.resizeItemClick(e);
                    document.onmousemove = _this.resizeItemMove;
                    document.onmouseup = _this.onmouseup;
                    break;
            }
        },
        // 缩放海报元素
        resizeItemClick(e) {
            x = e.x;
            y = e.y;
        },
        // 缩放海报元素鼠标移动时
        resizeItemMove(e) {
            let newX = e.x;
            let newY = e.y;

            // 新的样式
            let newStyle = this.getNewStyle(e);
            this.setSelectStyle(newStyle);

            x = newX;
            y = newY;
        },
        // 海报元素被点击
        itemPosterClick(dom, e) {
            this.showSelectBox(dom);
            x = e.x;
            y = e.y;
        },
        // 移动元素时
        posterItemMove(e) {
            let { SelectBox } = this;
            let newX = e.x;
            let newY = e.y;
            let { top, left } = SelectBox;

            // 新的x,y减去旧的x，y得出移动了多少px的距离
            // 然后同步更新新的位置
            this.setSelectStyle({
                top: top + (newY - y),
                left: left + (newX - x),
            });

            x = newX;
            y = newY;
        },
        // 结束移动时触发
        onmouseup(e) {
            x = e.x;
            y = e.y;
            document.onmousemove = null;
            document.onmouseup = null;
        },
        // 获取两个数的比例
        getRateByNum(a, b) {
            let r = a > b ? b / a : a / b;
            return r;
        },
        // 获取移动后的新样式
        getNewStyle(e) {
            let maxWidth = 20;
            let newX = e.x;
            let newY = e.y;
            // 各类差值
            let newWidth, newHeight, newTop, newLeft;
            let diffWidth, diffHeight;
            let { top, left, width, height,type } = this.SelectBox;

            
            // 获取一个宽高比
            let rateWH = this.getRateByNum(width, height);

            // 计算出新的宽高
            diffWidth = newX - x;
            newWidth = direction.includes("Left") ? width + (diffWidth*-1) : width + diffWidth;
            
            newHeight = width > height ? newWidth * rateWH : newWidth / rateWH;

            //  计算出高度差值，用来补全top值
            diffHeight = newHeight - height;

            // 文字的高度计算需要用另一种方式
            if(type === 'text'){
                this.selectDom.style.height = 'auto';
                newHeight = this.selectDom.getBoundingClientRect().height;
                
                // 文本的最小宽度就是单个文字的宽度
                var textDom = this.selectDom.firstElementChild;
                while (!textDom.className.includes("text")) {
                    textDom = textDom.firstElementChild;
                }
                maxWidth = parseInt(textDom.style.fontSize);
            }
            
           

            switch (direction) {
                // 左上角缩放
                case "topLeft":
                    newLeft = left + diffWidth;
                    newTop = top - diffHeight;
                    break;
                // 右上角缩放
                case "topRight":
                    newTop = top - diffHeight;
                    break;
                // 左下角缩放
                case "bottomLeft":
                    newLeft = left + diffWidth;
                    break;
                // 右下角缩放
                case "bottomRight":
                    break;
                // 上缩放
                case "centerTop":
                    break;
                // 左缩放
                case "centerLeft":
                    break;
                // 右缩放
                case "centerRight":
                    newTop = newLeft = 0;
                    this.selectDom.height = newHeight;
                    break;
                // 下缩放
                case "centerBottom":
                    break;
            }



            // 所有缩放最小宽度为10 
            if(newWidth <= maxWidth ){
                return false;
            }

            return {
                width: newWidth || width,
                height: newHeight || height,
                top: newTop || top,
                left: newLeft || left,
            };
        },
        ...mapMutations(["showSelectBox", "hideSelectBox", "setSelectStyle"]),
    },
};
</script>
<style lang="scss">
.poster-edit-page {
    width: 100vw;
    height: 100vh;
    user-select: none;
}
</style>
