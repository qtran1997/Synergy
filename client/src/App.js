import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Landing, Login, NotFound, Register, Synergy } from "./components";

import {
  AuthContextProvider,
  ErrorContextProvider,
  MainScreenContextProvider,
  NotepadContextProvider
} from "./contexts";

import whyDidYouRender from "@welldone-software/why-did-you-render";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

if (process.env.NODE_ENV !== "production") {
  whyDidYouRender(React);
}

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <Route exact path='/' component={Landing} />
          <Switch>
            <ErrorContextProvider>
              <AuthContextProvider>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <MainScreenContextProvider>
                  <NotepadContextProvider>
                    <Route exact path='/app' component={Synergy} />
                  </NotepadContextProvider>
                </MainScreenContextProvider>
              </AuthContextProvider>
            </ErrorContextProvider>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
