import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages.jpg'

import Navbar from "../components/navbar";
import Portfolio from "../components/portfolio";
import Cta from "../components/cta";
import Client from "../components/client";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

export default function PagePortfolio(){
    return(
        <>
        <Navbar navClass="navbar-nav navbar-nav-link mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon" navDark={ true }/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center' }}>
            <div className="bg-overlay bg-overlay-white"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title"> Projects & Works </h4>
                            <ul className="page-next bg-light d-inline-block py-2 px-4 mt-3 rounded mb-0">
                                <li><Link to="/index" className="text-dark">Cristino</Link></li>
                                <li>
                                    <span className="text-primary"> Portfolio</span> 
                                </li> 
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <Portfolio/>
            </div>
            
            <div class="container mt-100 mt-60 mb-60">
                <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <div class="section-title">
                            <div class="position-relative">
                                <h4 class="title text-uppercase mb-4">Clients say</h4>
                                <div>
                                    <div class="title-box"></div>
                                    <div class="title-line"></div>
                                </div>
                            </div>
                            <p class="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <Client/>
            </div>
            
            <Cta/>
            
            <div class="container mt-100 mt-60">
                <Contact/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}