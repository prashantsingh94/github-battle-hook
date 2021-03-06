import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { battle } from '../utils/api'
import ThemeContext, {ThemeConsumer} from '../contexts/theme'
import { Link } from  'react-router-dom'


function PlayerInput ({label, onSubmit}) {
  const [username, setUsername] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(username)
  }

  const handleChange = (event) => {
    setUsername(event.target.value)
 }

 const theme = React.useContext(ThemeContext)
  return (
    <div className="player-container">
        <form className='column player' onSubmit={handleSubmit}>
           <label htmlFor='username' className='player-label'>
             {label}
           </label>
           <div className='row player-inputs'>
             <input
               type='text'
               id='username'
               className={`input-${theme}`}
               placeholder='github username'
               autoComplete='off'
               value={username}
               onChange={handleChange}
             />
             <button
               className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'} `}
               type='submit'
               disabled={!username}
             >
               Submit
             </button>
           </div>
         </form>
        </div>
   )

}





PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

function PlayerPreview ({username, label, onReset}) {
    const theme = React.useContext(ThemeContext)
    return (
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

  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired
}

function Instructions () {

 const theme = React.useContext(ThemeContext)
return (
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

  )
}

export default function Battle () {
  const [playerOne, setPlayerOne] = React.useState(null)
  const [playerTwo, setPlayerTwo] = React.useState(null)

  const submitHandle = (id, player) => id === 'playerOne'? setPlayerOne(player) : setPlayerTwo(player)
  const resetHandle = (id) => id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null)

  return (
    <React.Fragment>
      <Instructions/>
      <div className='players-container'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around'>
          {
            playerOne === null ? <PlayerInput  label="Player One" onSubmit={(player) => submitHandle('playerOne', player)} />
              : <PlayerPreview username={playerOne} label='Player One' onReset={() => resetHandle('playerOne')} />
          }

          {
          playerTwo === null ? <PlayerInput  label="Player Two" onSubmit={(player) => submitHandle('playerTwo', player)} />
            : <PlayerPreview username={playerTwo} label='Player Two' onReset={() => resetHandle('playerTwo')} />
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


Battle.propTypes = {
  playerOne: PropTypes.string,
  playerTwo: PropTypes.string,
  onReset: PropTypes.func
}