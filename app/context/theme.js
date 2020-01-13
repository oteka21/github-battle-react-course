import React, { createContext, useState } from 'react'


const Context = createContext({})

export function Provider ({children}){
  const [ theme, setTheme ] = useState(()=> window.sessionStorage.getItem('theme') || 'light')


  const value = {
    theme,
    toggleTheme(){
      setTheme(theme => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        window.sessionStorage.setItem('theme',newTheme)
        return newTheme
      })
    }
  }

  return <Context.Provider value={value}>
      <div className={theme}>
        {children}
      </div>
  </Context.Provider>
}

export const Consumer = Context.Consumer

export default Context