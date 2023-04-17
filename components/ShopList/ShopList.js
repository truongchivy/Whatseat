import React from 'react'
import { Button, Input, Select, Tabs } from "antd";
import "./ShopList.css";
import { APIService } from '../../components/APIService/APIService'
import { Link } from "react-router-dom";

function ShopList(props) {

  const deleteStore = (store) => {
    APIService.DeleteStore(store.StoreId)
    .then(() => props.deleteStore(store))
  }

  return (
    <div>
      {props.stores && props.stores.map(store => {
          return(
            <div key={store.StoreId}>
              <br/>
              <div  className="detailcard">
                <h1 className="shopname">{store.ShopName}</h1>
                  <div className="detail">
                    <p className="phonenumber">Số điện thoại : {store.PhoneNumber}</p>
                    <p className="email">Email : {store.Email}</p>
                    <p className="address">Địa chỉ : {store.DistrictCode} {store.Address}, Phường {store.WardCode}, Quận {store.ProvinceCode} </p>
                  </div>
                  <div className="interactions">
                    <Button to="/shop/update">Update</Button>
                    &nbsp;
                    <Button onClick={()  => deleteStore(store)}> Delete </Button>
                  </div>
              <br/>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ShopList
