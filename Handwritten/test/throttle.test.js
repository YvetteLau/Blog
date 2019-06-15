import { tampThrottle, timeThrottle, throttle } from '../src/throtte';

import { EventEmitter } from 'events';

/** 
 * 每 120 ms 触发一次 down 事件，共触发 5 次 
 * 节流的间隔时间是 100ms,因此 frequency 被调用了 5 次
 */
test('时间戳版 throttle/事件处理函数被调用5次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency = jest.fn();
    /** 间隔时间为 100ms */
    let debounceFrequency = tampThrottle(frequency, 100);

    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 120 ms 触发一次 down 事件，共触发 5 次 
     * 节流的间隔时间是 100ms,因此 frequency 被调用了 5 次
     */
    
    delay(() => {
        expect(frequency.mock.calls.length).toBe(5);
        done();
    }, 120);
    
});


/** 
 * 每 50 ms 触发一次 down 事件，共触发5次
 * 节流的间隔时间是 100ms,因此 frequency2 被调用了 3 次
 * 我们期望的是调用3次，但是最后一次被忽略了
 */
test('时间戳版 throttle/ 事件处理函数被调用2次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency2 = jest.fn();
    /** 节流间隔时间为 200ms */
    let debounceFrequency = tampThrottle(frequency2, 100);
    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 50 ms 触发一次 down 事件，共触发 5 次
     * 节流的间隔时间是 100ms,因此 frequency2 调用了 3 次
     * 分别为 50ms 150ms 250ms
     */
    delay(() => {
        expect(frequency2.mock.calls.length).toBe(3);
        done();
    }, 50);
});

/** 
 * 每 120 ms 触发一次 down 事件，共触发 5 次 
 * 节流的间隔时间是 100ms,因此 frequency3 被调用了 5 次
 */
test('定时器版 trottle/ 事件处理函数被调用3次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency3 = jest.fn();
    /** 防抖间隔时间为 200ms */
    let debounceFrequency = timeThrottle(frequency3, 100);
    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 120 ms 触发一次 down 事件 
     * 防抖的间隔时间是 100ms,因此 frequency3 被调用了 5 次
     */
    delay(() => {
        expect(frequency3.mock.calls.length).toBe(5);
        done();
    }, 120);
});


/** 
 * 每 50 ms 触发一次 down 事件，共触发 5 次 
 * 节流的间隔时间是 100ms, 第一次触发立即执行, frequency4 被调用了 2 次
 * 我们期望的是调用3次，但是最后一次被忽略了
 */

test('定时器版 trottle/ 事件处理函数被调用2次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency4 = jest.fn();
    /** 防抖间隔时间为 200ms/立即执行 */
    let debounceFrequency = timeThrottle(frequency4, 100, true);
    myEvent.on('down', () => {
        debounceFrequency('Yvette');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 50 ms 触发一次 down 事件，共触发 5 次 
     * 防抖的间隔时间是 100ms,第一次触发立即执行，frequency4 被调用了 2 次
     * 分别为 150ms 250ms(非立即执行)
     */
    delay(() => {
        expect(frequency4.mock.calls.length).toBe(2);
        done();
    }, 50);
});




/** 
 * 每 120 ms 触发一次 down 事件，共触发 5 次 
 * 节流的间隔时间是 100ms,因此 frequency5 被调用了 5 次
 */
test('定时器版 trottle/ 事件处理函数被调用3次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency5 = jest.fn();
    /** 防抖间隔时间为 200ms */
    let debounceFrequency = throttle(frequency5, 100);
    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 120 ms 触发一次 down 事件 
     * 防抖的间隔时间是 100ms,因此 frequency3 被调用了 5 次
     */
    delay(() => {
        expect(frequency5.mock.calls.length).toBe(5);
        done();
    }, 120);
});


/** 
 * 每 50 ms 触发一次 down 事件，共触发 5 次 
 * 节流的间隔时间是 100ms, 第一次触发立即执行, frequency6 被调用了 3 次
 * 我们期望的是调用3次，但是最后一次被忽略了
 */

test('定时器版 trottle/ 事件处理函数被调用2次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency6 = jest.fn();
    /** 防抖间隔时间为 200ms/立即执行 */
    let debounceFrequency = throttle(frequency6, 100, true);
    myEvent.on('down', () => {
        debounceFrequency('Yvette');
    });
    /** 共触发 5 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 5) {
                myEvent.emit('down');
                delay(callback, interval);
                i++;
            } else {
                clearTimeout(timer);
                callback();
                myEvent.removeAllListeners('down');
            }
        }, interval);
    }

    /** 
     * 每 50 ms 触发一次 down 事件，共触发 5 次 
     * 防抖的间隔时间是 100ms,第一次触发立即执行，frequency4 被调用了 3 次
     */
    delay(() => {
        expect(frequency6.mock.calls.length).toBe(3);
        done();
    }, 50);
});