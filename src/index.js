import React from 'react';
import ReactDOM from 'react-dom';
import App from './App1.js';

/*class App extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={App}/>
                </Route>

            </Router>
        );
    }
}*/

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
