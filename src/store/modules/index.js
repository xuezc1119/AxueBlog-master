/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/); // 匹配当前文件夹下的.js文件
const modules = {};

files.keys().forEach(key => {
  if (key === './index.js') return; // 除了当前文件
  //keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
// 导出modules里所有的js文件
export default modules;
