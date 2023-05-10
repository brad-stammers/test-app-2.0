import React from "react"
import PropTypes from "prop-types"
import { Button, Form } from "semantic-ui-react"

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.createUser(this.state);
    this.setState({ first_name: "", last_name: "", email: "", password: ""});
  };
  createUser = (userInfo) => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({ user: userInfo })
    })
    .then((resp) => { return resp.json })
    .then((data) => {
      if (data.error) {
        const key = Object.keys(data.error);
        const errorMsg = data.error[key][0];
        alert(errorMsg);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.jwt);
        window.history.pushStatus(data.user, "", "/competitions");
        window.location.replace("/competitions");
      }
    })
  };
  render () {
    return (
      <React.Fragment>
				<Form onSubmit={this.handleSubmit}>
          <div className="field">
          <label>First Name</label>
          <div className="eight wide field">
            <div className="ui fluid input"> 
              <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} placeholder="First Name" />
            </div>
          </div>
          </div>
          <div className="field">
          <label>Last Name</label>
          <div className="eight wide field">
            <div className="ui fluid input">
              <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name" />
              </div>
          </div>
          </div>
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
					   <Button type="submit" className="ui green small button">Sign Up</Button>
          </div>
				</Form>
      </React.Fragment>
    );
  }
}

export default Signup
