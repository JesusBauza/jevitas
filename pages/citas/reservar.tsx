import { PageWithLayout } from '@/components/page'
import { useInput } from '@/lib/hooks'
import PsicoImg from '@www/citas/kellian.png'
import Image from 'next/image'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import countries from '@www/citas/countries.json'
import { useDatoCMSApi } from '@/lib/fetcher'

const ButtonWrapper = ({ amount, currency, showSpinner, onSucess = (orderId: string) => { } }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);


  return (<>
    {(showSpinner && isPending) && <div className="spinner" />}
    <PayPalButtons
      style={{ layout: 'vertical' }}
      disabled={false}
      forceReRender={[amount, currency]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the order
            onSucess(orderId)
            return orderId;
          });
      }}
      onApprove={function (data, actions) {
        return actions.order.capture().then(function () {
          // Your code here after capture the order
        });
      }}
    />
  </>
  );
}

const Reservar: PageWithLayout = () => {
  const { bind: bindName, value: name } = useInput()
  const { bind: bindEmail, value: email } = useInput()
  const { bind: bindWhatsapp, value: whatsapp } = useInput()
  const { bind: bindCountry, value: country } = useInput()
  const { bind: bindDate, value: date } = useInput()
  const { bind: bindTime, value: time } = useInput()
  const [sending, setSending] = useState(false)
  const [paying, setPaying] = useState(false)
  const [orderId, setOrderId] = useState('')
  const { data } = useDatoCMSApi(`{
    paypalData: token {
      clientId: paypalClientId
    }
  }`)
  const submit = useCallback(async (e) => {
    e.preventDefault()
    try {
      if (!paying) {
        setPaying(true)
        return
      }
      setSending(true)
      const res = await fetch('/api/cita', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          whatsapp,
          country,
          date,
          time,
          orderId,
        })
      })
      if (!res.ok) {
        throw new Error((await res.json()).error)
      }
      alert('Su formulario de cita se ha enviado correctamente, por favor esté atento a su bandeja de entrada en su correo electrónico')
    } catch (err) {
      alert(err.message)
    } finally {
      setSending(false)
    }
  }, [name, email, whatsapp])
  return (
    <div className="bg-[#C4D7D1] w-full relative" style={{
      cursor: sending ? 'progress' : 'auto'
    }}>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full lg:space-y-0">
        <div className="w-full lg:w-1/2 flex self-stretch min-h-full relative z-90 aspect-square">
          <Image src={PsicoImg} title="Kellian Ojeda" layout="fill" placeholder="blur" objectFit="cover" className="w-full h-full select-none" quality={100} />
        </div>
        <div className="w-full lg:w-1/2 py-8">
          <div className="flex flex-col c-lg space-y-6 lg:px-[5%]">
            <h3 className="animate text-3xl xl:text-5xl font-title text-[#556876] mb-6">
              Reserva una cita
            </h3>
            <form className={`w-full flex flex-col space-y-5 animate ${sending ? 'animate-pulse pointer-events-none' : ''}`} onSubmit={submit}>
              <p className="text-xs"><span className="font-bold">Nota: </span> debe esperar confirmacion del especialista para la confirmacion de la fecha y
                hora seleccionada)</p>
              {paying && data ? (
                <PayPalScriptProvider
                  options={{
                    "client-id": data.paypalData.clientId,//"BV2RSHRLAWMG6",
                    // "data-client-token": "9_mgzqWlpRNqEn8TT-GAV0nsFvL2RK8ev4Q3DtmdN2emW5sUIBLinzt49-i",
                    components: "buttons",
                    currency: "USD"
                  }}
                >
                  <div className="z-10">
                    <ButtonWrapper
                      currency="USD"
                      amount={26.99}
                      onSucess={setOrderId}
                      showSpinner={false}
                    />
                  </div>
                  <p className="text-xl text-right"><span className="font-bold">Monto: </span> $26,99 US</p>
                </PayPalScriptProvider>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="font-title text-xl text-[#556876]">Nombre y apellido:</label>
                    <input
                      required
                      type="text"
                      className="input border-white focus:text-x-gray-800 focus:border-white border-b-2"
                      {...bindName}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-title text-xl text-[#556876]">Correo:</label>
                    <input
                      required
                      type="email"
                      className="input border-white focus:text-x-gray-800 focus:border-white border-b-2"
                      {...bindEmail}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-title text-xl text-[#556876]">Whatsapp:</label>
                    <input
                      required
                      type="text"
                      className="input border-white focus:text-x-gray-800 focus:border-white border-b-2"
                      {...bindWhatsapp}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-title text-xl text-[#556876]">País:</label>
                    <select
                      required
                      className="input border-white focus:text-x-gray-800 focus:border-white border-b-2"
                      id="role"
                      {...bindCountry}
                    >
                      <option value="" hidden>Seleccione...</option>
                      {countries.countries.map((c, idx) => (
                        <option value={c.name_es} key={idx}>{c.name_es}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-title text-xl text-[#556876]">Hora y día:</label>
                    <div className="flex space-x-2">
                      <input
                        required
                        type="date"
                        className="input border-white focus:text-x-gray-800 focus:border-white border-b-2 w-1/2"
                        {...bindDate}
                      />
                      <input
                        required
                        type="time"
                        className="input border-white focus:text-x-gray-800 focus:border-white border-b-2 w-1/2"
                        {...bindTime}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="pt-6">
                <button
                  className="text-[#F0AD9D] bg-[#F8F3EF] rounded-full py-2 px-12 font-title text-xl self-start duration-500 hover:shadow-lg transform hover:scale-105"
                  style={{ willChange: 'transform' }}
                  type="submit"
                  disabled={paying ? !!orderId : false}
                >
                  {!paying ? 'Siguiente' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Reservar.getLayoutProps = (() => ({
  title: 'Reservar cita',
  navbarColor: '#C4D7D1',
}))

export default Reservar
