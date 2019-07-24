"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// 主的流程控制
let apply = (action, ...args) => {
    //babel-env
    require(`./${action}`)(...args);
};

exports.default = apply;