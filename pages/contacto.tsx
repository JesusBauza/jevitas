import { PageWithLayout } from '@/components/page'
import { useInput } from '@/lib/hooks'

const JeviLab: PageWithLayout = () => {
  const { bind: bindName, value: name } = useInput()
  const { bind: bindEmail, value: email } = useInput()
  const { bind: bindService, value: service } = useInput()
  const { bind: bindMessage, value: message } = useInput()
  const submit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="bg-[#F0BE69] flex h-full w-full">
      <div className="c-lg flex flex-col lg:flex-row items-center py-16">
        <form className="w-1/2 flex flex-col space-y-4" onSubmit={submit}>
          <div className="flex flex-col">
            <div className="font-title text-xl text-[#556876]">Nombre:</div>
            <input
              type="text"
              className="input text-white border-white focus:text-white focus:border-white"
              {...bindName}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-title text-xl text-[#556876]">Correo:</div>
            <input
              type="text"
              className="input text-white border-white focus:text-white focus:border-white"
              {...bindEmail}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-title text-xl text-[#556876]">Servicio:</div>
            <input
              type="text"
              className="input text-white border-white focus:text-white focus:border-white"
              {...bindService}
            />
          </div>
          <div className="flex flex-col">
            <div className="font-title text-xl text-[#556876]">Mensaje:</div>
            <textarea
              className="input text-white border-white focus:text-white focus:border-white"
              {...bindMessage}
            />
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
