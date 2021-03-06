import React from 'react'
import {battle} from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

function ProfileList({profile}) {
  return (
    <ul className='card-list'>
      <Tooltip text="User's name">
        <li>
          <FaUser color='rgb(239, 115, 115)' size={22} />
          {profile.name}
        </li>
      </Tooltip>

        {profile.location && (
          <Tooltip text="User's location">
          <li>
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </li>
          </Tooltip>
        )}
        {profile.company && (
          <Tooltip text="User's company">
          <li>
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </li>
          </Tooltip>
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

export default class Results extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    //const {playerOne, playerTwo} = this.props
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    battle([playerOne, playerTwo]).then((players) => {
      //console.log("Data", players)
      this.setState({
        winner: players[0],
        loser: players[1],
        error: null,
        loading: false
      })
    }).catch(({message}) => {

      this.setState({
        error: message,
        loading:null
      })

    })
  }
  render() {
    const {winner, loser, error, loading} = this.state
    if(loading === true){
      return <Loading text="Battling" />
    }

    if(error){
      return (
        <p className='center-text error'>{error}</p>
      )
    }
   return(
    <React.Fragment>
       <div className='grid space-around container-sm'>
         <Card header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          href={winner.profile.html_url}
          name={winner.profile.login}
          avatar={winner.profile.avatar_url}
         >
        <ProfileList profile={winner.profile} />
        </Card>

        <Card header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          href={loser.profile.html_url}
          name={loser.profile.login}
          avatar={loser.profile.avatar_url}
        >
        <ProfileList profile={loser.profile} />
        </Card>
      </div>

      <Link
      to='/battle'
      className="btn dark-btn btn-space"
      >
       Reset
      </Link>
      </React.Fragment>
     )
  }
}