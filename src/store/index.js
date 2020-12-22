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

            if (dom === state.selectDom) {
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
                type: dom.dataset.itemtype || state.SelectBox.type
            };

            !dom.id && (state.selectDom = dom);
            console.log(state.SelectBox)
        },
        // 设置（移动、缩放）选择框属性
        setSelectStyle(state, obj) {

            if(!obj) return false;
            
            let dom = state.selectDom;
            let newState = Object.assign({}, state.SelectBox, obj);
            state.SelectBox = newState;



            // 同步设置被选dom样式
            for (let k in obj) {
                let v = obj[k]
                let s = '';
                if (v === 'auto') {
                    s = v;
                } else {
                    s = `${v}px`;
                }
                dom.style[k] = s;
            }
        },
        // 隐藏选择框
        hideSelectBox(state) {
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
