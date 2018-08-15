/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Send checkout email
	checkout: function(req, res) {
		var orderInfo = req.body.paymentData.successful_payment.order_info;
		var offerId = JSON.parse(req.body.paymentData.successful_payment.invoice_payload).offerId;

		User.findOne({email: req.body.email}).populate('webhooks', {name: 'purchase'}).exec(function(err, user) {

			var purchase = {
				buyer: req.body.paymentData.from.first_name,
				buyerLastName: req.body.paymentData.from.last_name,
				buyerUsername: req.body.paymentData.from.username,
				code: req.body.purchaseCode,
				date: new Date().toISOString(),
				owner: user.id,
				offer: offerId,
				buyerEmail: orderInfo ? orderInfo.email : null,
				buyerAddress1: orderInfo ? orderInfo.shipping_address.street_line1 : null,
				buyerAddress2: orderInfo ? orderInfo.shipping_address.street_line2 : null,
				buyerPostCode: orderInfo ? orderInfo.shipping_address.post_code : null,
				buyerCity: orderInfo ? orderInfo.shipping_address.city : null,
				buyerState: orderInfo ? orderInfo.shipping_address.state : null
			}

			Purchase.create(purchase).exec(function(err, purchase) {
				if (err) { return res.serverError(err); }

				// If product needs shipping
				if (orderInfo) {
					var sa = orderInfo.shipping_address;
					var address = sa.street_line1 + ' ' + sa.post_code + ' ' + sa.city + ' ' + sa.state;
					var name = orderInfo.name;
					var email = orderInfo.email;
					Mailer.sendShippingEmail(req.body.email, name, email, address, req.body.purchaseCode, req);
				} else {
					Mailer.sendPurchaseMail(req.body.email, req.body.paymentData, req.body.purchaseCode, req);
				}

				Offer.findOne({id: offerId}).exec(function(err, offer) {
					if (err) { return res.serverError(err); }

					// Call webhook
					if (user.webhooks.length > 0) {

						var data = {
							buyer: purchase.buyer,
							buyer_last_name: purchase.buyerLastName,
							buyer_username: purchase.buyerUsername,
							code: purchase.code,
							date: purchase.date,
							buyerEmail: orderInfo ? orderInfo.email : null,
							buyerAddress1: orderInfo ? orderInfo.shipping_address.street_line1 : null,
							buyerAddress2: orderInfo ? orderInfo.shipping_address.street_line2 : null,
							buyerPostCode: orderInfo ? orderInfo.shipping_address.post_code : null,
							buyerCity: orderInfo ? orderInfo.shipping_address.city : null,
							buyerState: orderInfo ? orderInfo.shipping_address.state : null,
							offer: {
								name: offer.name,
								description: offer.description,
								expiration: offer.expiration,
								image: offer.image,
								price: offer.price,
								currency: offer.currency,
								creation_date: offer.creation_date,
								quantity: offer.quantity,
								shipping: offer.shipping
							}
						}

						Utils.webhookCall(user.webhooks[0].route, data);
					}

				});

				return res.send('Purchase email sent');
			});
		});
	}
};
