import React from "react";
import "./Card.css";

function Card(props: ICard) {
  const { title, subTitle, children } = props;

  return (
    <div className={`card ${props.nopadding ? 'card--no-padding': ''}`}>
      {title && subTitle && (
        <div>
          <div className="flex">
            <div>
              <strong>{title}</strong>
            </div>
            <div className="card--sub-title">{subTitle}</div>
          </div>
          <hr />
          <br />
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
