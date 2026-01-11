import React from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';
const List = ({url}) => {
    
  const [list,setList]=React.useState([]);
  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error fetching list");
    }
  }

  const removeFood= async(foodId)=>{
   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList();
   if(response.data.success){
    toast.success("Food item removed successfully");
   }
   else{
    toast.error("Error removing food item");
   }
  }
  React.useEffect(()=>{
    fetchList();
  },[]);
  return (
    <div className='list add flex-col'>
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format data">
              <img src={`${url}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
