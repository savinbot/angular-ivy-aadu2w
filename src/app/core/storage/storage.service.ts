import {Injectable} from '@angular/core';
import {CommonService} from '../common';

/**
 * Storage service
 */
@Injectable()
export class StorageService {

  /**
   * Get value
   *
   * @param {string} key
   * @returns {any | null}
   */
  static get(key: string) {
    const value = localStorage.getItem(key);
    return <any | null>(CommonService.isValidJSONString(value) ? JSON.parse(value) : null);
  }

  /**
   * Set value
   *
   * @param {string} key
   * @param {any} value
   */
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Remove item
   *
   * @param {string} key
   */
  static remove(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear storage
   */
  static clearStorage() {
    const exceptions = {

    };

    for (const key of Object.keys(exceptions)) {
      exceptions[key] = StorageService.get(key);
    }

    localStorage.clear();

    for (const key of Object.keys(exceptions)) {
      StorageService.set(key, exceptions[key]);
    }
  }
}
