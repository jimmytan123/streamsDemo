import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { useParams, Link } from 'react-router-dom';

const StreamDelete = ({ fetchStream, deleteStream, stream }) => {
  // get the id params on the URL
  const { id } = useParams();

  // fetch single stream based on id
  useEffect(() => {
    fetchStream(id);
  }, [fetchStream, id]);

  // jsx stored in a function, to pass as a prop to Modal component
  const renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={() => deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  // to make sure when initial loads when stream state is not ready, still output content
  const renderContent = () => {
    if (!stream) {
      return 'Are you sure you want to delete this steam?';
    }

    return `Are you sure you want to delete the stream with title: ${stream.title}?`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
