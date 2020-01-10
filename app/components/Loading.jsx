import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  }
}
export default function Loading({speed = 300, text = 'Loading'}){
  const [content, setContent] = useState(text)

  useEffect(() => {
    const myInterval = window.setInterval(() => {
      setContent(content => content + '.')
    }, speed)
    return () => window.clearInterval(myInterval, speed)
  }, [])

  return (
    <p style={styles.content}>
      {content}
    </p>
  )
}


Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}