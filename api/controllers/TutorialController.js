/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* Tutorial */
  show: function(req, res) {
    return res.view('tutorial', {err: ''});
  },

  postTutorial: function(req, res) {

		// Clean channel name
		if (req.body.channel.indexOf('http') !== -1) {
			var parts = req.body.channel.split('/');
			var channelName = parts.pop() || parts.pop();
			req.body.channel = channelName;
		}
		
    User.update({id: req.session.user.id}, {botToken: req.body.botToken, paymentToken: req.body.paymentToken, channel: req.body.channel}).exec(function(err, user) {sails.log(err);
      if (err) {
				req.flash('err', req.__('controllers.tutorial.data_already_used'));
				return res.redirect('dashboard');
			}
      else {

				Telegram.setBot(req.session.user.id);
				req.session.user = user[0];
				return res.redirect('offer');

      }
    });
  },
};
