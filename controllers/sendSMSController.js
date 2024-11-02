const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const twilio = require('twilio');

dotenv.config();

//@desc sms
//@router api/user/sendSMS/
//access public 
const sendSms = asyncHandler(async (req, res) => {
  const { to, body } = req.body;

  try {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send SMS
    const message = await client.messages.create({
      body: body || "Hello from MEDScore!", // Default message if 'body' is not provided
      from: process.env.TWILIO_PHONE_NUMBER, // Sender number from .env
      to: to  // Recipient's number from request
    });

    // Response with message details
    res.status(201).json({ 
      success: true, 
      message: 'SMS sent successfully',
      data: {
        sid: message.sid,
        status: message.status,
        accountSid: message.account_sid,
        to: message.to,
        from: message.from,
        body: message.body,
        dateCreated: message.date_created,
        dateUpdated: message.date_updated,
        error_code: message.error_code,
        error_message: message.error_message
      }
    });

  } catch (error) {
    console.error('Error sending SMS:', error);

    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.code) {
      errorMessage = `Twilio error code ${error.code}: ${error.message}`;
    }

    res.status(500).json({ error: errorMessage });
  }
});

module.exports = { sendSms };
