// npm install twilio
const twilio = require('twilio');

const accountSid = 'TWILLIO_SID';
const authToken = 'TWILLIO_TOKEN';

const client = new twilio(accountSid, authToken);
client.messages.create({
  from: 'whatsapp:+91232323334',
  body: 'Sent this message using code',
  to: 'whatsapp:+91232323323'
}).then(msg => console.log(msg.sid));