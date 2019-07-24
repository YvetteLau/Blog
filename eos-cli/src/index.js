// 主的流程控制
let apply = (action, ...args) => {
    //babel-env
    require(`./${action}`)(...args);
};

export default apply;