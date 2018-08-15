/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    cap: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    province: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    fiscalCode: {
      type: 'string',
    },
    vat: {
      type: 'string',
    },
    botToken: {
      type: 'string',
      unique: true
    },
    paymentToken: {
      type: 'string',
      unique: true
    },
    channel: {
      type: 'string',
      unique: true
    },
    lang: {
      type: 'string',
      required: true
    },
    stripeCustomerId: {
      type: 'string',
      unique: true,
    },
    offers: {
      collection: 'offer',
      via: 'owner'
    },
    purchases: {
      collection: 'purchase',
      via: 'owner'
    },
    recharges: {
      collection: 'recharge',
      via: 'user'
    },
    webhooks: {
      collection: 'webhook',
      via: 'user'
    },

    checkInfo: function() {
      return name == null || name == "";
    }
  }
};
