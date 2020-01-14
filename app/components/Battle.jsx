import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results.jsx'
import { Consumer as ThemeConsumer } from '../context/theme'
import { Link } from 'react-router-dom'


function Instructions(){
  return (
    <ThemeConsumer>
      {({theme}) => (
          <div className='instructions-container' >
          <h1 className='center-text header-lg'>
            Instructions
          </h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two Github users</h3>
              <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>Battle</h3>
              <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
            </li>
            <li>
              <h3 className='header-sm'>See the winners</h3>
              <FaTrophy className={`bg-${theme}`} color='rgba(255,215,0)' size={140} />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  )
}

class PlayerInput extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      username: ''
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  handleChangeInput(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (
      <ThemeConsumer>
        {({theme}) => (
          <form action="#" className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
              <div className='row player-inputs'>
                <input 
                type="text"
                name='username' 
                className={`input-${theme}`} 
                placeholder='github username' 
                autoComplete='off' 
                value={this.state.username} 
                onChange={this.handleChangeInput} />
                <button
                className={`btn ${theme === 'light'? 'dark-btn' : 'light-btn'}`}
                type='submit'
                disabled={!this.state.username}
                >Submit</button>
              </div>
          </form>
        )}
      </ThemeConsumer>
    )
  }
}


PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview({username, onReset, label}){
  return (
    <ThemeConsumer>
      {({theme}) => (
        <div className='column player'>
          <h3 className='player-label'>{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className='player-info'>
              <img 
              className='avatar-small'
              src={`https://github.com/${username}.png?size=200`} 
              alt={`avatar for ${username}`} />
              <a 
              href={`https://github.com/${username}`}
              className='link'>
                {username}
              </a>
            </div>
            <button className='btn-clear flex-center' onClick={onReset}>
              <FaTimesCircle color='rgba(194, 57, 42)' size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id,player){
    this.setState({
      [id]: player
    })
  }

  handleReset(player){
    this.setState({
      [player]: null
    })
  }
  render(){
    const { playerOne, playerTwo } = this.state

    // if(battle){
    //   return <Results playerOne={playerOne} playerTwo={playerTwo} onReset={() => this.setState({playerOne: null, playerTwo:null, battle: false})}/> 
    // }

    return (
      <ThemeConsumer>
        {({theme})=> (
          <>
            <Instructions />
            <div className='players-container'>
              <h1 className='conter-text header-lg'>Player</h1>
              <div className='row space-around'>
                {playerOne === null
                ? <PlayerInput 
                  label='Player one'
                  onSubmit={player => this.handleSubmit('playerOne', player) } />

                : <PlayerPreview username={playerOne} onReset={() => this.handleReset('playerOne')} label='Player One'/>}
                {playerTwo === null 
                ? <PlayerInput 
                  label='Player two'
                  onSubmit={player => this.handleSubmit('playerTwo', player) } />
                : <PlayerPreview username={playerTwo} onReset={() => this.handleReset('playerTwo')} label='Player Two' />
                }
              </div>
              {playerOne && playerTwo && (
                <Link 
                className={`btn btn-space ${theme === 'light' ? 'dark': 'light'}`}
                to={{
                  pathname: '/battle/results',
                  search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                }} >Battle</Link>
              )}
            </div>
          </>
        )}
      </ThemeConsumer>
    )
  }
}