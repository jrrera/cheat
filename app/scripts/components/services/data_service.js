/**
 * @fileoverview AngularJS service to make HTTP and localStorage requests on behalf of client
 */

'use strict';

goog.provide('cheat.application.Service.DataService');

/**
 * @ngInject
 * @param {!angular.$http} $http The Angular http service.
 * @param {!angular.$q} $q The Angular q service.
 * @constructor
 */
cheat.application.Service.DataService = function($http, $q) {
  /**
   * @type {!angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {!angular.$q}
   * @private
   */
  this.q_ = $q;
};


/**
* Saves data (localStorage for now)
* @param {string} key Key to use with namespace when fetching localStorage
* @param {*} value Value to be stringified and placed in local storage
* @return {boolean} true if successful, else false
*/
cheat.application.Service.DataService.prototype.saveData = function(key, value) { 

  if (!key) return false;

  try {
    // use cheatApp namespace
    localStorage["cheatApp."+key] = JSON.stringify(value);
    return true;
  } catch (e) {
    console.log('error saving', key);
    return false;
  }
};

/**
* Checks for token data in localstorage (eventually the server)
* @param {string} key Key to use with namespace when fetching localStorage
* @return {Object|null} Returns stored data, else null if error or not found
*/
cheat.application.Service.DataService.prototype.getData = function(key) { 
  var data;
  if (!key) return null;

  try {
    
    data = JSON.parse(localStorage["cheatApp."+key]);
    console.log('data for', key, data);
    
    if (!data) return null;
    return data;

  } catch (e) {
    console.log('error', e);
    return null;
  }
};