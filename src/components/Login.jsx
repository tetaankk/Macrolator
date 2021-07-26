import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
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

    axios.post("http://localhost:5000/auth", user).then((res) => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(localStorage.getItem("currentUser"));
      window.location = "/history";
    });

    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <h3 style={{ "font-size": "20px" }}>Kirjaudu sisään</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Sähköpostiosoite: </label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="Sähköpostiosoite..."
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Salasana: </label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="Salasana..."
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Kirjaudu sisään"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
