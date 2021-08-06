import React, { Component } from "react";
import axios from "axios";
import "../../common.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/auth", user)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        window.location = "/history";
      })
      .catch((err) => this.setState({ message: err }));

    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <h3 style={{ fontSize: "20px" }}>Kirjaudu sisään</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-field">
            {this.state.message && <h2>{this.state.message}</h2>}
            <label>Sähköpostiosoite </label>
            <input
              type="email"
              required
              placeholder="Sähköpostiosoite..."
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-field">
            <label>Salasana </label>
            <input
              type="password"
              required
              placeholder="Salasana..."
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-field">
            <input type="submit" value="Kirjaudu sisään" />
          </div>
        </form>
      </div>
    );
  }
}
