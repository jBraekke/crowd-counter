import React from 'react';
import "./Loading.css";

function Loading(props: { blue?: boolean }) {
  return (
    <div className="loading">
      <div className={`loading__bullet ${props.blue ? 'loading__bullet--blue' : ''}`}></div>
      <div className={`loading__bullet ${props.blue ? 'loading__bullet--blue' : ''}`}></div>
      <div className={`loading__bullet ${props.blue ? 'loading__bullet--blue' : ''}`}></div>
    </div>
  );
}

export default Loading;
