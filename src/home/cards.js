import React from 'react'
import { useEffect, useState } from 'react';
import  {StyleSheet} from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/es/styles-compiled.css';
import { StackedCarousel } from 'react-stacked-carousel'
import 'react-stacked-carousel/dist/index.css';
import { history } from '_helpers';

import { Navigate } from 'react-router-dom';



export default function CardS() {

    const [cards,setcards]=useState()
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
   
    const onCardChange = (event) => {
      console.log("Card", event);
    }
    useEffect(() => {
      
        // dispatch(userActions.getAll());
        async function call() {
            let config={
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": " Bearer "+sessionStorage.getItem("token")

                }
            }

           

             await fetch(`${baseUrl}/cards?limit=100&page=1`,config).then((res)=>res.json()).then(res=>{setcards(res.results)})
        }

        call()

    },[]);

        
    

    useEffect(()=>{
   
    if(!sessionStorage.getItem("token")){
    
        history.navigate('/');
    }
   

 },[])


console.log(cards)
  return (
    <div>
   
    

    <h1>Saved cards</h1>

    <StackedCarousel style={{width:"800px"}}
    autoRotate={false}
    onCardChange={onCardChange}
    containerClassName={"container"}
    cardClassName="card"
    leftButton={<button>{"<"}</button>}
    rightButton={<button>{">"}</button>}
  >
  
   

    {
        cards?cards.map((data,i)=>{
            return(
                <div key={`child${i}`}>
                <Cards  number={data.cardNumber}
                expiry={data.cardExpiration}
                cvc={""}
                name={data.cardHolder}
                focused={""}  />
               
            </div>
            )
        })
    :''}





  </StackedCarousel>


  



    
    </div>
  )
}
