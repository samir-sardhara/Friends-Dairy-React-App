import React , {useState} from 'react'
import "./Addnewfriend.css";
const Addnewfriend = (props) => {
    
   const [enetredname , setEntredname]= useState("")
   const [entermobile,setEnteredmobile]=useState("")
   const [enterdate,setEnterdate]=useState("")
const namechangehandler = (event) =>{
  setEntredname(event.target.value)
}
const mobilechangehandler =(event)=>{
       setEnteredmobile(event.target.value)
}
const datechangehandler =(event)=>{
      setEnterdate(event.target.value)
}
const submithandler =(event) =>{
  event.preventDefault();// it will preventdefault refressing  of page
   const frienddate ={
     name:enetredname,
     mobile:entermobile,
     date:new Date(enterdate)
   }
   props.onSavefriendsdata(frienddate)
  //  console.log(frienddate)
   setEnterdate("")
   setEnteredmobile("")
   setEntredname("")
}
  return (
    <div className='new-friend'>
      <form onSubmit={submithandler}>
        <div className='new-friend__controls'>
         <div className='new-friend__controls'>
           <label htmlFor="" > Name</label>
           <input type="text" value={enetredname} onChange={namechangehandler}  required/>
         </div>
         
         <div className='new-friend__controls'>
           <label htmlFor=""> Mobile</label>
           <input type="text" value={entermobile} onChange={mobilechangehandler} required />
         </div>
         <div className='new-friend__controls'>
           <label htmlFor=""> Date</label>
           <input type="date" value={enterdate}  onChange={datechangehandler} required/>
         </div>

        </div>
        <div className='new-friend__actions '> 
        <button type='submit'>Add Friend </button>
        </div>
      </form>

    </div>
  )
}

export default Addnewfriend