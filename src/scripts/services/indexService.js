import BaseService from "./baseService";

/**
 * 某某service,提供以下能力
 * 1、获取页面渲染数据-getIndexInfo
 * @class
 * @extends {BaseService}
 */
export default class IndexService extends BaseService {
  /**
   * 构造器，初始化相关信息
   */
  constructor() {
    super();
  }

  /**
   * 获取页面信息
   * @param {number} id 接口参数
   * @return {object} 返回获取到的信息
   */
  async getIndexInfo(id) {
    return await this.invoke("index", "Get", { id: id }, null);
  }
}
