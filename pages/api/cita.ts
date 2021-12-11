import { NextApiHandler } from "next";
import sgMail, { MailDataRequired } from '@sendgrid/mail'

const handler: NextApiHandler = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const {
    name,
    email,
    whatsapp,
    country,
    date,
    time,
    orderId,
  } = JSON.parse(req.body)
  const parsedDate = new Date(date)
  const msg: MailDataRequired = {
    to: 'jevitasintensas@gmail.com', // Change to your recipient
    from: 'sender@jevitasintensas.com', // Change to your verified sender
    subject: `Cita psicológica: ${orderId ? 'Pagado' : 'Solicitud'}`,
    replyTo: { email, name },
    html: `<h1>
    ${orderId ? 'Cita pagada' : 'Formulario de cita'}
    </h1>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Whatsapp:</strong> ${whatsapp}</p>
    <p><strong>País:</strong> ${country}</p>
    <p><strong>Fecha:</strong> ${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}</p>
    <p><strong>Hora:</strong> ${time}</p>
    ${orderId ? `<p><strong>Hora:</strong> ${orderId}</p>` : ``}
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
