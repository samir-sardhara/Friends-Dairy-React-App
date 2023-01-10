import React , {useEffect, useState} from 'react'
import "./EditFriend.css";
const EditFriend= (props) => {
    
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

const month=props.date.toLocaleString('en-US',{month:'long'});
const year=props.date.getFullYear();
const day=props.date.toLocaleString('en-Us',{day: '2-digit'});
let mydate='';

if(year)
{
    mydate='Date:'+day +' '+month+' '+year;
}

let getdata=()=>{
    fetch("http://localhost/phpexre/getFriendById.php?id=" +Number(props.id))
    .then((response) =>{
      return response.json();
    })
    .then((data) =>{
     setEntredname(data.name);
     setEnteredmobile(data.mobile);
     setEnterdate(data.date);
    });
};

useEffect(() =>{
    getdata();
}, [props.id]);


const submithandler =(event) =>{
  event.preventDefault();// it will preventdefault refressing  of page
  // alert(enterdate);
   const frienddate ={
       id:props.id,
     name:enetredname,
     mobile:entermobile,
     date:new Date(enterdate)
   }
   props.onUpdateFriendsData(frienddate)
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
           <input type="text" value={enetredname} onChange={namechangehandler} autoFocus required/>
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
        <button type='submit'>Edit Friend </button>
        </div>
      </form>

    </div>
  )
}

export default EditFriend