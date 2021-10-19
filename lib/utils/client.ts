import { useEffect, useState } from 'react'

export const getDefaultHost = () => process.env.NEXT_PUBLIC_HOST_URL || 'localhost:3000'

export const useCanonical = () => {
  const [isCanonical, setCanonical] = useState(false)

  useEffect(() => {
    setCanonical(window.location.host === getDefaultHost())
  }, [])

  return isCanonical
}

export const getAbsoluteURL = ({
  path = '',
  host = getDefaultHost(),
  subdomain = '',
} = {}) => {
  const hostWithSubdomain = subdomain ? `${subdomain}.${host}` : host
  let baseURL = isLocalhost(host) ? `http://${hostWithSubdomain}` : `https://${hostWithSubdomain}`
  return baseURL + path
}

export const isLocalhost = (host = getDefaultHost()) => {
  const splitedHost = host.split('.')
  return splitedHost.slice(0, splitedHost.length >= 3 ? splitedHost.length - 1 : splitedHost.length).some(str => str.startsWith('localhost'))
}

const matcher = (regexp: RegExp, fields?: string[]): (obj: Object) => boolean => {
  return (obj) => {
    const fields1 = fields || Object.keys(obj)
    let found = false
    fields1.forEach(key => {
      if (!found) {
        if ((typeof obj[key] == 'string') && regexp.exec(obj[key])) {
          found = true
        }
      }
    })
    return found
  }
}

export function search<T>(collection: T[], test: string | string[], fields?: string[]): T[] {
  let c = []
  if (test == undefined || test == null) {
    return c
  }
  const format = str => str.split('').filter(s => s.match((/^[-\w\s]+$/))).join('')
  if (typeof test == 'string') {
    const regex = new RegExp("\\b" + format(test), 'i')
    c = collection.filter(matcher(regex, fields))
  } else {
    let found = []
    test.forEach(t => {
      const regex = new RegExp("\\b" + format(t) + "\\b", 'i')
      found = [...found, ...collection.filter(matcher(regex, fields))]
    })
  }
  return c
}

export const formatDate = (str: string | Date, separator = '/') => {
  const d = new Date(str)
  const padLeft = (n: number) => ('00' + n).slice(-2)
  const dformat = [
    padLeft(d.getDate()),
    padLeft(d.getMonth() + 1),
    d.getFullYear()
  ].join(separator)
  return dformat
}

export const dateToUTC = (date: Date | string) => {
  return new Date(date).getTime() / 1000 - (new Date(date).getTimezoneOffset() * 60)
}
