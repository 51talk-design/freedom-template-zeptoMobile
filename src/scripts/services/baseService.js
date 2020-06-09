const apiConf = require("../config/apiConf");
/**
 * 服务基类，封装了统一的数据请求跟处理操作
 * @class
 */
export default class BaseService {
  /**
   * 构造器，初始化相关事件
   */
  constructor() { }
  /**
   * request请求处理
   * @param {string} urlKey 请求url或者请求url的conf的配置key值
   * @param {string} method http请求谓词，比如：Get、Post、Put等
   * @param {string | object} data 请求数据，string或者object类型
   * @param {object} option 可配置项，目前提供headers的配置
   *  {
   *    headers:{
   *      contentType:""
   *    }
   *  }
   * @param {boolean} isHandle 是否需要处理接口返回的数据，true表示处理，false表示不处理，默认为true
   * @return {object} 返回执行后的结果
   */
  invoke(urlKey, method, data, option, isHandle = true) {
    let _this = this;
    option = option || {};
    let crossDomain = option.crossDomain == true ? true : false;
    let contentType = option.contentType || "application/x-www-form-urlencoded"
    return new Promise((resolve, reject) => {
      $.ajax({
        url: _this.getRequestApiUrl(urlKey),
        type: method,
        data: data,
        dataType: 'json',
        crossDomain: crossDomain,
        contentType: contentType,
        success: res => {
          if (!isHandle) {
            resolve(res);
            return;
          }
          (async function () {
            let handleResult = await _this._handleResponse(res);
            if (handleResult)
              resolve(handleResult);
          })();
        },
        error: res => {
          (async function () {
            let handleResult = await _this._handleResponse({
              code: 500,
              msg: "网络繁忙，请稍候再试"
            });
            resolve(handleResult);
          })();
        }
      });
    });
  }

  /**
   * 处理接口返回的响应数据
   * @param {object} responseData 接口返回的响应数据
   * @return {object} 返回处理后的数据结果
   */
  async _handleResponse(responseData) {
    let code = responseData.code;
    switch (code) {
      case 10000: //返回正确的状态，原封不动的返回
        return responseData;
      case 20009:
        break;
      case 500:
        break;
      default:
        break;
    }
  }
  /**
   * 获取请求api地址
   * @param {string} urlKey api对应的key
   * @return {string} 返回要请求的api地址
   */
  getRequestApiUrl(urlKey) {
    //简单正则，判断是否是完整的url，如果是完整的url，则直接返回
    let regExp = /^https:\/\/([^/]+)\//gi;
    if (regExp.test(urlKey)) return urlKey;
    return apiConf[urlKey];
  }
}