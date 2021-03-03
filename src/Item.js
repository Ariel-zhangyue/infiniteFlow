import React, { PureComponent } from "react";

export default class Item extends PureComponent {
  state = {
    translateX: 10,
    notifiedIn: false,
    notifiedOut: false,
  }


  ref = React.createRef()
  raf = null

  update = () => {
    const node = this.ref.current
    const { onMoveout, onMovein } = this.props
    let ined = this.state.notifiedIn
    let outed = this.state.notifiedOut
    const { translateX } = this.state
    if (
      !outed &&
      node.getBoundingClientRect().right < 0
    ) {
      debugger
      outed = true
      onMoveout && onMoveout()
    } else if (
      !ined &&
      node.getBoundingClientRect().right < window.screen.availWidth
    ) {
      ined = true
      onMovein && onMovein()
    }
    // else {
    if (outed) return
    this.setState({
      notifiedIn: ined,
      notifiedOut: outed,
      translateX: this.state.translateX - 1
    }, () => {
      this.raf = requestAnimationFrame(this.update)
    })
    // }

  }

  componentDidMount() {
    this.raf = requestAnimationFrame(this.update)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    const { translateX } = this.state
    return (
      <div ref={this.ref} style={{
        position: 'absolute',
        width: 'fit-content',
        backgroundColor: 'red',
        flex: 'none',
        left: window.screen.availWidth,
        // display: 'inline-block',
        transform: `translate(${translateX}px)`,
      }}>{this.props.item.item.text}</div>
    )
  }
}