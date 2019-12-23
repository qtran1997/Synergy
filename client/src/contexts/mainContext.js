import React, { createContext, Component } from "react";

export const MainScreenContext = createContext();

class MainScreenProvider extends Component {
  constructor(props) {
    super(props);

    this.changeMainScreen = this.changeMainScreen.bind(this);
    this.changeNotepad = this.changeNotepad.bind(this);
    this.changeBoard = this.changeBoard.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }
  state = {
    chat: {
      open: false
    },
    display: {
      board: null,
      notepad: null,
      screen: null
    },
    mainmenu: {
      open: false
    }
  };

  changeMainScreen(screen) {
    this.setState({
      display: {
        ...this.state.display,
        screen
      }
    });
  }

  changeNotepad(notepadId) {
    this.setState({
      display: {
        ...this.state.display,
        notepad: notepadId
      }
    });
  }

  changeBoard(boardId) {
    this.setState({
      display: {
        ...this.state.display,
        board: boardId
      }
    });
  }

  toggleChat() {
    this.setState({
      chat: {
        open: !this.state.chat.open
      }
    });
  }

  toggleMainMenu() {
    this.setState({
      mainmenu: {
        open: !this.state.mainmenu.open
      }
    });
  }

  render() {
    return (
      <MainScreenContext.Provider
        value={{
          ...this.state,
          changeMainScreen: this.changeMainScreen,
          changeNotepad: this.changeNotepad,
          changeBoard: this.changeBoard,
          toggleChat: this.toggleChat,
          toggleMainMenu: this.toggleMainMenu
        }}
      >
        {this.props.children}
      </MainScreenContext.Provider>
    );
  }
}

export default MainScreenProvider;
