import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as Link1 } from "react-scroll";

import logo from '../assets/images/logo_vito-dalessandro.png'
import logoLight from '../assets/images/logo-light.png'

import { FiMenu } from '../assets/icons/vander'
import { scroller } from "react-scroll";

    
export default function Navbar({navClass, socialClass, navDark}){
    let [ navSticky, setNavSticky ] = useState(false)
    let [ dropdown, setDropdown ] = useState(false)
    let [ toggleManu, setToggleManu] = useState(false)
    let [ manu, setManu] = useState('')

    let location = useLocation()
    let navigate = useNavigate()
      useEffect(()=>{
           let current = location.pathname
           setManu(current)
   
           const scrollHandlar = () =>{
               setNavSticky(window.scrollY > 50)
           }
           const closeDropdown = () =>{
               setDropdown(false)
           }
   
           window.scrollTo(0, 0);

        if (location.pathname === "/") {
            const sectionId = sessionStorage.getItem("scrollTo");
            if (sectionId) {
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100); // tempo per assicurarsi che il DOM sia pronto

            sessionStorage.removeItem("scrollTo");
            }
        }
   
          window.addEventListener('scroll',scrollHandlar)
          document.addEventListener('mousedown', closeDropdown)
          return()=>{
               window.removeEventListener('scroll',scrollHandlar)
               document.removeEventListener('mousedown', closeDropdown)
          }
       },[location.pathname])

    const handleClickLink = (sectionId) => (e) => {
    e.preventDefault();
        console.log(sectionId)
        if (location.pathname === "/") {
            scroller.scrollTo(sectionId, {
            duration: 500,
            smooth: true,
            offset: -50,
            });
        } else {
            sessionStorage.setItem("scrollTo", sectionId);
            navigate("/");
        }
        setToggleManu(false)        
    };

    return(
        <nav id="navbar" className={`${navSticky ? 'nav-sticky' : ''} navbar navbar-expand-lg fixed-top navbar-custom navbar-light sticky`}>
    		<div className="container">
                {navDark ? 
                    <Link className="navbar-brand" to="/">
                        <p className="logo-text l-light">VITO D'ALESSANDRO</p>
                        <p className="logo-text l-dark">VITO D'ALESSANDRO</p>
                    </Link> :
                    <Link className="navbar-brand" to="/">
                        <p className="logo-text l-dark">VITO D'ALESSANDRO</p>
                        <p className="logo-text l-light text-white">VITO D'ALESSANDRO</p>
                    </Link>
                }
                <button className="navbar-toggler" type="button" onClick={() =>setToggleManu(!toggleManu)}>
                    <FiMenu className="fea icon-md"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse" style={{display: toggleManu ?'block' : 'none'}}> 
                    <ul id="navbar-navlist" className={navClass}>
                        <li className="nav-item">
                            <Link1 className="nav-link" activeClass="active"  spy={true} smooth={true} duration={300} to={'home' || 'about'} onClick={handleClickLink("home")}>Home</Link1>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" activeClass="active"  spy={true} smooth={true} to="/page-blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link1 className="nav-link" activeClass="active"  spy={true} smooth={true} duration={300} to="chi-sono" onClick={handleClickLink("chi-sono")}>Chi sono</Link1>
                        </li>
                        <li className="nav-item">
                            <Link1 className="nav-link" activeClass="active"  spy={true} smooth={true} duration={300} to="contattami" onClick={handleClickLink("contattami")}>Contattami</Link1>
                        </li>
                    </ul>

                    <ul className={socialClass}>
                        <li className="list-inline-item"><Link to="https://www.facebook.com/vitodalessandrobitonto/"><i className="mdi mdi-facebook"></i></Link></li>
                        <li className="list-inline-item"><Link to="https://www.instagram.com/vito_dalessandro_/"><i className="mdi mdi-instagram"></i></Link></li>
                    </ul>
                </div> 
            </div>
		</nav>
    )
}