import { simpleDebounce, debounce } from '../src/debounce';
import { EventEmitter } from 'events';

/** 
 * 每 300 ms 触发一次 down 事件，共触发 3 次 
 * 防抖的间隔时间是 200ms,因此 frequency 被调用了 3次
 */
test('simpleDebounce/事件处理函数被调用3次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency = jest.fn();
    /** 间隔时间为 200ms */
    let debounceFrequency = simpleDebounce(frequency, 200);

    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 3 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 3) {
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
     * 每 300 ms 触发一次 down 事件，共触发 3 次 
     * 防抖的间隔时间是 200ms,因此 frequency 被调用了 3次
     */
    
    delay(() => {
        expect(frequency.mock.calls.length).toBe(3);
        done();
    }, 300);
    
});


/** 
 * 每 100 ms 触发一次 down 事件
 * 防抖的间隔时间是 200ms,因此 frequency2 被调用了 0 次
 */
test('simpleDebounce/ 事件处理函数被调用0次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency2 = jest.fn();
    /** 防抖间隔时间为 200ms */
    let debounceFrequency = simpleDebounce(frequency2, 200);
    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 3 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 3) {
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
     * 每 100 ms 触发一次 down 事件 
     * 防抖的间隔时间是 200ms,因此 frequency2 被调用了 0 次
     */
    //有时，这并不是我们想要的结果，我们可能希望最后一次/第一次的事件触发能够被响应
    delay(() => {
        expect(frequency2.mock.calls.length).toBe(0);
        done();
    }, 100);
});

/** 
 * 每 300 ms 触发一次 down 事件，共触发 3 次 
 * 防抖的间隔时间是 200ms,因此 frequency3 被调用了 3次
 */
test('debounce/ 事件处理函数被调用3次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency3 = jest.fn();
    /** 防抖间隔时间为 200ms */
    let debounceFrequency = simpleDebounce(frequency3, 200);
    myEvent.on('down', () => {
        debounceFrequency('hello');
    });
    /** 共触发 3 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 3) {
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
     * 每 100 ms 触发一次 down 事件 
     * 防抖的间隔时间是 200ms,因此 frequency3 被调用了 0 次
     */
    delay(() => {
        expect(frequency3.mock.calls.length).toBe(3);
        done();
    }, 300);
});


/** 
 * 每 300 ms 触发一次 down 事件，共触发 3 次 
 * 防抖的间隔时间是 100ms, 第一次触发立即执行, frequency4 被调用了 1次
 */

test('debounce/ 事件处理函数被调用1次 ', (done) => {
    let myEvent = new EventEmitter();
    /** 高频 down 事件处理函数 */
    const frequency4 = jest.fn();
    /** 防抖间隔时间为 200ms/立即执行 */
    let debounceFrequency = debounce(frequency4, 200, true);
    myEvent.on('down', () => {
        debounceFrequency('Yvette');
    });
    /** 共触发 3 次 */
    let i = 0;
    function delay(callback, interval) {
        let timer = setTimeout(() => {
            if (i < 3) {
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
     * 每 100 ms 触发一次 down 事件 
     * 防抖的间隔时间是 200ms,第一次触发立即执行，frequency4 仅被调用了 1 次
     */
    delay(() => {
        expect(frequency4.mock.calls.length).toBe(1);
        done();
    }, 100);
});