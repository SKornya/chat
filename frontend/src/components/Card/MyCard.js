import React from 'react';

const MyCard = ({ logo, content, footer }) => (
  <div className="col-12 col-md-8 col-xxl-6">
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img className="rounded-circle" src={logo} alt="" />
        </div>
        {content}
      </div>
      {footer}
    </div>
  </div>
);

export default MyCard;
