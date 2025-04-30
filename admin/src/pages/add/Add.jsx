import React from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

function Add({url}) {
   
    const[image,setImage]=useState(false);
    const[data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"

    })
    const handler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData({
    ...data,
    [name]:value
})
    }
    const onSubmit=async (event)=>{
event.preventDefault();
// Kyun FormData hi use karte hain?
// Agar sirf text fields hote (name, price, etc.) to JSON.stringify() se kaam chal jaata.

// But jab image ya file send karni ho, to sirf FormData hi kaam karta hai. JSON mein file send nahi ho sakti.
const formdata=new FormData();
formdata.append("name",data.name);
formdata.append("description",data.description);
formdata.append("price",Number(data.price));
formdata.append("category",data.category);
formdata.append("image",image);
const responnse= await axios.post(`${url}/api/food/add`,formdata);
if(responnse.data.success){
    console.log(`Succesfully added... ${responnse.data}`);
    setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    setImage(false); 
    toast.success(responnse.data.message);
}else{
    console.log(`Failed to add... ${responnse.data}`);
    toast.error("Something went wrong!");

}
    }
   
  return (
    <div className='add'>
      <form className='add-form' onSubmit={onSubmit}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image" className="upload-area">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload Area" />
          </label>
          <input onChange={(e)=>{
            setImage(e.target.files[0]);

          }} type="file" id="image" name='image' hidden required />
        </div>

        <div className="add-product-name">
          <p>Product Name</p>
          <input onChange={handler} name='name' value={data.name} type="text" placeholder="Enter product name" required />
        </div>

        <div className="add-product-description">
          <p>Product Description</p>
          <textarea onChange={handler} value={data.description} name="description" rows="6" placeholder="Write content here..." required></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category">
            <p>Product Category</p>
            <select onChange={handler} name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price">
            <p>Product Price (₹)</p>
            <input  onChange={handler} value={data.price} type="number" name="price" placeholder="Enter price" required />
          </div>
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default Add;
