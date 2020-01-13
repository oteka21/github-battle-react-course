import React from 'react'
import PropTypes from 'prop-types'

class Hover extends React.Component{
  constructor(props){
    super(props)


    this.state = {
      hovering: false
    }

    this.onMouseOver = this.onMouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
  }


  onMouseOver(){
    this.setState({hovering: true})
  }

  mouseOut(){
    this.setState({hovering: false})
  }


  render(){
    const { children } = this.props
    const { hovering } = this.state
    return (
      <div onMouseOver={this.onMouseOver} onMouseOut={this.mouseOut}>
        {children(hovering)}
      </div>
    )
  }
}

Hover.propTypes = {
  render: PropTypes.func.isRequired
}



export default Hover