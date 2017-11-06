'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var crypto = require('crypto');
var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');
var TEMPLATE_ID = '43459f31-7286-4281-8958-c9ad910a7738';

var sendTokenEmail = function sendTokenEmail(user) {
  var msg = {
    to: user.email,
    from: 'noreply@trusttoken.com',
    subject: 'Your Taryl Token has been Minted',
    text: 'template should be used',
    html: '<p>Template</p>',
    templateId: TEMPLATE_ID,
    substitutions: {

      transactionId: '0x1960b5feffc3cc212cb1abb16850d91f9a288a8667a90581dc6a0554bb63bdfd'
    }
  };
  sgMail.send(msg);
};

exports.default = sendTokenEmail;