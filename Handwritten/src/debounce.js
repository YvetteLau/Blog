function simpleDebounce(func, wait) {
    let timeout = null;
    /* 触发时，参数传给了 debounced */
    return function debounced() {
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            /* this绑定和参数的传递，
             * 注意此处使用的是箭头函数，因此不需要在外层将 this 赋值给某变量
             */
            func.apply(this, args);
        }, wait);
    }
}


function debounce(func, wait, immediate = true) {
    let timeout, result;
    // 延迟执行函数
    const later = (context, args) => setTimeout(() => {
        timeout = null;// 倒计时结束
        if (!immediate) {
            //执行回调
            result = func.apply(context, args);
            context = args = null;
        }
    }, wait);
    let debounced = function (...params) {
        if (!timeout) {
            timeout = later(this, params);
            if (immediate) {
                //立即执行
                result = func.apply(this, params);
            }
        } else {
            clearTimeout(timeout);
            //函数在每个等待时延的结束被调用
            timeout = later(this, params);
        }
        return result;
    }
    //提供在外部清空定时器的方法
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };
    return debounced;
};

export { simpleDebounce, debounce }