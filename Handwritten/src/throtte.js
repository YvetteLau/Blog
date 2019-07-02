/** 时间戳 */
function tampThrottle(func, wait) {
    var previous = 0;
    function throttled() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now > previous + wait) {
            func.apply(context, args);
            previous = now;
        }
    }
    //防抖函数最终返回的是一个函数
    return throttled;
}

/** 定时器实现 */
function timeThrottle(func, wait) {
    let timeout;
    return function throttled() {
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                func.apply(this, args);
                clearTimeout(timeout);
                timeout = null;
            }, wait);
        }
    }
}

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : (Date.now() || new Date().getTime());
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = Date.now() || new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}

export { tampThrottle, timeThrottle, throttle }