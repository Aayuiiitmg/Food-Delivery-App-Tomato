import React, { useEffect,createContext } from "react";
export const StoreContext = createContext(null);
import axios from "axios";
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=React.useState({});
    const url="http://localhost:4000";
    const [token,setToken]=React.useState("");
    const [food_list,setFoodList]=React.useState([]);
    const addToCart= async (itemId)=>{
     if(!cartItems[itemId]){
        setCartItems(prev=>({...prev,[itemId]:1}))
     }
     else{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
     }
     if(token){
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
     }
    }
    const removeFromCart= async (itemId)=>{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}))
            if(token){
                await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
            }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find(food=>food._id===item);
                totalAmount+=cartItems[item]*itemInfo.price;
            }
        }
        return totalAmount;
    }

    const fetchFoodList= async(token)=>{
        const response=await axios.get(url+"/api/food/list",{},{headers:{token}});
        setFoodList(response.data.data);
    }
   const loadCartData = async (token) => {
  try {
    const response = await axios.get(
      url + "/api/cart/get",
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData); 
    }
  } catch (error) {
    console.error("Load cart failed", error);
  }
};

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
              if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    },[]);
    const contextValue={
       food_list,
         cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;
