import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "actions";

class Signin extends Component {
  onSubmit = formProps => {
    // call the action component defind in .actons/index.js
    this.props.signin(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card">
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="email"
                  type="text"
                  component="input"
                  autoComplete="none"
                />
                <label for="email">Email</label>
                <span
                  class="helper-text"
                  data-error="wrong"
                  data-success="right"
                >
                  {this.props.errorMessage}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <Field
                  name="password"
                  type="password"
                  component="input"
                  autoComplete="none"
                />
                <label for="password">Password</label>
                <span
                  class="helper-text"
                  data-error="wrong"
                  data-success="right"
                >
                  {this.props.errorMessage}
                </span>
              </div>
            </div>
            <button className="btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
