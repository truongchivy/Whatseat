
import "./RatingCard.css";
import StarRatings from "react-star-ratings";
import RatingModal from "../../components/RatingModal/RatingModal"
import React from 'react';

const RatingCard = ({
  productReviewId,
  rating,
  createdOn,
  comment,
  product,
  customer,
  storeReply,
}) => {
  const photos = JSON.parse(product.photoJson);
  return (
    <div className="rating-card">
      <div className="rating-card-nav">
        <p>Người mua: {customer.name ? customer.name : "NhatHiepisme"}</p>
        <p>ID đơn hàng: {productReviewId}</p>
      </div>
      <div className="rating-info">
        <div className="product-info">
          <div className="img-box">
            <img src={photos[0][0].url} alt="whatseat" />
          </div>
          <h className="item-name">{product.name}</h>
        </div>
        <div className="rating-content">
          <div className="star-box">
            <StarRatings
              rating={rating}
              starRatedColor="brown"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
              starSpacing="3px"
            />
            <RatingModal
            comment = {comment}
            customer = {customer}
            createdOn = {createdOn}
          />
          </div>
          <div className="img-box"></div>
        </div>
        <div className="shop-reply">
          <p className="reply-content">{storeReply ? storeReply : "Cảm ơn vì đã nhận xét"}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
