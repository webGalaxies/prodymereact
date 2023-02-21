import React from 'react'
import { NavLink } from 'react-router-dom'
import img from "./b1.png"
import  style from "./myorder.css"
const MyOrder = () => {
  return (
    <div {...style}>
     <section  style={{marginTop:"100px",backgroundImage:`url(${img})`,height:"300px",display:"flex",justifyContent:"center",alignItems:"center"}}>
           
           <h1 style={{color:"whitesmoke"}}>
            <NavLink to='/' style={{color:"whitesmoke",textDecoration:"none"}}>Home</NavLink>\MyOrder
           </h1>
        
        </section>
        <div className='main-child text-center'>
      <h1 className='main-child-h3'>MyOrder</h1>
     </div>
     <div className='continer-parent'>
     <div className='myorder-container'>
        <section className='myorder-main'>
            <div className='myorder-main-child'>
              <NavLink to='/' className="myorder-main-child-link">MY PROFILE</NavLink>
              <NavLink to='/' className="myorder-main-child-link">MY MESSAGES</NavLink>
              <NavLink to='/' className="myorder-main-child-link">MY ORDERS</NavLink>
              <NavLink to='/' className="myorder-main-child-link">MY DESIGNS</NavLink>
              <NavLink to='/' className="myorder-main-child-link">WISHLIST</NavLink>

               
            </div>
            <div className='myorder-main-child-first'>
<h1>Your Last Orders</h1>
            </div>
            <div className='myorder-main-child-second'>
<div className='myorder-main-child-second-search'><input type="text" placeholder='Search for tags or keywords' className='myorder-main-child-second-input'/><span className='icon-myorder-search'>&#9740;</span></div>
-OR-
<div >
<select  className='myorder-main-child-second-date'>
<option value="last 15 Days">Date Range</option>
    <option value="last 15 Days">Last 15 Days</option>
</select>
</div>
<div>
<button className='main-child-btn'>Apply</button>
</div>
            </div>
        </section>
        <section className='myorder-main-second'>
<table className='myorder-table'>
    <thead className='myorder-thead'>
        <tr>
            <td>Order Date</td>
            <td>Order No.</td>
            <td>
Estimated Delivery Date</td>
<td>Order Total</td>
<td>
Order Status</td>
<td colSpan="2">Remarks</td>
        </tr>
    </thead>
    <tbody className='myorder-tbody'>
        {[1,2,3,4,5,6,7,8,9,10].map((data,index)=>(
  <tr>
  <td>MM-DD-YY</td>
  <td><a className='href-link' href="#">xxxxxxxxxxx</a></td>
  <td>MM-DD-YY</td>
  <td>INR 100</td>
  <td><button className='myorder-tbody-btn' style={{background:`${data%2==0 ? "#ffd2c4":""}`}}>In Progress</button></td>
  <td>&#9993;</td>
  </tr>
        ))}
      
    </tbody>
</table>
        </section>
        </div>
        </div>
    
    </div>
  )
}

export default MyOrder