import { Button, Input, Select, Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Ratingcard from "../../components/RatingCard/RatingCard";
import ShopSidebar from "../../components/ShopSidebar/ShopSidebar";
import "./ShopRating.css";
import { useRef } from "react";
import Categories from "../../components/Categories/Categories";


const { TabPane } = Tabs;
const { Search } = Input;

const mock_rating = [
  {
    order_ID: 1,
    username: "aot2510",
    item_name: "Gà Ta Bình Định Thả Vườn",
    item_img:
      "https://image.cooky.vn/posproduct/g0/6997/s/8f099d38-a334-4315-8be3-5c4a3ead7ee2.jpeg",
    stars: 4,
    rate_content: "Sản phẩm chất lượng tuyệt vời",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
  {
    order_ID: 2,
    username: "hiepsimattroi",
    item_name: "Thăn Lưng Bò Canada (Ribeye) Cắt Hotpot",
    item_img:
      "https://image.cooky.vn/posproduct/g0/15513/s400x400/66572bb6-d1ea-4221-a523-d33289117088.jpeg",
    stars: 5,
    rate_content:
      "Sản phẩm chất lượng tuyệt vời, lần sau mình sẽ ủng hộ shop tiếp ạ",
    rate_time: "25/10/2021",
    is_reply: true,
    reply:
      "Cảm ơn bạn đã ủng hộ shop ạ, chúc bạn nhiều sức khỏe và mua đồ của shop nhiều hơn nhaaa!",
  },
];

const ShopRating = () => {
  const [reviews, setReviews] = useState([]);
  const [tempReview, setTempReview ] = useState([]);
  const [categories, setCategories ] = useState([]);
  const location = useLocation();
  const storeId = location.state.storeId;

  const token = useSelector((state) => state.auth.userInfo.token);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  console.log(64,parseJwt(token));

  useEffect(() => {

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_PYTHON_API_KEY}/catenames`,
      headers: {
        'Content-Type':'application/json',
      }
    })
    .then((res) => {
      console.log(76,res.data);
      setCategories(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  },[])

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASP_API_KEY}/api/Store/product-reviews?PageNumber=1&PageSize=9000`,
    })
      .then((res) => {
        console.log(79, res.data)
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_PYTHON_API_KEY}/category`,
          headers: {
            'Content-Type':'application/json',
          }
        })
        .then((raw_categories) => {
          console.log(88, res.data)
          const temp_categories = raw_categories.data
          const temp_reviews = res.data
          console.log(90, res.data)
          
          for (let i = 0; i < temp_reviews.length; i++) {
            if (temp_reviews[i].product.productCategory == null)
            {
              const temp_productid = temp_reviews[i].product.productId + ''
              temp_reviews[i].product.productCategory = temp_categories[temp_productid]
            }
          }

          setReviews(temp_reviews)
          // setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
// jjjjjjjjj
        /*console.log(res.data);
        setReviews(res.data);*/
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tempReview]); 

  const ratingRef= useRef("");
  const foodRef= useRef("");
  const categoryRef= useRef("");


  function removeVietnameseTones(str) { 
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

  function handleSearch(){

    const foodValue = foodRef.current.value
    let categoryValue = categoryRef.current.value
    let ratingValue = ratingRef.current.value
    let reviews_after_filter = reviews
    if (ratingValue != "") { // check rating value to filter
        reviews_after_filter = reviews.filter((x)=>x.rating==ratingValue)
    }

    let foods_after_filter = reviews_after_filter

    if (foodValue != "") { // check food name to filter after filtered rating

        foods_after_filter = reviews_after_filter.filter((x)=>/*removeVietnameseTones*/(x.product.name.toLowerCase()).includes(/*removeVietnameseTones*/(foodValue.toLowerCase())))
        // kiem tra viet hoa, chuyen het sang ki tu thuong de so sang trong search
    }

    let category_after_filter = foods_after_filter 

    if (categoryValue != "") { // check category value to filter after filered food and rating
        
        category_after_filter = foods_after_filter.filter((x)=>x.product.productCategory==categoryValue)}
        

    setTempReview(category_after_filter)

  }

  //const average_all = (reviews.reduce((total, next) => total + next.rating, 0) / reviews.length).toFixed(1)
  //console.log(180,tempReview)
  //const average_filtered = (tempReview.reduce((total, next) => total + next.rating, 0) / tempReview.length).toFixed(1)

  function refreshSearch(){
    //const refresh_search = window.location.reload() //full page reload
    const refresh_search = foodRef.current.value = ratingRef.current.value = categoryRef.current.value = ""
    //reset thanh search ve cac ref sang ""
    setTempReview(refresh_search);

  }

  return (
    <div className="shop-rating">
      <div className="shop-rating-fluid">
        <div className="shop-rating-container">
          <ShopSidebar storeId={storeId} />
          <div className="content-container">
            <div className="shop-rating-nav">
              <div>
                <h1 className="title">Đánh Giá Shop</h1>
                <p className="note">Xem đánh giá shop của bạn</p>
                <input allowClear ref={foodRef} style={{width: '92%',}} className="searchInput" type="text" placeholder="Mời nhập tên sản phẩm" onChange={handleSearch}></input>
                &nbsp;
                <select style={{width: '36%',}} className="tabCategories" ref={categoryRef} onClick={handleSearch} >
                <option value="">Tất cả loại sản phẩm</option>
                {categories.map((x) => {
                return <option value={x.ProductCategoryId}>{x.Name}</option>
                })}
                </select>
                &nbsp;
                <select style={{width: '32%',}} className="tabRating" ref={ratingRef} onClick={handleSearch} id="rating" name="ratings">
                    <option value="">Tất cả</option>
                    <option value="1"> 1 star</option>
                    <option value="2"> 2 stars</option>
                    <option value="3"> 3 stars</option>
                    <option value="4"> 4 stars</option>
                    <option value="5"> 5 stars</option>
                </select>
                &nbsp;
                <button style={{width: '22%'}} onClick={refreshSearch}>Reset</button>
              </div>
              <p className="evarage-rating">

                <span>{(ratingRef.current.value == "" && foodRef.current.value == "" && categoryRef.current.value == "" )? ((reviews.reduce((total, next) => total + next.rating, 0) / reviews.length).toFixed(1))
                : (tempReview.length > 0)?  ((tempReview.reduce((total, next) => total + next.rating, 0) / tempReview.length).toFixed(1)) : ("")} </span> / 5
                {/*lay trung binh rating da duoc tinh a tren */}
              </p>
            </div>
            <br></br>
            {((reviews.length > 0) ?
(
  (ratingRef.current.value == "" && foodRef.current.value == "" && categoryRef.current.value == "" ? //xet dieu kien value cua cac ref de xuat ratingcard dung voi filter
  (
    <div className="rating-container">
        <div className="table-title">
          <p>Thông tin sản phẩm</p>
          <p>Đánh giá của người mua</p>
          <p>Trả lời đánh giá của bạn</p>
        </div>
        {reviews?.map((review, idx) => {
          return <Ratingcard key={idx} {...review} />;
        })}
  </div>)
  :(
    (tempReview.length > 0) ?

    (
     <div className="rating-container">
         <div className="table-title">
           <p>Thông tin sản phẩm</p>
           <p>Đánh giá của người mua</p>
           <p>Trả lời đánh giá của bạn</p>
         </div>
         {tempReview?.map((review, idx) => {//tempReview la review da duoc filter truoc o tren
           return <Ratingcard key={idx} {...review} />;
         })}
   </div>)
    : (
     <p>Đánh giá không tồn tại</p>
   )
  ))
)
:
(<p>Cửa hàng của bạn chưa có đánh giá nào</p>)
)}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopRating;
