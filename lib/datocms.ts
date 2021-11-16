export const responsiveImageHelper = (params?: {
  w?: number
  h?: number
  q?: number
  fit?: string
}) => {
  const { w, h, q, fit } = params || {
    w: null,
    h: null,
    q: null,
    fit: null,
  }
  return `responsiveImage(imgixParams: {
    ${w ? `w: ${w},` : ''}
    ${h ? `h: ${h},` : ''}
    ${q ? `q: ${q},` : ''}
    ${fit ? `fit: ${fit},` : ''}
    auto: format
  }) {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }`
}

export const responsiveImageFragment = `
fragment responsiveImageFragment on ResponsiveImage {
  srcSet
  webpSrcSet
  sizes
  src
  width
  height
  aspectRatio
  alt
  title
  base64
}`
