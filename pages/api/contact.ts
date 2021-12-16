import { NextApiHandler } from "next";
import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { datoCMSFetcher } from "@/lib/fetcher";

const handler: NextApiHandler = async (req, res) => {
  const { name, email, service, message } = JSON.parse(req.body)
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
