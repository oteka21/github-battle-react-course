import React from 'react'
import { PropTypes } from 'prop-types'

export default function LanguagesNav ({selected, onUpdateLanguage}){
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button 
          className='btn-clear nav-link'
          onClick={() => onUpdateLanguage(language)}
          style={language === selected ? {color: 'rgba(187, 46,31)'} : null}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}


LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func
}
