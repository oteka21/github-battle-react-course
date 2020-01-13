import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular.jsx'
import Battle from './components/Battle.jsx'
import Info from './components/info.jsx'
import Nav from './components/Nav.jsx'
import { Provider as ThemeProvider } from './context/theme'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'

class App extends React.Component{
  render(){
    return (
      <Router>
        <ThemeProvider>
            <div className='container'>
              <Nav />
              <Route exact path='/'>
                <Popular />
              </Route>
              <Route exact path='/battle'>
                <Battle />
              </Route>
            </div>
        </ThemeProvider>
      </Router>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
)