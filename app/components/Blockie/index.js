import React, { Component } from 'react'
import { toDataUrl } from 'utils/blockies'

class Blockie extends Component {
  constructor(props) {
    super(props)

    this.identicon = React.createRef()
  }

  componentDidMount = () => {
    const { address, diameter } = this.props
    const image = this.generateBlockieIdenticon(address, diameter)
    this.identicon.current.appendChild(image)
  }

  componentDidUpdate = () => {
    const { address, diameter } = this.props
    const image = this.generateBlockieIdenticon(address, diameter)

    const children = this.identicon.current.children
    for (let i = 0; i < children.length; i++) {
      this.identicon.current.removeChild(children[i])
    }

    this.identicon.current.appendChild(image)
  }

  generateBlockieIdenticon = (address, diameter) => {
    const image = new Image()
    image.src = toDataUrl(address)
    image.height = diameter
    image.width = diameter
    image.style.borderRadius = (diameter / 2) + 'px'

    return image
  }

  render() {
    return (
      <div ref={this.identicon}></div>
    )
  }
}

export default Blockie
