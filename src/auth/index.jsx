import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser } from '../action/signin'
import { signupUser } from '../action/signup'
import "./auth.css"
const Auth = () => {
   const [isHidden,setIsHidden]=useState(false)
   const [signup,setSignUp]=useState({
    email:"",
    name:"",
    password:""
   })
   const [signin,setSignIn]=useState({
    email:"",
    password:""
   })
   const dispatch = useDispatch();
   const list = useSelector((state) => state);
   console.log(list,"list")
   const handlesignup=(e)=>{
    const newdata={...signup};
    newdata[e.target.id]=e.target.value;
    setSignUp(newdata)
    console.log(signup)
   }
   const handlesignin=(e)=>{
    const newdata={...signin};
    newdata[e.target.id]=e.target.value;
    setSignIn(newdata)
    console.log(signin)
   }
 
  return (
<>
<section className="topBarActions dFlex alignItemsCenter positionRelative">
      
            <transition name="auth-fade">
          
                <aside className="positionAbsolute authWidget">
                  <section className="sign-in whiteBg positionRelative" style={{paddingTop:"10px",paddingBottom:"0px"}}>
                 {isHidden ? 
                 <article>
                        <h3 className="heading textCenter">{list.userSignUp.list.message}</h3>

                        <h4 className="heading textCenter">Sign Up</h4>
                        <section className="inputFeed">
                          <label>Enter Name: </label>
                          <br/>
                          <input
                            type="text"
                            className='ant-input'
                            placeholder="Name"
                            id="name"
                            value={signup.name}
                            onChange={(e)=>handlesignup(e)}
                          />
                        </section>
                        <section className="inputFeed">
                          <label>Enter Email/Mobile Number: </label>
                          <br/>
                          <input
                            type="email"
                            className='ant-input'
                            placeholder="Email"
                            id="email"
                            value={signup.email}
                            onChange={(e)=>handlesignup(e)}
                          ></input>
                        </section>
                        <section className="inputFeed">
                          <label>Enter Password: </label>
                          <br/>
                          <input
                            type="password"
                            className='ant-input'
                            placeholder="Password"
                            id="password"
                            value={signup.password}
                            onChange={(e)=>handlesignup(e)}
                          ></input>
                        </section>
                        <button className="ctaBtn" onClick={()=>dispatch(signupUser(signup))}>
                          Create Account
                        </button>
                        <footer className="altCta dFlex" style={{justifyContent:"flex-start",alignItems:"center"}}>
                          <p>Existing user ?</p>
                          <a
                            className="txtBtn"
                            onClick={()=>setIsHidden(!isHidden)}
                          >
                            Sign in
                          </a>
                        </footer>
                      </article>:
                       <article>
                          <h3 className="heading textCenter">{list.userSignIn.list.message}</h3>
                       <h4 className="heading textCenter">Sign In</h4>
                       
                       <section className="inputFeed">
                         <label>Enter Email/Mobile Number: </label>
                         <br/>
                         <input
                           type="text"
                           className='ant-input'
                           placeholder="Email/Mobile Number"
                           id="email"
                           value={signin.email}
                          onChange={(e)=>handlesignin(e)}
                         ></input>
                       </section>
                       <section className="inputFeed">
                         <label>Enter Password: </label>
                         <br/>
                         <input
                           type="password"
                           className='ant-input'
                           placeholder="Password"
                           id="password"
                           value={signin.password}
                           onChange={(e)=>handlesignin(e)}
                         ></input>
                       </section>
                       <section className="inputFeed"       style={{textAlign:"center",width:"100%"}}>
                       <a
                           className="txtBtn" 
                     
                          
                         >
                        Forgot password
                         </a>
                         </section>
                       <button className="ctaBtn" onClick={()=>dispatch(signInUser(signin))}>
                         Login
                       </button>
                       <footer className="altCta dFlex" style={{justifyContent:"flex-start",alignItems:"center"}}>
                         <p>New user ?</p>
                         <a
                           className="txtBtn"
                           onClick={()=>setIsHidden(!isHidden)}
                          
                         >
                           Create Account
                         </a>
                       </footer>
                     </article> }
                     
                 
                  </section>
                  </aside>
                 
                  </transition>
                  </section>
</>
  )
}

export default Auth