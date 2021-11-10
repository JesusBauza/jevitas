import Image from 'next/image'

import Img1 from '@/public/images/carta/1.png'
import Img2 from '@/public/images/carta/2.png'
import Img3 from '@/public/images/carta/3.png'
import Img4 from '@/public/images/carta/4.png'

const cartas = () => [
  {
    title: 'Una nota de la fundadora',
    img: Img1,
    text: [
      'Hola a todos, yo soy Annella Marcano y quiero aprovechar para presentarme, por si estás llegando nuevo, o por sí capaz tienes tiempo aquí y no tienes ni idea de qué es esto.',
      'Soy venezolana, periodista, directora creativa y emprendedora.',
      'Algunos me dicen Ann, y muchos otros normalmente escriben mal mi nombre, yo no lo inventé es ANNELLA con doble N y doble L, así como el nombre de una mesera que trabajaba en el restaurante italiano favorito de mi mamá. Por eso siempre quise ser mesera en Europa, y también por el cliché de ser una escritora en busca de su gran obra.',
      'Y mi segundo nombre es Juleska, porque así se llamaba una yegua que mi mamá leyó en una revista hípica, no sé qué relación hay, pero amo los caballos.',
      'Nací el 15 de octubre de 1996 en Puerto Ordaz, Estado Bolívar, Venezuela. Mi nacimiento iba normal, yo estaba en posición esperando salir y de pronto a último momento me volteé y decidí nacer de pie, tragué líquido amniótico y casi no la cuento, pero aquí estoy 24 años después echando el cuento.',
    ]
  },
  {
    img: Img2,
    text: [
      'Mi abuela siempre me regañó por eso diciendo “siempre haces lo que quieres, ¿cómo se te ocurre nacer de pie, si todo el mundo nace de cabeza?”. Lo siento abuela, literalmente no tenía uso de razón. Hoy la extraño un montón, a ella y a sus regaños.',
      'Después de ahí, todo fue relativamente “normal”, aunque siempre he hecho las cosas al revés. Primero lo hago, después aprendo.',
      'A los 9 años descubrí el Diario de Anna Frank, yo que también escribía diarios, me sentí muy identificada y decidí hacerlo formalmente. Ese libro me ayudó a entender que nuestras palabras trascienden y que aun no estando en la misma situación, siempre vivimos cosas iguales.',
      'Así empecé a agarrar viejos cuadernos del colegio y los convertí en mis retazos de historias y experiencias, ese mismo año decidí que sería periodista. A los 13 años empecé a tener contacto con las redes sociales y un año después abrí mi primer blog, ahí empezó mi descubrimiento y mi diario pasó de ser en papel a ser en digital, fue una transición de la Annella del colegio, a la Annella en la universidad.',
      'A los 17 me escribí una carta para navidad. De esas en las que uno se marca resoluciones, se dice lo que no nos atrevemos a decir en voz alta y aceptamos quienes somos y lo que debemos mejorar.',
    ]
  },
  {
    img: Img3,
    text: [
      'Mi abuela siempre me regañó por eso diciendo “siempre haces lo que quieres, ¿cómo se te ocurre nacer de pie, si todo el mundo nace de cabeza?”. Lo siento abuela, literalmente no tenía uso de razón. Hoy la extraño un montón, a ella y a sus regaños.',
      'Después de ahí, todo fue relativamente “normal”, aunque siempre he hecho las cosas al revés. Primero lo hago, después aprendo.',
      'A los 9 años descubrí el Diario de Anna Frank, yo que también escribía diarios, me sentí muy identificada y decidí hacerlo formalmente. Ese libro me ayudó a entender que nuestras palabras trascienden y que aun no estando en la misma situación, siempre vivimos cosas iguales.',
      'Así empecé a agarrar viejos cuadernos del colegio y los convertí en mis retazos de historias y experiencias, ese mismo año decidí que sería periodista. A los 13 años empecé a tener contacto con las redes sociales y un año después abrí mi primer blog, ahí empezó mi descubrimiento y mi diario pasó de ser en papel a ser en digital, fue una transición de la Annella del colegio, a la Annella en la universidad.',
      'A los 17 me escribí una carta para navidad. De esas en las que uno se marca resoluciones, se dice lo que no nos atrevemos a decir en voz alta y aceptamos quienes somos y lo que debemos mejorar.',
    ]
  },
  {
    img: Img4,
    text: [
      'En marzo de 2019, mi viejo blog se había convertido en un emprendimiento. Y lo que eran letras sueltas en un espacio en blanco, se convirtieron en productos y servicios para necesidades específicas. Lo que era solo un número de seguidoras, se convirtió en un público objetivo. Mis experiencias se convirtieron en una propuesta de valor a través de una comunicación emotiva.',
      'Mis redes sociales fueron el canal y yo estaba siendo una marca.',
      'Y de pronto todo cambió. Y hoy, entiendo que cada paso dado desde que inicié era guiado por Dios, porque viéndolo desde un punto más en perspectiva, yo no pude haberlo hecho sola, ¿cómo tomé cada decisión aún sin tener un objetivo claro? Mi única respuesta sensata es que Dios tenía un propósito y yo solo estaba siguiendo el plan.',
      'Hablar de mi solo tiene sentido cuando lo nombro a Él. Si me toca hablar de mí, yo soy la niña que ve las mismas series y películas siempre, que no toma café y se cree poeta. La que encuentra emoción en una nube gris o en el cielo despejado de la noche. Todo lo observo y en función de eso saco conversación, porque me gusta hablar y preguntar para entender.',
      'Al final me gradué, soy Licenciada en Comunicación Social, con diplomados en Marketing Digital y cursos en habilidades blandas, liderazgo, creación de contenidos y competencias emprendedoras.',
    ]
  }
]

const Cartas = () => (
  <>
    <style jsx>{`
      .custom-scrollbar::-webkit-scrollbar {
        height: 18px !important;
        width: 200px !important;
        cursor: pointer !important;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: white !important;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        border: 4px solid transparent !important;
        border-radius: 100px !important;
        background-clip: content-box !important;
        background-color: rgba(30, 30, 30, 0.2) !important;
        cursor: pointer !important;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(30, 30, 30, 0.4) !important;
        cursor: pointer !important;
      }
      `}</style>
    <div
      className="w-full xl:overflow-x-auto xl:overflow-y-hidden custom-scrollbar bg-white xl:flex xl:h-[calc(100vh-83px)] space-y-8 xl:space-y-0 py-12 xl:py-0"
      style={{ height: '', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
    >
      {cartas().map((c, idx) => (
        <div className="xl:h-[calc(100vh-83px)]" style={{ minWidth: '100vw' }} key={idx}>
          <div
            className="flex flex-col xl:flex-row c-lg items-center h-full space-y-12 xl:space-y-0"
            style={{ scrollSnapAlign: 'center' }}
          >
            <div className="w-full xl:w-1/2 space-y-4 text-sm">
              {c.title ? (
                <h3 className="text-4xl font-title pb-4">Una nota de la fundadora</h3>
              ) : null}
              <p className="text-xs hidden xl:block">{idx + 1}/{cartas().length}</p>
              {c.text.map((t, idx) => (
                <p className="font-bold" key={idx}>
                  {t}
                </p>
              ))}
            </div>
            <div className="w-full xl:w-1/2 xl:h-8/10 flex justify-center">
              <Image className="w-full xl:w-auto x:h-full" objectFit="contain" src={c.img} placeholder="blur" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)

export default Cartas
