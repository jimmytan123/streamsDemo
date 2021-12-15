import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { useParams } from 'react-router-dom';

const StreamShow = ({ fetchStream, stream }) => {
  // get the id params on the URL
  const { id } = useParams();

  // fetch single stream based on id
  useEffect(() => {
    fetchStream(id);
  }, [fetchStream, id]);

  return (
    <>
      {!stream ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{stream.title}</h1>
          <h5>{stream.description}</h5>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
