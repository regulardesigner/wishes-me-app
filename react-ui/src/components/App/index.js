import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import logo from './logo.svg';
import './app.css';

const App = () => {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/test">
            <h1>This is a test</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem libero ullam nulla cumque a debitis voluptate in. Non nesciunt illo velit libero. Nostrum eligendi temporibus iste voluptatum ut, eum at?</p>
            <NavLink to="/">home</NavLink>
          </Route>
          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              { process.env.NODE_ENV === 'production' ?
                  <p>
                    This is a production build from create-react-app.
                  </p>
                : <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
              }
              <p>{'« '}<strong>
                {isFetching
                  ? 'Fetching message from API'
                  : message}
              </strong>{' »'}</p>
              <p><a
                className="App-link"
                href="https://github.com/mars/heroku-cra-node"
              >
                React + Node deployment on Heroku
              </a></p>
              <p><a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a></p>
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );

}

export default App;
