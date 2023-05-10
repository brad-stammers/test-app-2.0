import React from "react"
import PropTypes from "prop-types"
import { Button, Form } from "semantic-ui-react"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  fetchCurrentUser = () => {
    return fetch("http://localhost:3000/logged_in", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      }
    })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      if (!data.logged_in) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        window.history.pushState(data.user, "", "/competitions");
        window.location.replace("/competitions");
      }
    })
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.loginUser(this.state);
    this.setState({ email: "", password: ""});
  };
  loginUser = (userInfo) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({ session: userInfo })
    })
    .then((resp) => { return resp.json(); })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.jwt);
        window.history.pushState(data.user, "", "/competitions");
        window.location.replace("/competitions");
      }
    });
  };
  logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token && user) {
        this.fetchCurrentUser();
    }
  }
  render () {
    return (
      <React.Fragment>
				<Form onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Email Address</label>
            <div className="eight wide field">
              <div className="ui fluid input">
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Address" />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="eight wide field">
              <div className="ui fluid input">
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </div>
            </div>
          </div>
          <div>
					   <Button className="ui green small button" type="submit">Log In</Button>
          </div>
				</Form>
      </React.Fragment>
    );
  }
}

export default Login
