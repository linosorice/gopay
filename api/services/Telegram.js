module.exports = {
  checkToken: function(token, cb) {
    var https = require('https');
    https.get('https://api.telegram.org/bot' + token + '/getUpdates', function(res) {
      var str = '';
      res.on('data', function(chunk) { str += chunk; });
      res.on('end', function() {
        var data = JSON.parse(str);
        cb(data.ok);
      })
    });
  },

  setBot: function(userId) {

    User.findOne({id: userId}).exec(function(err, user) {
      if (err) {
        sails.log(err);
        return;
      } else {
        var request = require('request');
        sails.log(sails.config.botHost);
        var options = {
          uri: sails.config.botHost + '/bot',
          method: 'POST',
          json: {
            "botToken": user.botToken,
            "paymentToken": user.paymentToken,
            "channel": user.channel,
            "email": user.email
          }
        }

        request(options, function(error, response, body) {
          sails.log(body);
        });
      }
    });
  },

  sendDemoOffer: function(channel, offer, lang) {
    var request = require('request');

    var options = {
      uri: sails.config.demoBotHost + '/offer',
      method: 'POST',
      json: {
        "channel": channel,
        "name": offer.name,
        "image": offer.image,
        "price": offer.price,
        "description": offer.description,
        "lang": lang
      }
    }

    request(options, function(error, response, body) {
      sails.log(body);
      sails.log(response);
      sails.log(error);
    });
  },

  sendOffer: function(userId, offer, lang) {

    User.findOne({id: userId}).exec(function(err, user) {
      if (err) {
        sails.log(err);
        return;
      } else {
        var request = require('request');

        var options = {
          uri: sails.config.botHost + '/offer',
          method: 'POST',
          json: {
          	"channel": user.channel,
          	"title": offer.name,
          	"description": offer.description,
          	"amount": offer.price,
            "currency": offer.currency,
            "expiration": offer.expiration,
          	"image": offer.image,
          	"offerId": offer.id,
            "quantity": offer.quantity,
            "shipping": offer.shipping,
            "lang": lang
          }
        }

        request(options, function(error, response, body) {
          sails.log(body);
        });
      }

    });
  },

  sendGuardBotMessage: function(message) {
    var request = require('request');
    var options = {
      url: sails.config.botHost + '/guard',
      method: 'POST',
      json: {
        "message": message
      }
    }

    request(options, function(error, response, body) {});
  }
}
