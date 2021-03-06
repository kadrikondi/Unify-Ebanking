import React, { Component } from "react";
import "./Signin.css";
import "../../asset/css/loader.css";

import { Link } from "react-router-dom";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      info: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isLoading: true });
    fetch("/loginn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.message + `  token ${res.token}`);

        this.setState({ isLoading: false });
        this.setState({ info: res.message });
      
        if (res.message === "Login successful") {
          window.localStorage.setItem("userId", res.id);
          window.localStorage.setItem('phone', res.phone)
          window.localStorage.setItem('email', res.email)
          window.localStorage.setItem("token", JSON.stringify(res.token));

          this.props.history.push("/userconfirm");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });

    //console.log(this.state)
  };

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          {/* <!-- Page Preloder --> */}
          <div id="preloderr">
            <div className="loaderr" />
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* /login */}

        {/* <!-- Material form login --> */}
        <div className="card mt-5" id="signin">
          <h3 className="card-header  dark-text text-center py-4">
            <strong className="mdi mdi-account-key">Sign-in</strong>
          </h3>

          {/* <!--Card content--> */}
          <div className="card-body px-lg-5 pt-0">
            {/* <!-- Form --> */}
            <div className="text-center" style={{ color: "#757575" }}>
              {/* <!-- Email --> */}
              <div className="input-group mt-5">
                <label htmlFor="">Email:</label>
                <input
                  type="text"
                  id="acct"
                  className="form-control"
                  //value={this.state.acct_no}
                  placeholder="Enter Your Email"
                  onChange={this.handleEmail}
                />
              </div>

              {/* <!-- Password --> */}
              <div className="input-group mt-3">
                <label htmlFor="">Password:&nbsp;</label>
                <input
                  type="password"
                  id="materialLoginFormPassword"
                  placeholder="Enter Password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
              </div>
              {this.state.info === "" || this.state.info === undefined ? (
                <p className="alert alert-warning" style={{ display: "none" }}>
                  {this.state.info}
                </p>
              ) : (
                <p className="alert alert-danger">{this.state.info}</p>
              )}

              {/* <!-- Sign in button --> */}
              {/* <Link to="cdash"> */}
              <button
                id="loginbtn"
                className="site-btn sb-gradients btn-block waves-effect z-depth-0 mt-5 "
                type="submit"
                onClick={this.handleSubmit}
              >
                {" "}
                Sign in
              </button>
              {/* </Link> */}
              {/* <!-- Register --> */}

              <p className="">
                {" "}
                <br />
                Not having account? &nbsp;<Link to="/signup"> Register</Link>
              </p>
            </div>
            {/* <!-- Form --> */}
          </div>
        </div>
        {/* <!-- Material form login --> */}
      </div>
    );
  }
}

export default Signin;
