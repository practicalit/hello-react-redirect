import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

//stateless component for navigation
const User = (params) => {
return (<h3>I am another component {params.name}</h3>)
}

class App extends Component {
  name = "john";

  constructor() {
    super();
    this.backToHello = this.backToHello.bind(this);
  }
  state = {
    logged: false,
    backToHello: false
  }

  loginHandler = () => {
    this.setState({
      logged: false
    })
    console.log('Clicked the button');
    console.log(this.state.logged);
  }

  //simple window location redirect.
  backToHello ()  {
      //this.props.history.push('/hello');
      window.location.href="/hello";
  }

  handleTimer() {
    
    setTimeout( () => {
      console.log('redirecting..');
      //return <Redirect to="/hello" />
      this.setState({logged: true});
    }, 2000 )
  }

  render() {
    return (
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
          <li><Link to="/user/logger">User</Link></li>
        </ul>
        <button onClick={this.loginHandler}>Login</button>
        <button onClick={this.backToHello}>Redirect to Hello</button>
        <div>
        {/* this is the default home url */}
        <Route path="/" exact render = {
          () => {
            return (<h1>Welcome to React</h1>)
          }
        }/>
        {/* this is the default hello */}
        <Route path="/hello" exact render = {
          () => {
            return (<h1>Salute fellow Reactor {this.name}!!</h1>)
          }
        }/>
        {/* <Route path="/user/:name" exact component={User} /> */}

        {/* this handles conditional redirect. if logged is true, then it will 
        render the component, otherwise it will redirect it to home */}
        <Route path="/user/:name" exact render = {
          ({match}) => {
            return this.state.logged ? (<User name={match.params.name}/>) : (
              <>
              <div>SHowing this message for 2 seconds </div>

                {/* handlerTime will set logged from false to true. */}
                {this.handleTimer()}
                {this.state.logged ? <Redirect to="/hello" /> : <h1>maybe</h1>}
              </>
            )
          }
        } />
        </div>
      </Router>
      
    );
  }
}

export default App;
