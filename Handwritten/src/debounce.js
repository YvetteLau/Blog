function simpleDebounce(func, wait) {
    let timer = null;
    /* 触发时，参数传给了 debounced */
    return function debounced() {
        let args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            /* this绑定和参数的传递，
             * 注意此处使用的是箭头函数，因此不需要在外层将 this 赋值给某变量
             */
            func.apply(this, args);
        }, wait);
    }
}


function debounce(func, wait, immediate = true) {
    let timer;
    // 延迟执行函数
    const later = (context, args) => setTimeout(() => {
        timer = null;// 倒计时结束
        if (!immediate) {
            func.apply(context, args);
            //执行回调
            context = args = null;
        }
    }, wait);
    let debounced = function (...params) {
        let context = this;
        let args = params;
        if (!timer) {
            timer = later(context, args);
            if (immediate) {
                //立即执行
                func.apply(context, args);
            }
        } else {
            clearTimeout(timer);
            //函数在每个等待时延的结束被调用
            timer = later(context, args);
        }
    }
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };
    return debounced;
};

export { simpleDebounce, debounce }