const sendContactEmailService = require('../util/sendContactUsEmail')
//Edit user info
const sendContactUsEmail = async (req, res) => {
    try {
        const { firstName, lastName, university, email, phoneNumber, message } =
            req.body
        await sendContactEmailService(
            firstName,
            lastName,
            university,
            email,
            phoneNumber,
            message,
        )
        return res.status(200).json({
            message: 'Email sent successfully!',
        })
    } catch (error) {
        console.error('Error adding student information:', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { sendContactUsEmail }
