import React from 'react'
import { fetchPopularRepos } from '../utils/api'
import LanguagesNav from './LanguagesNav.jsx'
import ReposGrid from './ReposGrid.jsx'


export default class Popular extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
      loading: true
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }


  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage){
    this.setState({
      selectedLanguage,
      error: null
    })

    if(!this.state.repos[selectedLanguage]){
      fetchPopularRepos(selectedLanguage)
      .then(data => {
        this.setState(({repos}) => ({
          repos: {
            ...repos,
            [selectedLanguage]: data
          }
        }))
    })
      .catch(() => {
        console.warn('error fetching repos')
        this.setState({
          error: 'error fetching repos'
        })
      })
    }
  }

  isLoading(){
    const { selectedLanguage, repos, error } = this.state
    return !repos[selectedLanguage] && error === null
  }

  render (){
    const { selectedLanguage, error, repos } = this.state
    return (
      <>
        <LanguagesNav 
          selected={selectedLanguage} 
          onUpdateLanguage={this.updateLanguage}/>
          {this.isLoading() && <p>Loading...</p>}
          {error && <p>Error</p>}
          {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </>
    )
  }
}