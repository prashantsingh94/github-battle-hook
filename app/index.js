import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Popular from "./components/Popular"
import Battle from "./components/Battle"
import {ThemeProvider} from "./contexts/theme"
import Nav from "./components/Nav"
import FourZeroFour from "./components/FourZeroFour"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Results from "./components/Results"

function App () {
  const [theme, setTheme] = React.useState('light')
  const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light')

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme = {toggleTheme} />
            <Switch>
            <Route exact path='/' component={Popular} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route component={FourZeroFour} />
            </Switch>
          </div>
        </div>

      </ThemeProvider>
    </Router>


  )
}



ReactDOM.render(<App />, document.querySelector("#app"))
