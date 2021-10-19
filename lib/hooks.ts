import { MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: CallableFunction) => {
  const handleClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export const useInput = <T extends number | string = string>(initialValue?: T, validation?: 'slug' | undefined | null) => {
  const [value, setValue] = useState<T>(initialValue || '' as T);
  const validations = {
    slug: event => {
      const regex: RegExp = value ? new RegExp(/^\w+$/) : new RegExp(/^[a-zA-Z]+$/)
      if (!event.key.match(regex)) {
        event.preventDefault()
      }
    }
  }
  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: event => {
        switch (validation) {
          case 'slug':
            setValue(event.target.value.toLowerCase())
            break
          default:
            setValue(event.target.value)
        }
      },
      onKeyDown: validations[validation] || undefined,
    }
  }
}

export type RefCallback<T> = (arg: T) => void

export function useRefWithCallback<T = any>(onMount: RefCallback<T>, onUnmount?: RefCallback<T>): [MutableRefObject<T>, (node: T) => void] {
  const nodeRef = useRef<T>(null)

  const setRef = useCallback(node => {
    if (nodeRef.current && onUnmount) {
      onUnmount(nodeRef.current)
    }

    nodeRef.current = node

    if (nodeRef.current) {
      onMount(nodeRef.current)
    }
  }, [onMount, onUnmount])

  return [nodeRef, setRef]
}
