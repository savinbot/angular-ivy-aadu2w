/**
 * Data processing functions
 */
export class CommonService {

  /**
   * Check is valid JSON string
   *
   * @param {string} str JSON string
   */
  static isValidJSONString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Is object not empty
   *
   * @param {object} data Object data
   */
  static isObjectNotEmpty(data: object) {
    return (typeof data === 'object' || typeof data === 'string')
      ? Object.keys(data).length !== 0
      : false;
  }
}
