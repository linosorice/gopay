/**
 * SettingController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show: function(req, res) {
    var countries = require("i18n-iso-countries");
    return res.view('setting', {err: '', countries: countries.getNames("it")});
  },
};

