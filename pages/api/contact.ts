import { NextApiHandler } from "next";
import sgMail, { MailDataRequired } from '@sendgrid/mail'

const handler: NextApiHandler = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const { name, email, service, message } = JSON.parse(req.body)
  const msg: MailDataRequired = {
    to: 'jevitasintensas@gmail.com', // Change to your recipient
    from: 'sender@jevitasintensas.com', // Change to your verified sender
    subject: service,
    replyTo: { email, name }, 
    html: `<h1>
    Formulario de contacto
    </h1>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Servicio:</strong> ${service}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace('\n', '<br />')}</p>
    `,
  }
  try {
    await sgMail.send(msg)
    res.json({ message: 'Mail sended' })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err.message
    })
  }
}

export default handler
