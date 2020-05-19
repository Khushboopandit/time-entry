import React from "react";
import "../css/main.css";
import Login from "./login";
import TimeEntry from "./time_entry";
import { checkUser } from "../libs/storage";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticat: false,
    };
  }
  // is user login?
  async componentDidMount() {
    var user = JSON.parse(await checkUser());
    if (user.isLogin) {
      this.setState({ isAuthenticat: true });
    }
  }

  // update state
  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <div className="Main">
        {this.state.isAuthenticat ? (
          <header className="Main-header">
            <TimeEntry updateState={this.updateState} />
          </header>
        ) : (
          <header className="Main-header flex justify-center">
            <Login updateState={this.updateState} />
          </header>
        )}
      </div>
    );
  }
}

export default Main;
