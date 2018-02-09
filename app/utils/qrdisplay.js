import qrImage from 'qr-image'

export const getQrData = (data) => {
  let pngImage = qrImage.imageSync(data, { type: 'png' })
  return 'data:image/png;charset=utf-8;base64, ' + pngImage.toString('base64')
}

export const createQrImage = (elem, data) => {
  if (elem.children.length == 0) {
    const image = document.createElement('img')
    image.setAttribute('src', getQrData(data))
    elem.appendChild(image)
  }
}