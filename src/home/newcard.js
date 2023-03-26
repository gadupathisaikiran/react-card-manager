import React, { useEffect, useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/es/styles-compiled.css';
import { history } from '_helpers';
import Confetti from 'react-confetti'
export default function Newcard() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      });
    
      const [toggle,settoggle]=useState(false)

      const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        
        setState((prev) => ({ ...prev, [name]: value }));
      }
    
      const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
      }




      useEffect(()=>{
   
        if(sessionStorage.getItem("token")==undefined){
        
            history.navigate('/');
        }
        },[])
    

async function add(){

    let data={
        name: state.name,
        cardExpiration:state.expiry,
        cardHolder: state.name,
        cardNumber: state.number,
        category: "VISA"
      }


      let config={
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": " Bearer "+sessionStorage.getItem("token")

        },
        body: JSON.stringify(data)
    }


    await fetch(`${baseUrl}/cards`,config,data).then((res)=>res.json()).then(res=>{if(res.name){alert(`card successfully created with name of ${res.name} `)}})

       
     setTimeout(() => {
        history.navigate('/home');
        
     }, 3500);
    
     
     settoggle(true)

}




  return (
    <div id='PaymentForm'>

{
  toggle&&<Confetti recycle={false}/>
}
    
    <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />

      <form>
        <input style={{width:"350px",marginBottom:"10px"}}
          type="text"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          maxLength={16}
          required></input><br/>
        <input style={{width:"350px",marginBottom:"10px"}}
        type="text"
        name="name"
        placeholder="name"
        value={state.name}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        maxLength={15}
        required></input><br/>

      <input style={{width:"350px",marginBottom:"10px"}}
      type="text"
      name="expiry"
      placeholder="expiry"
      value={state.expiry}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      maxLength={4}
      required ></input><br/>
    <input style={{width:"350px",marginBottom:"10px"}}
      type="text"
      name="cvc"
      placeholder="cvv"
      value={state.cvc}
      onChange={handleInputChange}

      onFocus={handleInputFocus} 
      maxLength={3}
      required></input><br/>
       
      </form>

      <button onClick={()=>{add()}}  style={{}}>ADD</button>
    
    </div>
  )
}
