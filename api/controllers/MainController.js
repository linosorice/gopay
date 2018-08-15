/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /* Dashboard */
  show: function(req, res) {

		User.findOne({id: req.session.user.id}).populate('offers').exec(function(err, user) {
			if (err) { return res.serverError(); }
			else {
				if (req.session.user.channel && req.session.user.botToken && req.session.user.paymentToken) {
					var numOffers = user.offers.length;
					var credits = user.credits;

					Purchase.find({owner: req.session.user.id}).populate("offer").exec(function(err, purchases) {
						if (err) { return res.serverError(); }
						var numPurchases = purchases.length;
						var incomes = 0;
            var fees = numPurchases*0.5;
            var net;

						for (var purchase of purchases) {
						  incomes += purchase.offer.price;
						}

            net = incomes - fees;

						return res.view('dashboard', {numOffers: numOffers, credits: credits, incomes: incomes, numPurchases: numPurchases, fees: fees, net: net});

					})
				} else {
					req.flash('info', req.__('controllers.main.complete_tutorial'));
					return res.redirect('tutorial');
				}
			}
		});
  },

};
