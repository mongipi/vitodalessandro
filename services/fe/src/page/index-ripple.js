import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as Link1 } from "react-scroll";

import bg1 from '../assets/images/home/02.jpg'
import hero from "../assets/images/home/hero.jpg"
import heroImg from '../assets/images/home/hero.jpg'
import heroImg2 from '../assets/images/hero.png'
import sign from '../assets/images/sign.png'
import counterBg from '../assets/images/bg-counter.jpg'
import ctaBg from '../assets/images/skills.jpg'
import testibg from '../assets/images/testi.jpg'

import Navbar from "../components/navbar";
import Portfolio from "../components/portfolio";
import Client from "../components/client";
import Blog from "../components/blog";
import Cta from "../components/cta";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import WOW from 'wowjs';
import '../../node_modules/wowjs/css/libs/animate.css'

import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

import Ripples from 'react-ripples'

import { FiDownload, FiStar, FiRefreshCw, } from '../assets/icons/vander'
import { counterData, hobbiesData, offerData, workTabData } from "../data/data";

export default function IndexRipple(){
    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>
        <Ripples during={5000} color="rgba(0, 0, 0, .3)" >
            <section className="bg-home d-table w-100" style={{backgroundImage:`url(${bg1})`}} id="home">
                <div className="bg-overlay"></div>
                <div className="container position-relative" style={{zIndex:'1'}}>
                    <div className="row mt-5 mt-sm-0 justify-content-center">
                        <div className="col-lg-12 text-center">
                            <div className="title-heading">
                                <img src={hero} className="img-fluid rounded-circle" alt=""/>
                                <h3 className="heading text-light title-dark mt-3">I Am <span className="typewrite text-primary" data-period="2000" data-type='[ "Web Designer", "Web Developer", "Photographer"]'></span></h3>
                                <p className="para-desc mx-auto text-white-50">Obviously I'm a Web Designer. Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects.</p>
                                <div className="mt-4">
                                    <Link to="#" className="btn btn-primary rounded">Download CV <FiDownload className="fea icon-sm"></FiDownload></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link1 to="about" data-scroll-nav="1" className="mouse-icon mouse-icon-white rounded-pill bg-transparent mouse-down">
                    <span className="wheel position-relative d-block mover"></span>
                </Link1>
            </section>
        </Ripples>
        
        </>
    )
}