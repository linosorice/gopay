/**
 * Purchase.js
 *
 * @description :: Purchase Model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    buyer: { // nome telegram compratore
      type: 'string',
      required: true
    },
    buyerLastName: { // last name telegram compratore (potrebbe non essere settato)
      type: 'string'
    },
    buyerUsername: { // nickname telegram compratore (potrebbe non essere settato)
      type: 'string'
    },
    code: { // codice generato per l'acquisto
      type: 'string',
      required: true
    },
    date: { // data d'acquisto
      type: 'datetime',
      required: true
    },
    buyerEmail: {        // Shipping only
      type: 'string'
    },
    buyerAddress1: {
      type: 'string'
    },
    buyerAddress2: {
      type: 'string'
    },
    buyerPostCode: {
      type: 'string'
    },
    buyerCity: {
      type: 'string'
    },
    buyerState: {
      type: 'string'
    },
    owner: { // l'utente che viene pagato
      model: 'user',
      required: true
    },
    offer: { // offerta pagata
      model: 'offer',
      required: true
    }
  }
};
