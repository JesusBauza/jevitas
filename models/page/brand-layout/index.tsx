import { IColorSet } from '@/models/common/color'

export interface IFontSet {
  title?: string
  sans?: string
}

export interface IBrandColorThemes {
  normal?: IBrandColorSet
  dark?: IBrandColorSet
}

export interface IBrandColorSet {
  foreground?: IColorSet
  background?: IColorSet
}

export interface IBrandLayout {
  titleName?: string
  icon?: string
  fonts: IFontSet
  themes: IBrandColorThemes
}

export const getDefaultBrandLayout = (): IBrandLayout => {
  return {
    titleName: 'Jevitas Intensas',
    icon: '/favicon.svg',
    fonts: {
      title: 'Abril Fatface',
      sans: 'Montserrat',
    },
    themes: {
      normal: {
        foreground: {
          primary: '#dd8525',
          secondary: '#e8521f',
        },
        background: {
          primary: '#fff0e3',
          secondary: '#f8f3ef',
        }
      },
      dark: {
        foreground: {
          primary: '#f87171',
          secondary: '#f5f4f4'
        },
        background: {
          primary: '#2f2f2f',
          secondary: '#383838',
        }
      }
    }
  }
}
