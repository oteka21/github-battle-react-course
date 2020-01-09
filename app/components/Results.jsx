import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBrieCase, FaUsers, FauserFriends, FaCode, FaUser, FaBriefcase, FaUserFriends } from 'react-icons/fa'


export default class Results extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    const { playerOne, playerTwo } = this.props
    this.setState({
      loading: true
    })
    battle([playerOne, playerTwo])
    .then(([winner, loser]) => this.setState({
      winner,
      loser,
      error: null,
      loading: false
    }))
    .catch(({message}) => this.setState({
      error: message,
      loading: false
    }))
  }

  render(){
    const { winner, loser, error, loading } = this.state
    console.log(winner)
    if(loading){
      return <h2>loading...</h2>
    }
    if(error){
      return <h2 className='center-text error'>{error}</h2>
    }
    return (
      <div className='grid space-around container-sm'>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Winner'}
          </h4>
          <img 
            className='avatar' 
            src={winner.profile.avatar_url} 
            alt={`avatar for ${winner.profile.login}`}
            />

            <h2 className='center-text'>
              <a  className='link' href={winner.profile.html_url}>
                {winner.profile.login}
              </a>
            </h2>
            <ul className='card-list'>
              <li>
                <FaUser color='rgb(239,115,115)' size={22} />
                {winner.profile.name}
              </li>
              {winner.profile.location && (
                <li>
                  <FaCompass color='rgb(144, 115, 255)' size={22} />
                  {winner.profile.location}
                </li>
              )}
              {winner.profile.company && (
                <li>
                  <FaBriefcase color='#795548' size={22} />
                  {winner.profile.company}
                </li>
              )}
              <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {winner.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {winner.profile.following.toLocaleString()} following
              </li>
            </ul>
        </div>
        <div className='card bg-light'>
          <h4 className='header-lg center-text'>
            {winner.score === loser.score ? 'Tie' : 'Loser'}
          </h4>
          <img 
            className='avatar' 
            src={loser.profile.avatar_url} 
            alt={`avatar for ${loser.profile.login}`}
            />

            <h2 className='center-text'>
              <a  className='link' href={loser.profile.html_url}>
                {loser.profile.login}
              </a>
            </h2>
            <ul className='card-list'>
              <li>
                <FaUser color='rgb(239,115,115)' size={22} />
                {loser.profile.name}
              </li>
              {loser.profile.location && (
                <li>
                  <FaCompass color='rgb(144, 115, 255)' size={22} />
                  {loser.profile.location}
                </li>
              )}
              {loser.profile.company && (
                <li>
                  <FaBriefcase color='#795548' size={22} />
                  {loser.profile.company}
                </li>
              )}
              <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {loser.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {loser.profile.following.toLocaleString()} following
              </li>
            </ul>
        </div>
      </div>
    )
  }
}