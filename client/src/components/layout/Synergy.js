import React, { Component } from "react";

import { MainApp } from "../";

import {
  AuthContext,
  ErrorContext,
  MainScreenContext,
  NotepadContext
} from "../../contexts";

class Synergy extends Component {
  render() {
    return (
      <ErrorContext.Consumer>
        {error => (
          <AuthContext.Consumer>
            {auth => (
              <NotepadContext.Consumer>
                {({ getNotepads }) => (
                  <MainScreenContext.Consumer>
                    {({ display }) => (
                      <MainApp
                        auth={auth}
                        display={display}
                        getNotepads={getNotepads}
                      />
                    )}
                  </MainScreenContext.Consumer>
                )}
              </NotepadContext.Consumer>
            )}
          </AuthContext.Consumer>
        )}
      </ErrorContext.Consumer>
    );
  }
}

export default Synergy;
