import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ScrollTop(){
    let [ scroll, setScroll ] = useState(false)

    useEffect(()=>{
        const addScroll = () =>{
            window.scrollY > 300 ? setScroll(true) : setScroll(false)
        }
        window.addEventListener('scroll', addScroll )
        
        return()=>{
            window.removeEventListener('scroll', addScroll )
        }
    },[])
    
    const topScroll = () =>{
        window.scroll({ top:'0', behavior:'smooth'})
        
    }
    return(
        <Link to="#"  className="back-to-top rounded text-center" id="back-to-top" onClick={()=> topScroll()} style={{display: scroll ? 'block' : 'none'}}> 
            <i className="mdi mdi-chevron-up d-block"> </i> 
        </Link>
    )
}