"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let betterRequire = exports.betterRequire = absPath => {
    let module = require(absPath);
    if (module.default) {
        return module.default;
    }
    return module;
};