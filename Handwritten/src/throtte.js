/** 时间戳 */
function tampThrottle(func, delay) {
    var lastTime = 0;
    function throttled() {
        var context = this;
        var args = arguments;
        var nowTime = Date.now();
        if (nowTime > lastTime + delay) {
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

function throttle(func, wait, options = {
    leading: true,
    trailing: true
}) {
    let timer;
    let lastTime = 0;

    const later = function (context, args) {
        lastTime = options.trailing === true ? Date.now() : 0;
        func.apply(context, args);
        timer = null;
    };

    let throttled = function () {
        let context = this;
        let args = arguments;
        let nowTime = Date.now();
        if (!lastTime && options.leading === false) {
            lastTime = nowTime; //lastTime为0，会立即响应
        }
        let remaining = wait - (nowTime - lastTime);
        if (remaining <= 0) {
            //remaining 的时间小于等于 0，表示两次触发的时间大于了间隔时间
            if (timer) {
                //清楚定时器
                clearTimeout(timer);
                timer = null;
            }
            lastTime = nowTime;
            func.apply(context, args);
        } else if (!timer && options.trailing) {
            // 倒计时还在进行中，响应新的事件，重新设置事件
            timer = setTimeout(() => { later(context, args) }, remaining);
        }
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        lastTime = 0;
        timer = null;
    };

    return throttled;
}

export { tampThrottle, timeThrottle, throttle }