// import React from 'react';
// import Banner  from "./components/Banner"
// import Frienddata  from './components/Frienddata';
// const App = () => {

//   let friensslist=[
//     { fid :1,
//       fname :"araman",
//       fdate: new Date(2002,1,21)
//     },
//     { fid :2,
//       fname :"priyank",
//       fdate: new Date(2002,11,21)
//     },
//     { fid :3,
//       fname :"samir",
//       fdate: new Date(2002,8,21)
//     },
//     { fid :4,
//       fname :"bhargav",
//       fdate: new Date(2002,5,21)
//     }
//   ];
//   return (
//       <div>
//                                                                                       {/* <h1> Araman Virani</h1> */}
//                                                                                 {/* <div> first component with arrow function</div> */}x`
//                                                                                {/* <Comp pname="Araman"/> */}
//                                                                                {/* <Comp pname="bhargav"/>  */}
//                                                                                 {/* <Comp pname="samir"/> */}
//                                                                                 {/* <Title  tname="Vishal" /> */}
//   <Banner />
//   <Frienddata date={friensslist[0].fdate} name={friensslist[0].fname}  mob={friensslist[0].fid} />
//   <Frienddata date={friensslist[1].fdate} name={friensslist[1].fname}  mob={friensslist[1].fid} />
//   <Frienddata date={friensslist[2].fdate} name={friensslist[2].fname}  mob={friensslist[2].fid} />
//   <Frienddata date={friensslist[3].fdate} name={friensslist[3].fname}  mob={friensslist[3].fid} />

//     </div>
//   )
// };

// // functional component
//   const Comp = (props) => {
//       return <h4> my name is  .....      { props.pname}</h4>
//  }

//  // class componenet

//  class Title extends React.Component{
//      render(){
//          return <h1>  this is my first class component { this.props.tname}</h1>
//         }
//      }
// export default App;

import React, { useState,useEffect } from "react";
import Banner from "./components/Title/Banner";
import Frienddata from "./components/Friends/Frienddata";
import Addnewfriend from "./components/Friends/Addnewfriend";
import "./App.css";
import EditFriend from "./components/Friends/EditFriend";

let DummyfriendsList = [
  
];

const App = () => {
  const [friends, setFriends] = useState(DummyfriendsList);
  const [eid,setEditid]=useState('');
  const [ename,setEditname]=useState('');
  const [emobile,setEditmobile]=useState('');
  const [edate,setEditdate]=useState('');

  let fetchdata=()=>{
    
  fetch("http://localhost/phpexre/list.php").then(
    responce=>{
      return responce.json();
    }).then(
      data=>{
        // console.log(data);
        setFriends(data)
      }
    )
}
  useEffect(()=>{
    fetchdata()
  },  );
  

  // const savefriendsdatahandler=(enteredfriendsdata)=>{
  //   console.log(enteredfriendsdata);
  // }
  const addfriendhandler = (friend) => {
    // const updatedfriend = [friend,...friends];
    // setFriends(updatedfriend);
    fetch("http://localhost/phpexre/insert.php    ",{
      method:"POST",
      body:JSON.stringify(friend),
      headers:{
        "content-type":"application/json"
      }
    }).then(
      responce=>{
        fetchdata();
      }
    )
  };

  const getEditFriendDataHandler=(editFrienddata) =>{
    setEditid(editFrienddata.id);
    setEditname(editFrienddata.name);
    setEditmobile(editFrienddata.mobile);
    setEditdate(editFrienddata.date);
  }
  const updateFriendsHandler=(friend)=>{

    fetch("http://localhost/phpexre/update.php?id=" +Number(friend.id),{
    method:"PUT",// for edit opration
    body:JSON.stringify(friend),
    headers:{
      "content-type":"application/json"
    }
    
  }).then(
    responce=>{
      fetchdata();
      setEditid(0);
    }
  )
};
  return (
    <div>
      <Banner />
      <Addnewfriend onSavefriendsdata={addfriendhandler} />
      <div className="friends">
        {friends.map((friend) => (
          <Frienddata
            key={friend.id}
            id={friend.id}
            name={friend.name}
            mobile={friend.mobile}
            date={new Date(friend.date)}
            onEditFriendaData={getEditFriendDataHandler}
          />
        ))}
      </div>
      <div>
        {eid ? <EditFriend id={eid} name={ename} mobile={emobile}
        date={new Date(edate)}
        onUpdateFriendsData={updateFriendsHandler} /> :null}
      </div>
    </div>
  );
};

export default App;
