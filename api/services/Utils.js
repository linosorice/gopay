module.exports = {
  generatePassword: function() {
    return Math.random().toString(36).slice(-8);
  },

  encrypt: function(str) {
    return require('bcrypt').hashSync(str, 8);
  },

  consumeCredit: function(userId, cb) {
    User.findOne({id: userId}).exec(function(err, user) {
      if (err) { cb(err, false); }
      else {
        if (user.credits > 0) {
          User.update({id: userId}, {credits: user.credits-1}).exec(function(err, ret) {
            if (err) { cb(err, null); }
            else {
              cb(null, true);
            }
          });
        } else {  // No credits
          cb(null, false);
        }
      }
    });
  },

  rechargeCredit: function(userId, amount, price, cb) {
    User.findOne({id: userId}).exec(function(err, user) {
      if (err) { cb(err, false); }
      else {
        User.update({id: userId}, {credits: user.credits+parseInt(amount)}).exec(function(err, ret) {
          if (err) { cb(err); }
          else {
            Recharge.create({date: new Date(), amount: amount, price: price.toFixed(2), user: userId}).exec(function(err, ret) {
              if (err) { cb(err); }
              else {
                cb(null);
              }
            });
          }
        });
      }
    });
  },

  webhookCall: function(route, data) {
    console.log(route);
    console.log(data);
    var request = require('request');
    var options = {
      uri: route,
      method: 'POST',
      json: {
        "data": data
      }
    }

    request(options, function(error, response, body) {
      sails.log(body);
    });
  }

}
