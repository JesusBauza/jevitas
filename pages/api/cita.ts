import { NextApiHandler } from "next";
import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { datoCMSFetcher } from "@/lib/fetcher";

const handler: NextApiHandler = async (req, res) => {
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
  const { sgData } = await datoCMSFetcher(`{
    sgData: token {
      apiKey: sgApiKey
      from: sgSenderEmail
      to: sgDestiny
    }
  }`)
  sgMail.setApiKey(sgData.apiKey)
  const msg: MailDataRequired = {
    to: sgData.to, // Change to your recipient
    from: sgData.from, // Change to your verified sender
    subject: `Cita psicológica: ${orderId ? 'Pagada' : 'Solicitud'}`,
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
