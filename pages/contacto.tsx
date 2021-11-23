import { PageWithLayout } from '@/components/page'
import { useInput } from '@/lib/hooks'
import Image from '@www/contacto/svg/image.svg'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCallback, useEffect } from 'react'

const JeviLab: PageWithLayout = () => {
  const router = useRouter()
  const { bind: bindName, value: name, setValue: setName } = useInput()
  const { bind: bindEmail, value: email, setValue: setEmail } = useInput()
  const { bind: bindService, value: service, setValue: setService } = useInput()
  const { bind: bindMessage, value: message, setValue: setMessage } = useInput()
  const [sending, setSending] = useState(false)
  useEffect(() => {
    const { query } = router
    setName(query.name as string || '' as string)
    setEmail(query.email as string || '')
    setService(query.service as string || '')
    setMessage(query.message as string || '')
  }, [router])
  const submit = useCallback(async (e) => {
    e.preventDefault()
    try {
      setSending(true)
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          service,
          message,
        })
      })
      if (!res.ok) {
        throw new Error((await res.json()).error)
      }
      alert('Formulario enviado correctamente, te contactaré lo más pronto posible')
    } catch (err) {
      alert(err.message)
    } finally {
      setSending(false)
    }
  }, [name, email, service, message])
  return (
    <div className="bg-[#F0BE69] flex h-full w-full">
      <div className="c-lg flex flex-col-reverse lg:flex-row items-center py-16 lg:space-x-16" style={{
        cursor: sending ? 'progress' : 'auto'
      }}>
        <div className="w-full lg:w-1/2 pt-24 lg:pt-0">
          <Image className="w-full lg:w-7/10 mx-auto h-auto" />
        </div>
        <form className={`w-full lg:w-1/2 flex flex-col space-y-5 ${sending ? 'animate-pulse pointer-events-none' : ''}`} onSubmit={submit}>
          <div className="flex flex-col">
            <label className="font-title text-xl text-[#556876]">Nombre:</label>
            <input
              required
              type="text"
              className="input text-white border-white focus:text-white focus:border-white border-b-2"
              {...bindName}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-title text-xl text-[#556876]">Correo:</label>
            <input
              required
              type="email"
              className="input text-white border-white focus:text-white focus:border-white border-b-2"
              {...bindEmail}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-title text-xl text-[#556876]">Servicio:</label>
            <input
              required
              type="text"
              className="input text-white border-white focus:text-white focus:border-white border-b-2"
              {...bindService}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-title text-xl text-[#556876]">Mensaje:</label>
            <textarea
              required
              rows={3}
              className="input text-white border-white focus:text-white focus:border-white border-b-2"
              style={{ height: 'auto' }}
              {...bindMessage}
            />
          </div>
          <div className="pt-6">
            <button
              className="text-[#F0AD9D] bg-[#F8F3EF] rounded-full py-2 px-12 font-title text-xl self-start duration-500 hover:shadow-lg transform hover:scale-105"
              style={{ willChange: 'transform' }}
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

JeviLab.getLayoutProps = (() => ({
  title: 'Contacto',
}))

export default JeviLab
