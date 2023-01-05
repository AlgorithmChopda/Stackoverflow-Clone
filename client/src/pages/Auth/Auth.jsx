import {React, useState}  from 'react'
import './Auth.css'
import icon from '../../assests/icon.png'
import AboutAuth from './AboutAuth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup, login } from '../../actions/auth'
import 'moment'
import moment from 'moment'
const Auth = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [isSignup, setIsSignup] = useState(false)
  const [dob, setDOB] = useState(null)

  // isSignup = true : Signup Page
  // isSignup = false : Login Page
  // setIsSign = is a function which sets the value of isSignup as specified
  //             in the parameter

  
  const handleSwitch = () => {
      setIsSignup(!isSignup);    
  }
  
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const handleSubmit = (e) => {
       e.preventDefault()

        if(!email || !password)
            alert('Enter email and password')
        
       if(isSignup){
            if(!name) // if name is null if condition defaulty checks for if object is "not-null"
                alert("Enter a Name to continue");
            else{
                var age = moment().diff(moment(dob, 'yyyy-mm-dd'), 'years');
                if(age >= 100 || age <= 1){
                    alert("please select a valid Date of Birth");
                }
                else{
                    /*if(age == 0){
                        alert("please select a valid Date of Birth ");

                        /*var year = dob.split("-")[0];
                        var month = dob.split("-")[1];
                        var day = dob.split("-")[2];

                        const curr = new Date();

                        if(year > curr.getFullYear())
                            alert("please select a valid Date of Birth ");
                        else{
                            if(month > curr.getMonth() + 1)
                                alert("please select a valid Date of Birth");
                            else{
                                if(day > curr.getDate())
                                    alert("please select a valid Date of Birth");
                                else{
                                    //dispatch(signup({ name, email, password, dob }, navigate))
                                }
                            }   
                        }
                        
                        
                    }*/

                    dispatch(signup({ name, email, password, dob }, navigate))        
                }
            }
       }
       else
            dispatch(login({ email, password }, navigate))
  }

  return (

    <section className='auth-section'>
        { isSignup && ( <AboutAuth /> )}
        <div className='auth-container-2'>
          {
              !isSignup && <img src={icon} alt='stack overflow' className='login-logo' />
          } 
              <form onSubmit = {handleSubmit} >
                    {
                        isSignup && ( 
                        <label htmlFor='name'>
                            <h4> Name : </h4>
                            <input type="text" id ='name' name ='name' onChange={(e) => {setName(e.target.value)}} required/>
                        </label>
                            
                        ) 
                    }  

                    {
                        isSignup && ( 
                        <label htmlFor='name'>
                            <h4> Date of Birth : </h4>
                            <input type="date" id ='date' name ='date' onChange={(e) => {setDOB(e.target.value)}}  required/>
                        </label>
                            
                        ) 
                    }  
                        
                        
                        
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}} required></input>
                    </label>
                    

                    <label htmlFor="password">
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                              <h4>Password</h4>
                              { !isSignup && <p style={{ color: "#007ac6", fontSize:'13px'}} > <h4>Forgot Password</h4>  </p> /* if login page give forgot password */ }  
                        </div>
                        <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}} required></input>
                        { isSignup && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> }

                    </label>
                    
{

                        isSignup && (
                            <label htmlFor='check'>
                                <input type="checkbox" id='check' />
                                <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br />product updates, user research invitations,<br />company announcements, and digests.</p>
                            </label>
                        )
                    }



                    <button type='submit' className='auth-btn'> 
                        { isSignup ? 'Signup' : 'Login' }         
                    </button>

                    {
                        isSignup && (
                            <p style={{ color: "#666767", fontSize:"13px"}}>
                                By clicking “Sign up”, you agree to our 
                                <span style={{ color: "#007ac6"}}> terms of<br /> service</span>,
                                <span style={{ color: "#007ac6"}}> privacy policy</span> and 
                                <span style={{ color: "#007ac6"}}> cookie policy</span>
                            </p>
                        )
                    }

              </form>

              <p>  
                  { isSignup ? 'Already have an Account ?' : 'Don\'t have an Account'   }     
                  <button type='button' className='handle-switch-btn' onClick = {handleSwitch} > 
                      { isSignup ? 'Login' : 'Signup' }
                  </button>
              </p>          
                        
        </div>
    </section>
  )
}

export default Auth
