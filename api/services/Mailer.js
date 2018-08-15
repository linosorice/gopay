module.exports = {
  sendWelcomeMail: function(to, password, req) {
    sails.hooks.email.send(
      'welcome',
      {
        req: req,
        password: password
      },
      {
        to: to,
        subject: req.__('emails.welcome.subject'),
        replyTo: 'no-reply@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'Welcome mail sent to ' + to); }
    )
  },

  sendPurchaseMail: function(to, paymentData, purchaseCode, req) {
    sails.hooks.email.send(
      'purchase',
      {
        req: req,
        buyer: paymentData.from.first_name + ' (' + paymentData.from.username + ')',
        purchaseCode: purchaseCode
      },
      {
        to: to,
        subject: req.__('emails.purchase.subject') + paymentData.from.first_name,
        replyTo: 'no-reply@' + process.env.DOMAIN,
        bcc: 'support@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'Purchase mail sent to ' + to); }
    )
  },

  sendNewPasswordMail: function(to, password, req) {
    sails.hooks.email.send(
      'recover_password',
      {
        req: req,
        password: password
      },
      {
        to: to,
        subject: req.__('emails.password.subject'),
        replyTo: 'no-reply@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'Recover password mail sent to ' + to); }
    )
  },

  sendRechargeMail: function(to, amount, req) {
    sails.hooks.email.send(
      'recharge',
      {
        req: req,
        amount: amount,
      },
      {
        to: to,
        subject: req.__('emails.recharge.subject') + amount + ' offerte.',
        replyTo: 'no-reply@' + process.env.DOMAIN,
        bcc: 'support@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'Recharge mail sent to ' + to); }
    )
  },

  sendShippingEmail: function(to, name, email, shippingAddress, purchaseCode, req) {
    sails.hooks.email.send(
      'shipping',
      {
        req: req,
        buyer: name,
        buyerEmail: email,
        shippingAddress: shippingAddress,
        purchaseCode: purchaseCode,
      },
      {
        to: to,
        subject: req.__('emails.shipping.subject') + name,
        replyTo: 'no-reply@' + process.env.DOMAIN,
        bcc: 'support@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'Shipping mail sent to ' + to); }
    )
  },

  sendNewUserEmail: function(to, email, req) {
    sails.hooks.email.send(
      'new_user',
      {
        req: req,
        user: email
      },
      {
        to: to,
        subject: req.__('emails.new_user.subject'),
        replyTo: 'no-reply@' + process.env.DOMAIN,
        bcc: 'support@' + process.env.DOMAIN,
      },
      function(err) { sails.log(err || 'New user mail sent to ' + to); }
    )
  },
}
