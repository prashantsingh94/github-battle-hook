import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { battle } from '../utils/api'
import {ThemeConsumer} from '../contexts/theme'
import { Link } from  'react-router-dom'

class PlayerInput extends React.Component {
  constructor(props){
  super(props)

  this.state = {
    username: ''
  }

  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
     username: e.target.value
    })

  }
  handleSubmit(event){
   event.preventDefault()
   this.props.onSubmit(this.state.username)
  }
  render(){

    return (
     <ThemeConsumer>
       {({theme}) => (
         <div className="player-container">
         <form className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                type='text'
                id='username'
                className={`input-${theme}`}
                placeholder='github username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'} `}
                type='submit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
         </div>
       )}
     </ThemeConsumer>
    )

  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

function PlayerPreview ({username, label, onReset}) {

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
                  alt={`Avatar for ${username}`}
                />
                <a
                  href={`https://github.com/${username}`}
                  className='link'>
                    {username}
                </a>
              </div>
              <button className='btn-clear flex-center' onClick={onReset}>
                <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
              </button>
            </div>
          </div>
      )}
    </ThemeConsumer>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired
}

function Instructions () {
return (
    <ThemeConsumer>
    {({theme}) => (
      <div className='instructions-container'>
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
          <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
        </li>
      </ol>
    </div>
    )}
  </ThemeConsumer>
  )
}

export default class Battle extends React.Component {
  constructor(props){

    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      //battle: false
    }

    this.submitHandle = this.submitHandle.bind(this)
    this.resetHandle = this.resetHandle.bind(this)

  }

  submitHandle(id, player){
    this.setState({
      [id]: player
    })
  }

  resetHandle(id){
    this.setState({
      [id] : null
    })

  }
  render(){

    const {playerOne, playerTwo} = this.state
    //const {playerOne, playerTwo, battle} = this.state

    //  if(battle === true){
    //  return <Results
    //  playerOne={playerOne}
    //  playerTwo={playerTwo}

    //  onReset={() => this.setState({
    //    playerOne: null,
    //    playerTwo: null,
    //    battle: false
    //    })
    //  } />
    //  }
    return (

      <React.Fragment>
        <Instructions/>
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {
              playerOne === null ? <PlayerInput  label="Player One" onSubmit={(player) => this.submitHandle('playerOne', player)} />
                : <PlayerPreview username={playerOne} label='Player One' onReset={() => this.resetHandle('playerOne')} />
            }

            {
            playerTwo === null ? <PlayerInput  label="Player Two" onSubmit={(player) => this.submitHandle('playerTwo', player)} />
              : <PlayerPreview username={playerTwo} label='Player Two' onReset={() => this.resetHandle('playerTwo')} />
            }



            </div>

            { playerOne && playerTwo && (
              // <button className='btn dark-btn btn-space'
              // onClick={() => this.setState({battle: true}) }>
              //   Battle
              // </button>
              <Link
              className='btn dark-btn btn-space'
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
              >
               Battle
              </Link>
            )

             }

            </div>
        </React.Fragment>

    )
  }
}

Battle.propTypes = {
  playerOne: PropTypes.string,
  playerTwo: PropTypes.string,
  onReset: PropTypes.func
}