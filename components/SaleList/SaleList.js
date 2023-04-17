import React from 'react'
import "./SaleList.css";
const SaleList = ({
  productId,
  name,
  totalSell,

}) => {
  return(
    <div className="rating-card">
      <div className="rating-info">
        <div className="product-info">
          <p className="id">{productId}</p>
        </div>
        <div className="rating-content">
          <p className="item-name">{name}</p>
        </div>
        <div className="sale">
          <p className="reply-content">{totalSell}</p>
        </div>
      </div>
    </div>
  );
};

  export default SaleList;


