import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import img from "./b1.png"
import stylemywishlist from "./mywishlist.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Carousal from '../../common/carousal'
import Pagination from '../../pagination'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  Axios  from 'axios';
import { IP_ADDRESS } from '../../ip';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius:"6px",
  boxShadow: 24,
  p: 4,
};
const MyWishlist = () => {
  const [data,setdata]=useState([])
  const [msg,setmsg]=useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nav=useNavigate()
  const handlecart=(e)=>{
    console.log(e.target)
    let qtyval=e.target.parentElement.childNodes[0].childNodes[1].value;
    let arr=data.filter((data,index)=>{
      if(data.product_list[0].product_id==e.target.id){

        if(localStorage.getItem('Cart')){  array = JSON.parse(localStorage.getItem('Cart')) } else {
          var array = []; }
          data.product_list[0].qty=qtyval;
console.log(data.product_list[0])

        array.push(data.product_list[0])
        console.log(array)
        let uniqueArr = array.filter((obj, index, self) =>
  index === self.findIndex((o) => o.product_id === obj.product_id)
);
console.log(data,uniqueArr,"arr")

          localStorage.setItem('Cart',JSON.stringify(uniqueArr));
          handleOpen()
          setmsg('Product Cart Added Successfully !')
          setTimeout(()=>{
            handleClose()
            setmsg('')
          },1000)
      }
    })

  }
 const handlecategory=(e)=>{
  fetch(`${IP_ADDRESS}api/getproduct/${e.target.id}`,{
    cache: "no-store",
   
}).then((res)=>{
    return res.json()
}).then((res)=>{
 

  nav("/cateogry",{state:{id:"1",data:res.data}})
  window.location.reload()
})
 }
  const handledetails=(e)=>{
    fetch(`${IP_ADDRESS}api/getProductDetailOneData/${e.target.id}/`,{
      cache: "no-store",
     
  }).then((res)=>{
      return res.json()
  }).then((res)=>{


       nav('/details',{state:{id:"1",data:res.data}})
  }).catch((err)=>{
      console.log(err,"err")
  })
 
  }
  const handleSub=(e)=>{
    if(!e.target.id){
      console.log("not found")
    }else{
      let ele=document.getElementById(e.target.id).parentElement;

      let val=ele.childNodes[1].value;
      if(val>1){
     
        ele.childNodes[1].value=parseInt(val)-1;
      }
     
    }

  }
  const handleAdd=(e)=>{

    if(!e.target.id){
      console.log("not found")
    }else{
      let ele=document.getElementById(e.target.id).parentElement;
      let val=ele.childNodes[1].value;
      ele.childNodes[1].value=parseInt(val)+1;
    }

   
  }
  const handlewishlist=(e)=>{
    let accessToken=localStorage.getItem('prodymeApiToken')
    let wishlistData=data.filter((data,index)=>{
      if(data.product_id===e){
        return data;
      }
    });
    let newobj={
      product_list:wishlistData
    }
    let config={
        headers: { Authorization: `Token ${accessToken}` }
    }
    Axios.post(`${IP_ADDRESS}wishlist/`,newobj,config).then((res)=>{
      handleOpen()
      setmsg(res.data.message)
      setTimeout(()=>{
        handleClose()
        setmsg('')
      },2000)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    let accessToken=localStorage.getItem('prodymeApiToken')
    Axios
      .get(`${IP_ADDRESS}getwishlist/`,{
          headers: { Authorization: `Token ${accessToken}` }
      })
      .then((response) => {
        setdata(response.data.wishlist)
      })
      .catch((error) => console.log(error));
  },[])
  return (
    <>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
         {msg}
          </Typography>
       
        </Box>
      </Modal>
    <div {...stylemywishlist}>
        <section  style={{marginTop:"100px",backgroundImage:`url(${img})`,height:"300px",display:"flex",justifyContent:"center",alignItems:"center"}}>
           
           <h1 style={{color:"whitesmoke"}}>
            <NavLink to='/' style={{color:"whitesmoke",textDecoration:"none"}}>Home</NavLink>\MyWishlist
           </h1>
        
        </section>
        <div className='main-child text-center'>
      <h1 className='main-child-h3'>MyWishlist</h1>
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
        <section className='myorder-main-second mb-mywishlist'>
            {data.map((item,index)=>(
  
  <div className="cardc" key={index} id={item.product_list[0].product_id}>
  <div style={{width:"100%",textAlign:"end"}}>
  <FavoriteBorderIcon sx={{color:"#ff7a34",margin:"10px",fontSize:"30px",cursor:"pointer"}} onClick={()=>handlewishlist(`${item.product_list[0].product_id}`)} />
  </div>
 <img src={item.product_list[0].productImage} alt="Avatar" style={{width:"100%",height:"250px" }}  onClick={(e)=>handledetails(e)} id={item.product_list[0].product_id}/>
 <div className="containerc" id={item.product_list[0].product_id}>
   <h4 style={{height:"50px"}}><b className='h3-font text-overflow'  id={item.product_list[0].product_id} onClick={(e)=>handledetails(e)} >{item.product_list[0].productName}</b></h4> 
   <aside className="_rating mb10" id={item.product_list[0].product_id}>
   {Math.round(item.product_list[0].ratingProduct)===1 &&
   <>
            <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
   </>
   }
   {Math.round(item.product_list[0].ratingProduct)===2 &&
   <>
    <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
   </>
   }
   {Math.round(item.product_list[0].ratingProduct)===3 &&
   <>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
   </>
   }
  {
    Math.round(item.product_list[0].ratingProduct)===4 &&
    <>
<StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
<StarOutlineIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
    </>
  }
  {Math.round(item.product_list[0].ratingProduct)===5 &&
  <>
 <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  <StarIcon sx={{color:"#ff7a34",fontSize:"30px"}}  id={item.product_list[0].product_id}/>
  </>
  }
   </aside>
   <hr/>
   <article className="_price dFlex alignItemsCenter" id={item.product_list[0].product_id}>
     <strong className="fs28 h3-font" id={item.product_list[0].product_id}>₹ {item.product_list[0].price}</strong>
     {/* <b className="fs16 pl10 h3-font" id={item.product_list[0].product_id}>per box</b> */}
   </article>
   
   <footer className="_comparator ">
   <div className='qty-details' style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
<div className='qty-add-sub' >
<div className='addicon' id={item.product_list[0].product_id+"sub"+index} onClick={(e)=>handleSub(e)}>-</div>
<input type="text" value={1} className='box-value'/>
<div className='addicon' id={item.product_list[0].product_id+"add"+index} onClick={(e)=>handleAdd(e)}>+</div>
</div>
<input type="checkbox" className='box-value' style={{marginLeft:"26px"}} id={item.product_list[0].product_id} onClick={(e)=>handlecart(e)}/><h5 className='h3-font' >Add To Cart</h5>
</div>
   </footer>
 </div>
</div>
            ))}


<div>

</div>
        </section>
        </div>
        </div>
    </div>
    </>
  )
}

export default MyWishlist