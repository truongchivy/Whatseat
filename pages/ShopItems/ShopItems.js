import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Items from "../../components/Items/Items";
import Footer from "../../components/Footer/Footer";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import AppContext from "../../context/AppContext";
import "./ShopItems.css";

const ShopItems = () => {
  const [listProducts, setListProducts] = useState([]);
  const [tempLists, setTempLists] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [categories, setCategories ] = useState([]);
  const location = useLocation();
  const { triggerReload } = useContext(AppContext);
  const storeId = location.state.storeId;

  useEffect(() => {

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_PYTHON_API_KEY}/catenames`,
      headers: {
        'Content-Type':'application/json',
      }
    })
    .then((res) => {
      console.log(29,res.data);
      setCategories(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  },[])

  const getShopProducts = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/${storeId}/products?PageSize=50`,
    })
      .then((res) => {
        const result = res.data;
        console.log(result);
        setListProducts(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getShopProducts();
  }, [pageNumber, triggerReload]);

  const foodRef= useRef("");
  const categoryRef= useRef("");

  function handleSearch(){
    
    const foodValue = foodRef.current.value
    let categoryValue = categoryRef.current.value
    let lists_after_filter = listProducts

    if (foodValue != "") { // check food name to filter after filtered rating

      lists_after_filter = listProducts.filter((x)=>/*removeVietnameseTones*/(x.name.toLowerCase()).includes(/*removeVietnameseTones*/(foodValue.toLowerCase())))
        // kiem tra viet hoa, chuyen het sang ki tu thuong de so sang trong search
    }

    let category_after_filter = lists_after_filter 

    if (categoryValue != "") { // check category value to filter after filered food and rating
        
        category_after_filter = lists_after_filter.filter((x)=>x.productCategoryId==categoryValue)}
        

      setTempLists(category_after_filter)

      console.log(61,category_after_filter)

  }

  return (
    <div className="shop-items">
      <div className="shop-items-fluid">
        <div className="shop-items-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <h1 className="title">Tất cả sản phẩm</h1>
            <input ref={foodRef} type="text" placeholder="Mời nhập tên sản phẩm" onChange={handleSearch}></input>
            &nbsp;
            <select className="tabSelect" ref={categoryRef} onClick={handleSearch} >
                <option value="">Tất cả</option>
                {categories.map((x) => {
                return <option value={x.ProductCategoryId}>{x.Name}</option>
                })}
                </select>

                {((listProducts.length > 0) ?
(
  (foodRef.current.value == "" && categoryRef.current.value == "" ? //xet dieu kien value cua cac ref de xuat ratingcard dung voi filter
  (
    <Items products={listProducts} storeId={storeId} />
  ):(
    (tempLists.length > 0) ?

    (
    <Items products={tempLists} storeId={storeId} />
   ): (
     <p>Sản phẩm không tồn tại</p>
   )
  ))
)
:
(<p>Cửa hàng của bạn chưa có sản phẩm nào</p>)
)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopItems;
