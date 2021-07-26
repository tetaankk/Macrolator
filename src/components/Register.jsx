import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
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

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    console.log(user);
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        <h3 style={{ fontSize: "20px" }}>Luo käyttäjä</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Sähköpostiosoite: </label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="Sähköposti..."
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
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
            <label>Vahvista salasana: </label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="Salasana uudelleen..."
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Luo käyttäjä"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
