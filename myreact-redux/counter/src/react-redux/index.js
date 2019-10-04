// Provider 通过context提供store
// connect 连接仓库和组件，仓库的取值和订阅逻辑都放在在里面
import connect from './components/connect';
import Provider from './components/Provider';

export {
    connect,
    Provider
}