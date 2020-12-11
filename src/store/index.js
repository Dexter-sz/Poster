import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectDom: null,
        SelectBox: {
            show: false
        }
    },
    mutations: {
        showSelectBox(state, dom) {

            if(dom === state.selectDom){
                console.log('操作了同一个dom，什么都不做')
                return false;
            }

            // 显示选择框，并保存各类参数
            let rect = dom.getBoundingClientRect();
            state.SelectBox = {
                show: true,
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
            };

            !dom.id && (state.selectDom = dom);

            console.log(state.selectDom)
        },
        // 设置（移动、缩放）选择框属性
        setSelectStyle(state, obj) {
            let dom = state.selectDom;
            let newState = Object.assign({}, state.SelectBox, obj);
            state.SelectBox = newState;
            
            // 同步设置被选dom样式
            for (let k in obj) {
                let v = obj[k]
                dom.style[k] = `${v}px`;
            }
        },
        // 隐藏选择框
        hideSelectBox(state) {
            console.log('隐藏了选择框')
            state.selectDom = null;
            state.SelectBox = {
                show: false
            }
        },

    },
    actions: {
    },
    modules: {
    }
})
