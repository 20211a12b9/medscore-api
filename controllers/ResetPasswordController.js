const Register = require("../models/registerModel");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Configure the transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'venkateshyanamaddi0312@gmail.com',
        pass: 'Venki@0312' // Be cautious with hardcoding passwords; consider using environment variables
    }
});

//@desc ResetPassword
//@route POST /api/user/resetpassword
//@access public

const ResetPassword = asyncHandler(async (req, res) => {
    try {
        const { dl_code } = req.body;

        // Find user by dl_code
        const user = await Register.findOne({ dl_code });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this DL number'
            });
        }

        // Generate and save reset token
        const resetToken = user.generatePasswordReset();
        console.log("Generated resetToken:", resetToken);
        
        // Save the user with the new reset token
        await user.save();
        console.log("User after saving:", {
            resetToken: user.resetPasswordToken,
            expires: user.resetPasswordExpires
        });

        // Format phone number and remove any spaces
        const fullPhoneNumber = `+91${user.phone_number.replace(/\s+/g, '')}`;
        
        try {
            // Send SMS
            const smsResponse = await fetch(`${process.env.REACT_APP_API_HOST}/api/user/sendSMS/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: fullPhoneNumber,
                    body: `Your Medscore password reset code is: ${resetToken}. This code will expire in 1 hour.`
                })
            });

            const smsData = await smsResponse.json();

            if (!smsResponse.ok) {
                throw new Error(smsData.message || 'Failed to send SMS');
            }

            res.status(200).json({ 
                success: true,
                message: 'Reset code sent via SMS'
            });

        } catch (smsError) {
            console.error('SMS Error:', smsError);
            // If SMS fails, reset the token
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();
            
            throw new Error('Failed to send reset code via SMS. Please try again.');
        }

    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error in password reset process'
        });
    }
});
//@desc Confirm reset password
//@route POST /api/user/confirmResetPassword
//@access public
const confirmResetPassword = asyncHandler(async (req, res) => {
    const { resetToken, newPassword } = req.body;

    // Find user by reset token
    const user = await Register.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() } // Ensure the token hasn't expired
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token');
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiry
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
});

module.exports = { ResetPassword, confirmResetPassword };
