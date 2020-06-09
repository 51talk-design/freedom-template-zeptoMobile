import './index.less';
import indexView from './index.html';
import IndexService from '../../services/indexService';

const indexServiceInstance = new IndexService();

/**
 * 某某页面
 * @class
 */
export default class Index {
  /**
   * 构造器，初始化页面相关信息
   */
  constructor() {
    this.wrapperDom = $(".J_wrapper");
    this.compiled = _.template(indexView);

    this.render();
    this.registerEvents();
  }
  /**
   * 获取数据，视图渲染
   * @return {void} 无返回值
   */
  async render() {
    let viewHtml = this.compiled({});
    this.wrapperDom.html(viewHtml);
  }

  /**
   * 页面相关操作事件注册
   * @return {void} 无返回值
   */
  async registerEvents() {

  }
};
