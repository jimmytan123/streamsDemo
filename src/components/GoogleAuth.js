import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // load google api for auth2
    window.gapi.load('client:auth2', () => {
      // initialize the Google API Library for authentication
      window.gapi.client
        .init({
          clientId:
            '478461733038-mf027pmmtokg0cco29oab6j44t1jog8h.apps.googleusercontent.com',
          scope: 'email', //ask for scope Email
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          //runs every time when auth changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()); //call action creator, pass in user id value from Google API Auth
    } else {
      this.props.signOut(); //call action creator
    }
  };

  onSignInClick = () => {
    // google api auth method
    this.auth.signIn();
  };

  onSignOutClick = () => {
    // google api auth method
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
