/**
 * WebhooksController
 *
 * @description :: Server-side logic for managing webhooks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	show: function(req, res) {
		Webhook.find({user: req.session.user.id}).exec(function(err, webhooks) {
			if (err) { return res.serverError(); }
			return res.view('webhooks', { webhooks: webhooks });
		});

	},

	set: function(req, res) {

		Webhook.findOne({name: 'purchase'}).exec(function(err, webhook) {
			if (err) { return res.serverError(); }
			if (webhook) {
				Webhook.update({name: 'purchase'}, {route: req.body.purchase}).exec(function(err, webhook) {
					if (err) { return res.serverError(); }
					req.flash('info', req.__('webhooks.info'));
					return res.redirect('dashboard');
				});
			} else {
				Webhook.create({name: 'purchase', route: req.body.purchase, user: req.session.user.id}).exec(function(err, webhook) {
					if (err) { return res.serverError(); }
					req.flash('info', req.__('webhooks.info'));
					return res.redirect('dashboard');
				});
			}
		});
	}
};
