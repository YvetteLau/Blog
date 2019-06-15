/** 时间戳 */
function tampThrottle (func, delay) {
    var lastTime = 0;
    function throttled() {
        var context = this;
        var args = arguments;
        var nowTime = Date.now();
        if(nowTime > lastTime + delay) {
            func.apply(context, args);
            lastTime = nowTime;
        }
    }
    //防抖函数最终返回的是一个函数
    return throttled; 
}

/** 定时器实现 */
function timeThrottle(func, wait) {
    let timer;
    return function throttled() {
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
}

function throttle(func, wait, options) {
    var timeout, result;
    var previous = 0;
    if (!options) options = {};

    var later = function (context, args) {
        previous = options.leading === false ? 0 : Date.now() || new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
    };

    var throttled = function () {
        var now = Date.now() || new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        let context = this;
        let args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            timeout = setTimeout(() => { later(context, args) }, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}

export { tampThrottle, timeThrottle, throttle }