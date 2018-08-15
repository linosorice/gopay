/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {
    if (sails.config.environment === 'production' || sails.config.environment === 'development') {
  		User.findOne({email: req.body.email}).exec(function(err, user) {
  			if (err) { res.serverError(); }
  			else if (user) {
          req.flash('warn', req.__('controllers.user.already_register'));
  				return res.redirect('login');
  			} else {
              var pwd = Utils.generatePassword();
              var hash = Utils.encrypt(pwd);
              User.create({email: req.body.email, password: hash, lang: req.getLocale()}).exec(function(err, user) {
                if (err) { return res.serverError(); }
                else {
                  Mailer.sendWelcomeMail(req.body.email, pwd, req);
									Mailer.sendNewUserEmail('support@' + process.env.DOMAIN, req.body.email, req);
									Telegram.sendGuardBotMessage('Sir, new user ahead! His name is ' + req.body.email);
                  req.flash('info', req.__('controllers.user.welcome'));
                  return res.redirect('login');
                }
              });
          
  			}
  		});
    } else {
      req.flash('warn', req.__('controllers.user.staging_error'));
      return res.redirect('login');
    }
	},

  editBot: function(req, res) {
  	User.update({id: req.session.user.id}, {botToken: req.body.botToken, paymentToken: req.body.paymentToken, channel: req.body.channel, }).exec(function(err, user) {
  		if (err) { return res.serverError() }
      Telegram.setBot(req.session.user.id);
  		req.session.user = user[0];
  		return res.redirect('dashboard');
  	});
  },

  editInfo: function(req, res) {
  	User.update({id: req.session.user.id}, {name: req.body.name, address: req.body.address, cap: req.body.cap, city: req.body.city, province: req.body.province, country: req.body.country, fiscalCode: req.body.fiscalCode, vat: req.body.vat}).exec(function(err, user) {
  		if (err) { return res.serverError() }
  		req.session.user = user[0];
  		return res.redirect('dashboard');
  	});
  },

	recoverPassword: function(req, res) {
		User.findOne({email: req.body.email}).exec(function (err, user){
			if (err) { res.serverError(err); }
			else if (user) {
				var pwd = Utils.generatePassword();
        var hash = Utils.encrypt(pwd);
        User.update({id: user.id}, {password: hash}).exec(function(err, user) {
		  		if (err) { return res.serverError() }
	  			Mailer.sendNewPasswordMail(req.body.email, pwd, req);
          req.flash('info', req.__('controllers.user.new_password'));
		  		return res.redirect('login');
		  	});
			} else {
        req.flash('err', req.__('controllers.access_user.not_registered'));
				return res.redirect('login');
			}
		});
	},

  changePassword: function(req, res) {
    User.findOne({id: req.session.user.id}).exec(function(err, user) {
      if (err) { return res.serverError(); }
      else {
        if (require('bcrypt').compareSync(req.body.old_password, user.password)) {
          User.update({id: req.session.user.id}, {password: Utils.encrypt(req.body.password)}).exec(function(err, ret) {
            if (err) { return res.serverError(); }
            req.flash('info', req.__('controllers.user.password_set'));
            return res.redirect('setting');
          });
        } else {
          req.flash('err', 'Password precedente errata');
          return res.redirect('setting');
        }
      }
    });
  },

};
