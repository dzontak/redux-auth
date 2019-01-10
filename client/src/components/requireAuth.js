// a higer order component
import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    isAuthorized() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }
    componentDidMount() {
      this.isAuthorized();
    }
    componentDidUpdate() {
      this.isAuthorized();
    }
    render() {
      // {...this.props}  pass all properties through to the child component
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
