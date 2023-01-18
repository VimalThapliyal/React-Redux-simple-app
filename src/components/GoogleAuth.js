import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

function GoogleAuth(props) {
  const [authObj, setAuthObj] = useState(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "xxxxx", // generate your own google auth key
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();

          setAuthObj(auth);
          onAuthChange(auth.isSignedIn.get(), auth);

          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn, auth) => {
    if (isSignedIn) {
      props.signIn(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      );
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    authObj.signIn();
  };
  const onSignOutClick = () => {
    authObj.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={onSignOutClick}>
          <i className="google icon"></i> Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={onSignInClick}>
          <i className="google icon"></i> Sign In with google
        </button>
      );
    }
  };
  return <div>{renderAuthButton()}</div>;
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
