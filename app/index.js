import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular.jsx'
import Battle from './components/Battle.jsx'

import './index.css'

class App extends React.Component{
  render(){
    return (
      <div className='container'>
      {/* <Popular /> */}
      <Battle />
      </div>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
)