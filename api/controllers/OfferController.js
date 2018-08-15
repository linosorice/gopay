/**
 * OfferController
 *
 * @description :: Server-side logic for managing offers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res) {
    if (req.session.user.channel && req.session.user.botToken && req.session.user.paymentToken) {
      return res.view('offers/create', {err: ''});
    } else {
      req.flash('info', req.__('controllers.offer.complete_tutorial'));
      return res.redirect('tutorial');
    }
  },

  sendOffer: function(req, res) {

    var splitDate = req.body.expiration.split('/');
    var expirationDate = splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1];
    var currency = req.body.currency;
    if (!currency || currency.length === 0) {
      currency = 'EUR';
    }

    Offer.create({
      name: req.body.name,
      description: req.body.description,
      expiration: new Date(expirationDate).toISOString(),
      image: req.body.image,
      price: req.body.price,
      currency: currency,
      creation_date: new Date(),
      quantity: req.body.limit ? parseInt(req.body.quantity) : null,
      shipping: req.body.shipping ? true : false,
      owner: req.session.user.id}).exec(function(err, offer) {
      if (err) { return res.serverError(err); }
      else {
        Telegram.sendOffer(req.session.user.id, offer, req.getLocale());
        req.flash('info', req.__('controllers.offer.offer_sent'));
        return res.redirect('dashboard');
      }
    });
  }
};
