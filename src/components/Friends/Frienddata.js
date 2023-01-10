// import React from 'react'
// import "./Friendsdata.css"
// const Frienddata = (props) => {
//   const month=props.date.toLocalString("en-US", {month:'long'})
//   const year=props.getFullYear();
//   const day= props.date.toLocalString("en-US",{day:"2_digit"})
//   return (
//     <div className='friends-item'>
//         <div className='friends-date'> 
//         <div className='friends-date_month'> {month}</div>
//         <div  className='friends-date_year'> {year}</div>
//         <div className='friends-date_day'>{day}</div>
//         </div>
//         <div className='friends-item__description'>
//             <h1>{ props.name}</h1>
//             <h2 className='friends-item__mobile'>{ props.mob }</h2>
          
//         </div> 
//     </div>
//   )
// }

// export default Frienddata

import React from 'react'
import './Friendsdata.css'

const FriendsData = (props) => {

    const month=props.date.toLocaleString('en-US',{month:'long'});
    const year=props.date.getFullYear();
    const day=props.date.toLocaleString('en-US',{day: '2-digit'});

    const deleteHandler=(id)=>{
      if(window.confirm("Are You Sure?"))
      {
        fetch("http://localhost/phpexre/delete.php?id= "+id,{
          method:"DELETE",
        
          headers:{
            "content-type":"application/json"
          },
         
      }).then(alert("ok...Record with id=" +id+" Deleted.."));
    }
      else{
        alert("Deletion cancelled");
      }
    
    }

    const editHandler=(id)=>{
      // http://localhost/phpexre/getFriendById.php?id=9
      fetch("http://localhost/phpexre/getFriendById.php?id=" +id)
      .then((response) =>{
        return response.json();
      })
      .then((data) =>{
        // alert(JSON.stringify(data));
        const friendsData={
          id:data.id,
          name:data.name,
          mobile:data.mobile,
          date:new Date(data.date),
        };
        props. onEditFriendaData(friendsData);
      });
     
    }

  return (
    <div className='friends-item'>
      <div className='friends-date'>
            <div className='friends-date__month'>{month}</div> 
            <div className='friends-date__year'>{year}</div>
              <div className='friends-date__day'>{day}</div> 
             </div> 
        <div className='friends-item__description'>
            <h2>{props.name}</h2>
            <div className='friends-item__mobile'>{props.mobile}
            </div> 
            
        </div>
        <div>
          <button className='friends_delete'  onClick={() =>deleteHandler(props.id)} >Delete</button>
        </div>

        <div>
          <input type="button" className='friends_edit' onClick={() =>editHandler(props.id)} value="Edit"></input>
        </div>
    </div>

  )
}

export default FriendsData