import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import "./RatingModal.css";
const RatingModal = ({  comment, customer, createdOn }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <>
        <Button
          type="secondary"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          Chi tiết người mua
        </Button>
        <Modal
          title="Người mua"
          visible={isModalVisible}
          onOk={() => {
            setIsModalVisible(false);
          }}
          onCancel={() => {
            setIsModalVisible(false);
          }}
        >
          <div className="wrapModal">
            <div className="divOne">
              <img height={50} width={50} href={customer.AvatarUrl} />
              <p>{customer.name}</p>
              <p>ID : {customer.idCard}</p>
            </div>
            <div className="divTwo">
              <div className="email">Email : {customer.email}</div>
              <div className="comment">Nhận xét : {comment}</div>
              <div className="date">Ngày nhận xét : {createdOn}</div> 
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default RatingModal;
