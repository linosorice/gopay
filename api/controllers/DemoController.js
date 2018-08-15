/**
 * DemoController
 *
 * @description :: Server-side logic for managing demos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /* Demo */
  show: function(req, res) {
  	return res.view('demo', {layout: false});
	},

	send: function(req, res) {
		sails.log(req.body);

    // Clean channel name
		if (req.body.channel.indexOf('http') !== -1) {
			var parts = req.body.channel.split('/');
			var channelName = parts.pop() || parts.pop();
			req.body.channel = channelName;
		}
    
		var offer = {
	    name: req.body.name,
	    image: req.body.image,
	    price: req.body.price,
	    description: req.body.description
		};
		Telegram.sendDemoOffer(req.body.channel, offer, req.getLocale());
		return res.redirect('demo');
	},

};
