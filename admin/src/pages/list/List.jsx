import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function List({url}) {
 
  const [list, setList] = useState([]);
const removeFood=async(foodId)=>{
   const responce=await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList();
   if(responce.data.success){
    toast.success(responce.data.message);
   }else{
    toast.error(responce.data.message);
   }

}
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <p className="list-title">🍽️ All Foods List</p>
      <div className="list-table">
        <div className="list-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price (₹)</span>
          <span>Action</span>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-row">
            <img src={`${url}/images/${item.image}`} alt="food" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button onClick={()=>{
                removeFood(item._id);
            }} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
 