import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = ({ handleSubmit, onSubmit }) => {
  // call back function for form submit handling
  const onFormSubmit = (formValues) => {
    //console.log(formValues);
    onSubmit(formValues);
  };

  return (
    <form
      className="ui form error"
      onSubmit={handleSubmit(onFormSubmit)} //handleSubmit in redux-form, pass it as a prop
    >
      <Field
        name="title"
        component={renderInput}
        type="text"
        label="Enter Title"
      />
      <Field
        name="description"
        component={renderInput}
        type="text"
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

//You must define the stateless function outside of your render() method, or else it will be recreated on every render and will force the Field to rerender because its component prop will be different. If you are defining your stateless function inside of render(), it will not only be slower, but your input will lose focus whenever the entire form component rerenders.

// The validate function is a special function that Redux Form expects us to pass to the component
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    // only run if the title is empty
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({ input, label, meta }) => {
  // conditional class name
  // console.log(meta);
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

  // set of properties
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

export default reduxForm({
  // a unique name for the form
  form: 'streamForm',
  validate: validate,
})(StreamForm);
