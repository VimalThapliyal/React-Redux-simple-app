import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const actions = (
    <>
      <button
        className="ui button negative"
        onClick={() => props.deleteStream(props.match.params.id)}
      >
        Delete
      </button>
      <button className="ui button " onClick={() => history.push("/")}>
        Cancel
      </button>
    </>
  );
  const renderContent = () => {
    if (!props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title: ${props.stream.title}?`;
  };
  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
