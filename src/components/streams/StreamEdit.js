import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import { useParams } from 'react-router-dom';
import StreamForm from './StreamForm';
import _ from 'lodash';

const StreamEdit = ({ fetchStream, editStream, stream }) => {
  // get the id params on the URL
  const { id } = useParams();

  // fetch single stream based on id
  useEffect(() => {
    fetchStream(id);
  }, [fetchStream, id]);

  const onSubmit = (formValues) => {
    //console.log(formValues);
    editStream(id, formValues);
  };

  return (
    <>
      {!stream ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>Edit a Stream</h3>
          {/* initialValues is the special prop of Redux Form */}
          <StreamForm
            onSubmit={onSubmit}
            initialValues={_.pick(stream, 'title', 'description')} //lodash method
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
