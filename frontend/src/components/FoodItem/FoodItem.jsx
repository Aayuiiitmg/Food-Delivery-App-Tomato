import React,{useContext} from 'react'
import './FoodItem.css'
import {assets, food_list} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodItem = ({id,name,price,description,image}) => {    
    const {cartItems,setCartItems,addToCart,removeFromCart,url} = React.useContext(StoreContext);
    
    let imgSrc = url + "/images/" + image;
    if (image && image.startsWith("http")) {
      imgSrc = image; // Cloudinary or external URL
    } else {
      // For Vercel, serve default images directly from Vite bundle to avoid missing uploads/ folder
      const defaultFood = food_list.find(item => item.name === name);
      if (defaultFood) {
        imgSrc = defaultFood.image;
      }
    }

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={imgSrc} alt="" />
        </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />{
                !cartItems[id]? <img className='add' onClick={()=>{addToCart(id)}} src={assets.add_icon_white} alt=""></img>: <div className="food-item-counter">
                <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
} 

export default FoodItem
