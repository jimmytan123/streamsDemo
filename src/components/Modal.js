import React from 'react';
import ReactDOM from 'react-dom';

// React Protal
// need to go to index.html to create a div with id modal
// first argu: JSX, second argu: reference to the html element
const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="ui dimmer modals visiable active">
      <div
        onClick={(e) => e.stopPropagation()} //prevent event to bubble up and cause go to homepage
        className="ui standard modal visiable active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
