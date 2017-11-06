const crypto = require('crypto')
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');
const TEMPLATE_ID = '43459f31-7286-4281-8958-c9ad910a7738'


const sendTokenEmail = (user, transactionId) => {
  const msg = {
    to: user.email,
    from: 'noreply@trusttoken.com',
    subject: 'Your Taryl Token has been Minted',
    text: 'template should be used',
    html: '<p>Template</p>',
    templateId: TEMPLATE_ID,
    substitutions: {
      transactionId
    }
  };
  sgMail.send(msg);
}

export default sendTokenEmail;