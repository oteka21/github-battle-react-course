import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results.jsx'


function Instructions(){
  return (
    <div className='instructions-container' >
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className='bg-light' color='rgba(255,215,0)' size={140} />
        </li>
      </ol>
    </div>
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
      <form action="#" className='column player' onSubmit={this.handleSubmit}>
        <label htmlFor='username' className='player-label'>
          {this.props.label}
        </label>
          <div className='row player-inputs'>
            <input 
            type="text"
            name='username' 
            className='input-light' 
            placeholder='github username' 
            autoComplete='off' 
            value={this.state.username} 
            onChange={this.handleChangeInput} />
            <button
            className='btn dark-btn'
            type='submit'
            disabled={!this.state.username}
            >Submit</button>
          </div>
      </form>
    )
  }
}


PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview({username, onReset, label}){
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
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
      battle: false
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
    const { playerOne, playerTwo, battle } = this.state
    if(battle){
      return <Results playerOne={playerOne} playerTwo={playerTwo} /> 
    }
    return (
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
            <button 
            className='btn dark-btn btn-space'
            onClick={() => this.setState({battle: true})}>Battle</button>
          )}
        </div>
      </>
    )
  }
}