import qrImage from 'qr-image'

export const getQrData = (data, size) => {
  let pngImage = qrImage.imageSync(data, { type: 'png', size })
  return 'data:image/png;charset=utf-8;base64, ' + pngImage.toString('base64')
}

export const createQrImage = (elem, data, size) => {
  if (data && elem) {
    const image = document.createElement('img')
    image.setAttribute('src', getQrData(data, size))
    const oldChild = elem.firstElementChild
    if (oldChild) {
      oldChild.remove()
    }
    elem.appendChild(image)
  }
}
