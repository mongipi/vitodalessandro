import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as Link1 } from "react-scroll";

import bg1 from '../assets/images/home/04.jpg'
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

import { FiDownload, FiStar, FiRefreshCw, } from '../assets/icons/vander'
import { counterData, hobbiesData, offerData, workTabData } from "../data/data";

export default function IndexAnimation(){
    let [ activeIndex, setActiveIndex ] = useState(1);
    
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
      }, [])
   
    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>
        <section className="bg-home" style={{backgroundImage:`url(${bg1})`}} id="home">
            <div className="bg-overlay"></div>
            <div className="container">
                <div className="row mt-5 mt-sm-0 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="title-heading wow animated fadeIn" data-wow-delay="0.5s">
                            <img src={heroImg} className="img-fluid rounded-circle" alt=""/>
                            <h1 className="heading text-primary mt-3">Cristino Murphy</h1>
                            <h6 className="sub-title text-light title-dark">I Am 
                                <TypeAnimation
                                    sequence={[
                                        'Web Designer',
                                        1000,
                                        'Web Developer',
                                        1000,
                                        'Photographer',
                                        1000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    className="typewrite text-primary ps-1"
                                    repeat={Infinity}
                                    />

                           </h6>
                            <div className="mt-4">
                                <Link to="#" className="btn btn-primary rounded">Download CV <FiDownload className="fea icon-sm"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link1 to="about" data-scroll-nav="1" className="mouse-icon mouse-icon-white rounded-pill bg-transparent mouse-down">
                <span className="wheel position-relative d-block mover"></span>
            </Link1>
        </section>

        <section className="section pb-3 overflow-hidden" id="about">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-5">
                        <div className="about-hero wow animated fadeInLeft" data-wow-delay="0.5s">
                            <img src={heroImg2} className="img-fluid mx-auto d-block about-tween position-relative" alt=""/>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="section-title mb-0 ms-lg-5 ms-md-3 wow animated fadeInRight" data-wow-delay="0.5s">
                            <h4 className="title text-primary mb-3">Cristino Murphy</h4>
                            <h6 className="designation mb-3">I'm a Passionate <span className="text-primary">Web Designer</span></h6>
                            <p className="text-muted">Obviously I'm a Web Designer. Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects. The as opposed to using 'Content here, content here', making it look like readable English.</p>
                            <p className="text-muted">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                            <img src={sign} height="22" alt=""/>
                            <div className="mt-4">
                                <Link1 to="projects" className="btn btn-primary mouse-down">View Portfolio</Link1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Hobbies & Interests</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    {hobbiesData.map((item, index) =>{
                        let Icon = item.icon
                        return(
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2" key={index}>
                                <div className="interests-desc bg-light position-relative px-2 py-3 rounded wow animated fadeInUp" data-wow-delay="0.5s">
                                    <div className="hobbies d-flex align-items-center">
                                        <div className="text-center rounded-pill me-4">
                                            <Icon className="icon fea icon-md-sm"/>
                                        </div>
                                        <div className="content">
                                            <h6 className="title mb-0">{item.title}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container-fluid mt-100 mt-60">
                <div className="rounded py-md-5 py-4" style={{backgroundImage:`url(${counterBg})`, backgroundPosition:'center'}}>
                    <div className="container">
                        <div className="row" id="counter">
                            {counterData.map((item, index) =>{
                                let Icon = item.icon
                                return(
                                    <div className="col-lg-3 col-6" key={index}>
                                        <div className="counter-box rounded py-3 text-center wow animated fadeInUp" data-wow-delay="0.5s">
                                            <div className="counter-icon">
                                                <Icon className="fea icon-md text-primary"/>
                                            </div>
                                            <h3 className="counter-value mt-3 text-white title-dark"><CountUp start={0} end={item.target} /></h3>
                                            <h6 className="counter-head font-weight-normal mb-0 text-white title-dark">{item.title}</h6>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section bg-light" id="services">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">What Do I Offer ?</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {offerData.map((item,index) =>{
                        let Icon = item.icon
                        return(
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <div className="service-wrapper rounded position-relative text-center border border-footer p-4 pt-5 pb-5 wow animated fadeInUp" data-wow-delay=".3s">
                                    <div className="icon text-primary">
                                        <Icon className="fea icon-md"/>
                                    </div>
                                    <div className="content mt-4">
                                        <h5 className="title">{item.title}</h5>
                                        <p className="text-muted mt-3 mb-0">{item.desc}</p>
                                    </div>
                                    <div className="big-icon">
                                        <Icon className="fea icons"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

        <section className="section" id="resume">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Work Participation</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="main-icon rounded-pill text-center mt-4 pt-2 wow animated fadeInUp" data-wow-delay="0.5s">
                            <FiStar className="fea icon-md-sm"/>
                        </div>
                        <div className="timeline-page pt-2 position-relative wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="timeline-item mt-4 wow animated fadeInUp" data-wow-delay="0.5s">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="duration date-label-left border rounded py-2 px-4 position-relative shadow text-start">2015 - 2018</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="event event-description-right rounded p-4 border float-left text-start">
                                            <h5 className="title mb-0 text-capitalize">UX Designer</h5>
                                            <small className="company">Vivo - Senior Designer</small>
                                            <p className="timeline-subtitle mt-3 mb-0 text-muted">The generated injected humour, or non-characteristic words etc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            <div className="timeline-item mt-4 wow animated fadeInUp" data-wow-delay="0.7s">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 order-sm-1 order-2">
                                        <div className="event event-description-left rounded p-4 border float-left text-end">
                                            <h5 className="title mb-0 text-capitalize">Web Developer</h5>
                                            <small className="company">Oppo - HR Manager</small>
                                            <p className="timeline-subtitle mt-3 mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia magna vel molestie faucibus. Donec auctor et urnaLorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 order-sm-2 order-1">
                                        <div className="duration duration-right rounded border py-2 px-4 position-relative shadow text-start">2012 - 2015</div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="timeline-item mt-4 wow animated fadeInUp" data-wow-delay="0.9s">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="duration date-label-left border rounded py-2 px-4 position-relative shadow text-start"> 2012 - 2010</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="event event-description-right rounded p-4 border float-left text-start">
                                            <h5 className="title mb-0 text-capitalize">Graphic Designer</h5>
                                            <small className="company">Apple - Testor</small>
                                            <p className="timeline-subtitle mt-3 mb-0 text-muted">Therefore always free from repetition, injected humour, or non-characteristic words etc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="cta-full border-top">
            <div className="container-fluid">
                <div className="row position-relative">
                    <div className="col-lg-4 padding-less img" style={{backgroundImage:`url(${ctaBg})`}}></div>
                    <div className="col-lg-8 offset-lg-4">
                        <div className="cta-full-img-box">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <div className="section-title wow animated fadeInUp">
                                        <div className="position-relative">
                                            <h4 className="title text-uppercase mb-4">Work Expertise</h4>
                                            <div>
                                                <div className="title-box"></div>
                                                <div className="title-line"></div>
                                            </div>
                                        </div>
                                        <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-4 col-12">
                                    <ul className="nav nav-pills flex-column px-0 wow animated fadeInUp" data-wow-delay="0.5s">
                                        <li className="nav-item mt-4 pt-2">
                                            <Link className={`${activeIndex === 1 ? 'active' : ''} nav-link rounded`} to="#" onClick={() =>setActiveIndex(1)}>
                                                <div className="skill-container text-center pt-1 pb-1">
                                                    <h6 className="title mb-0">UX Design</h6>
                                                </div>
                                            </Link>
                                        </li>
                                        
                                        <li className="nav-item mt-4 pt-2">
                                            <Link className={`${activeIndex === 2 ? 'active' : ''} nav-link rounded`} to="#" onClick={() =>setActiveIndex(2)}>
                                                <div className="skill-container text-center pt-1 pb-1">
                                                    <h6 className="title mb-0">Language Skill</h6>
                                                </div>
                                            </Link>
                                        </li>
                                        
                                        <li className="nav-item mt-4 pt-2">
                                            <Link className={`${activeIndex === 3 ? 'active' : ''} nav-link rounded`} to="#" onClick={() =>setActiveIndex(3)}>
                                                <div className="skill-container text-center pt-1 pb-1">
                                                    <h6 className="title mb-0">Web development</h6>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-lg-9 col-md-8 col-12">
                                    
                                    <div className="tab-content ps-lg-4 wow animated fadeInUp" data-wow-delay="0.5s">
                                        {activeIndex === 1 ?
                                            <div className="tab-pane fade show active">
                                                {workTabData.slice(0,3).map((item, index) =>{
                                                    return(
                                                        <div className="progress-box mt-4 pt-2" key={index}>
                                                            <h6 className="font-weight-normal">{item.title}</h6>
                                                            <div className="progress">
                                                                <div className="progress-bar position-relative bg-primary" style={{width:item.value}}>
                                                                    <div className="progress-value d-block text-dark h6">{item.value}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div> : ''
                                        }
                                        {activeIndex === 2 ? 
                                            <div className="tab-pane fade show active">
                                                {workTabData.slice(3,6).map((item, index) =>{
                                                    return(
                                                        <div className="progress-box mt-4 pt-2" key={index}>
                                                            <h6 className="font-weight-normal">{item.title}</h6>
                                                            <div className="progress">
                                                                <div className="progress-bar position-relative bg-primary" style={{width:item.value}}>
                                                                    <div className="progress-value d-block text-dark h6">{item.value}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div> : ''
                                        }
                                        {activeIndex === 3 ?
                                            <div className="tab-pane fade show active">
                                                {workTabData.slice(6, 8).map((item, index) =>{
                                                    return(
                                                        <div className="progress-box mt-4 pt-2" key={index}>
                                                            <h6 className="font-weight-normal">{item.title}</h6>
                                                            <div className="progress">
                                                                <div className="progress-bar position-relative bg-primary" style={{width:item.value}}>
                                                                    <div className="progress-value d-block text-dark h6">{item.value}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </section>

        <section className="section bg-light" id="projects">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">My Portfolio</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>
            </div>    
            
            <div className="container">                
                <Portfolio/>
                <div className="row">
                    <div className="col-lg-12 mt-4 pt-2">
                        <div className="text-center wow animated fadeInUp" data-wow-delay="1.7s">
                            <Link to="/page-portfolio" className="btn btn-outline-primary">More works <FiRefreshCw className="fea icon-sm"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="cta-full">
            <div className="container-fluid">
                <div className="row position-relative">
                    <div className="col-lg-8 order-2">
                        <div className="cta-full-img-box">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <div className="section-title wow animated fadeInUp">
                                        <div className="position-relative">
                                            <h4 className="title text-uppercase mb-4">Clients say</h4>
                                            <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                                        </div>
                                        <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                                    </div>
                                </div>
                            </div>
                            <Client/>
                        </div>
                    </div>    

                    <div className="col-lg-4 offset-lg-8 padding-less img order-1" style={{backgroundImage:`url(${testibg})`}} ></div>   
                </div>
            </div>
        </section>

        <section className="section bg-light pb-3" id="news">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Latest News & Blog</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <Blog/>
            </div>

            <Cta containerClass = "container-fluid mt-100 mt-60"/>
        </section>

        <section className="section pb-0" id="contact">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Contact Me</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <Contact/>
            </div>
        </section>

        <section className="section pt-5 mt-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="custom-form mb-sm-30 wow animated fadeInUp" data-wow-delay="1.1s">
                            <form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6">
                                                <div className="form-group">
                                                    <input name="name" id="name" type="text" className="form-control border rounded" placeholder="First Name :"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-6">
                                                <div className="form-group">
                                                    <input name="email" id="email" type="email" className="form-control border rounded" placeholder="Your email :"/>
                                                </div> 
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input name="subject" id="subject" className="form-control border rounded" placeholder="Your subject :"/>
                                                </div>                                                                               
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <textarea name="comments" id="comments" rows="4" className="form-control border rounded" placeholder="Your Message :"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 text-end">
                                        <button type="submit" id="submit" name="send" className="btn btn-primary">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}