import React from "react";
import { setUser, getUsers, authUser } from "../libs/storage";
import "../css/main.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      user_name: "",
      password: "",
      error: null,
      isLoginPage: false,
    };
  }
  async registerUser() {
    this.setState({ error: "" });
    const data = Object.freeze({
      email: this.state.email,
      user_name: this.state.user_name,
      password: this.state.password,
    });
    // Validation of input fields
    var users = JSON.parse(await getUsers());
    users = this.filterUser(users);
    if (users.length > 0) {
      this.setState({ error: "Email already exist." });
    } else if (
      data.email.length === 0 &&
      data.user_name.length === 0 &&
      data.password.length === 0
    ) {
      this.setState({ error: "Please fill the required fields." });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      this.setState({ error: "Please check your email." });
    } else if (data.password.length < 6) {
      this.setState({ error: "Password must be of minimum 6 letters." });
    } else {
      setUser(data);
      this.props.updateState("isAuthenticat", true);
    }
  }

  async loginUser() {
    var users = JSON.parse(await getUsers()),
      user = this.filterUser(users);
    if (user[0].password !== this.state.password) {
      this.setState({ error: "Password is incorrect." });
    } else if (this.state.email.length === 0) {
      this.setState({ error: "Email field is required." });
    } else if (user.length === 0) {
      this.setState({ error: "Email not exist." });
    } else {
      authUser(user[0]);
      this.props.updateState("isAuthenticat", true);
    }
  }

  filterUser(users) {
    return users.filter((user) => {
      user = user.email.toLowerCase();
      return user.indexOf(this.state.email) > -1;
    });
  }

  toggleRegisterationPage = () => {
    this.setState({ isLoginPage: !this.state.isLoginPage, error: "" });
  };
  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="login">
        <p className="login-heading ">
          {this.state.isLoginPage ? "Login" : "Sign Up"}
        </p>

        <input
          type="email"
          name="email"
          placeholder="EMAIL ID*"
          value={this.state.email}
          onChange={this.handleOnChange}
        />
        {this.state.isLoginPage ? null : (
          <input
            type="text"
            name="user_name"
            value={this.state.user_name}
            placeholder="USER NAME*"
            onChange={this.handleOnChange}
          />
        )}
        <input
          type="text"
          name="password"
          value={this.state.password}
          placeholder="PASSWORD*"
          onChange={this.handleOnChange}
        />
        <p className="error-msg">{this.state.error}</p>

        {/* if isloginpage is true then show login page */}
        {this.state.isLoginPage ? (
          <>
            <button onClick={() => this.loginUser()} className="login-btn">
              Login
            </button>
            <p className="link" onClick={this.toggleRegisterationPage}>
              Sign up
            </p>
          </>
        ) : (
          <>
            <button onClick={() => this.registerUser()} className="login-btn">
              Sign up
            </button>
            <p className="link" onClick={this.toggleRegisterationPage}>
              Login
            </p>
          </>
        )}
      </div>
    );
  }
}

export default Login;
