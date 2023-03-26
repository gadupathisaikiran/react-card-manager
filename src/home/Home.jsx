import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userActions } from '_store';
import { history } from '_helpers';




export { Home };

function Home() {
    const dispatch = useDispatch();
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    // const { user: authUser } = useSelector(x => x.auth);
    // const { users } = useSelector(x => x.users);
      const [users,setusers]=useState()
      const [name,setname]=useState("")


   



useEffect(()=>{
   
    setname(sessionStorage.getItem("username"))
if(sessionStorage.getItem("token")==undefined){

    history.navigate('/');
}
},[])


    return (
        <div className='home-container'>
           <h1>Hi {name}!!</h1>
            <p>"You're logged in with server Api !!"</p>
          
            
            <a href='/cards/new' ><button className="newcard-button" >NEW CARD</button></a>
           <a href='/cards'><button className='viewcard-button'>VIEW CARDS</button></a> 
        </div>
    );
}
