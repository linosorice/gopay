/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	loginShow: function (req, res) {
		sails.log(req.__('test'));

    if (!req.session.user) {
      return res.view('login', {layout: false});
    } else {
      return res.redirect('dashboard');
    }
	},

	login: function(req, res) {

		User.findOne({email: req.body.email}).exec(function (err, user) {
			if (err) { res.serverError(); }
			else if (user) {
				if (require('bcrypt').compareSync(req.body.password, user.password)) {
					req.session.user = user;
					return res.redirect('dashboard');
				} else {
					req.flash('err', req.__('controllers.access_user.wrong_credentials'));
					return res.redirect('login');
				}
			} else {
				req.flash('err', req.__('controllers.access_user.not_registered'));
				return res.redirect('login');
      }

		});
	},

	/* Logout */
	logout: function(req, res) {
		req.session.user = null;
		return res.redirect('login');
	},

	/* Signup */
	signupShow: function(req, res) {

		if (!req.session.user) {
		  return res.view('signup', {err: undefined, layout: false});
		} else {
		  return res.redirect('dashboard');
		}
	},

};
