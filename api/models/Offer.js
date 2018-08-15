/**
 * Offer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    image: {
      type: 'string',
      required: true
    },
    price: {
      type: 'float',
      required: true
    },
    currency: {
      type: 'string',
      required: true
    },
    creation_date: {
      type: 'date',
      required: true
    },
    expiration: {
      type: 'date',
      required: true
    },
    quantity: {
      type: 'integer'
    },
    shipping: {
      type: 'boolean',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    }
  }
};
