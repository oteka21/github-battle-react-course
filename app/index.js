import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular.jsx'
import Info from './components/info.jsx'
import Nav from './components/Nav.jsx'
// import Results  from './components/Results.jsx'
import { Provider as ThemeProvider } from './context/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Consumer as ThemeConsumer } from './context/theme'
import DynamicImport from './components/DynamicImport.jsx'
import Loading from './components/Loading.jsx'


import './index.css'

const Results = lazy(() => import('./components/Results.jsx'))

class App extends React.Component{
  render(){
    return (
      <Router>
        <ThemeProvider>
            <div className='container'>
              <Nav />
                <Switch>
                  <Route exact path='/' component={Popular} />
                  <Route exact path='/battle' render={() =>
                    <DynamicImport load={()=> import('./components/Battle.jsx')}>
                      {(Component ) => console.log(Component) || Component ? <Component/> : <Loading text='Cargando en lazy bitch...' speed={300}/>}
                    </DynamicImport>
                  } />
                  <Suspense fallback={<Loading text='Cargando en lazy bitch...' speed={300} />}>
                    <Route exact path='/battle/results' component={Results} />
                    <Route render={() => <ThemeConsumer>
                    {({theme}) => <h1>404 {theme === 'light' ? '✋🏿' : '✋🏻'}</h1>}
                    </ThemeConsumer>} />
                  </Suspense>
                </Switch>
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