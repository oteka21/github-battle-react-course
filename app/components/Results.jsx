import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBrieCase, FaUsers, FauserFriends, FaCode, FaUser, FaBriefcase, FaUserFriends } from 'react-icons/fa'
import Card from './Card.jsx'
import PropTypes from 'prop-types'
import Loading from './Loading.jsx'
import Tooltip from './Tooltip.jsx'
import {default as TooltipWithHover} from '../Containers/Tooltip'
import Hover from '../render-props/Hover.jsx'


// Here we have two example of how share logic between components 
// hocs and render props in our tooltip functionality

function ProfileList({ profile }){
  return (
    <ul className='card-list'>
    <li>
      <FaUser color='rgb(239,115,115)' size={22} />
      {profile.name}
    </li>
    {profile.location && (
      <li>
        <TooltipWithHover text="User's location">
          <FaCompass color='rgb(144, 115, 255)' size={22} />
          {profile.location}
        </TooltipWithHover>
      </li>
    )}
    {profile.company && (
      <li>
        <Hover>
        {(hovering) => console.log(hovering) || (
          <Tooltip hovering={hovering} text='Github user company'>
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        )}
        </Hover>
      </li>
    )}
    <li>
      <FaUsers color='rgb(129, 195, 245)' size={22} />
      {profile.followers.toLocaleString()} followers
    </li>
    <li>
      <FaUserFriends color='rgb(64, 183, 95)' size={22} />
      {profile.following.toLocaleString()} following
    </li>
  </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}


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
    const { onReset } = this.props
    if(loading){
      return <Loading speed={200} text='Cargando' />
    }
    if(error){
      return <h2 className='center-text error'>{error}</h2>
    }
    return (
      <>
        <div className='grid space-around container-sm'>
          <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
          >
            <ProfileList {...winner}/>
          </Card>

          <Card 
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
          >
            <ProfileList {...loser} />
          </Card>
        </div>
        <button
        className='btn dark-btn btn-space'
        onClick={onReset}>
          Reset
        </button>
      </>
    )
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired
}