<template>
    <div class="poster-item" data-target="poster-item" :data-itemtype="type" >
        <div class="content">
            <div class="img" v-if="type==='img'" >
                <img src="http://osscdn.test-dbmoney.com/img/banner/a81893e39af94128bbb20c235b509ffc.jpg" width="100%" />
            </div>
            <div class="text" style="font-size:14px"  v-if="type==='text'">点击修改文字</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:"img"
        }
    },
    data:()=>{
        return {
            
        }
    },
    methods:{

    }
};
</script>

<style lang="scss">
.poster-item{
    position: absolute;
    z-index: 10;
    cursor: pointer;
    .content{
        pointer-events: none;

        .img{
            font-size: 0;
        }
    }
}
</style>