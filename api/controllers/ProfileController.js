/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  show: function(req, res) {
  	Purchase.find({owner: req.session.user.id}).sort('date DESC').populate('offer').exec(function(err, purchases) {
  		if (err) { return res.serverError(); }
  		Offer.find({owner: req.session.user.id}).sort('creation_date DESC').limit(10).exec(function(err, offers) {
  			if (err) { return res.serverError(); }
          Recharge.find({user: req.session.user.id}).sort('creation_date DESC').exec(function(err, recharges) {
            if (err) { return res.serverError() }
            User.findOne({id: req.session.user.id}).exec(function(err, user) {
              if (err) { return res.serverError(); }

              var currencies = {
                'EUR': '€',
                'USD': '$',
                'GBP': '£'
              }

              var shippings = [];
              for (var purchase of purchases) {
                if (purchase.buyerCity) {
                  shippings.push(purchase);
                }
              }

              return res.view('profile', { purchases: purchases, offers: offers, shippings: shippings, user: user, currencies: currencies });
            });
          });
  		});
		});
  },
};
