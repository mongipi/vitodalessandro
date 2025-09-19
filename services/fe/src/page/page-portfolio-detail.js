import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages.jpg'
import portfolio1 from '../assets/images/portfolio/1.jpg'
import portfolio2 from '../assets/images/portfolio/2.jpg'
import portfolio3 from '../assets/images/portfolio/3.jpg'

import Navbar from "../components/navbar";
import Contact from "../components/contact";
import Footer from "../components/footer";

import ScrollTop from "../components/scrollTop";
import Blog from "../components/blog";

export default function PortfolioDetail(){
    return(
        <>
        <Navbar navClass="navbar-nav navbar-nav-link mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon" navDark={ true }/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-overlay-white"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title"> Project Name </h4>
                            <ul className="page-next bg-light d-inline-block py-2 px-4 mt-3 ms-0 rounded mb-0">
                                <li><Link to="/" className="text-dark">Cristino</Link></li>
                                <li><Link to="/page-portfolio" className="text-dark">Portfolio</Link></li> 
                                <li>
                                    <span className="text-primary"> Portfolio Detail</span> 
                                </li> 
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-6 order-2 order-md-1 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="row me-lg-4">
                            <div className="col-lg-12">
                                <div className="work-details">
                                    <h4 className="title mb-3 border-bottom pb-3">Project Name :</h4>
                                    <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit totam atque dignissimos porro, exercitationem, neque alias ea aliquid quibusdam voluptates impedit maxime aut asperiores consequatur iste. Corporis fuga ducimus dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci non dolorem consequatur vitae hic.</p>
                                    <p className="text-muted mb-0">Suscipit totam atque dignissimos porro, exercitationem, neque alias ea aliquid quibusdam voluptates impedit maxime aut asperiores consequatur iste. Corporis fuga ducimus dignissimos.</p>
                                </div>
                            </div>
                            
                            <div className="col-lg-7 mt-4 pt-2">
                                <div className="work-details bg-light p-4">
                                    <h4 className="title border-bottom pb-3 mb-3">Project Info :</h4>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mt-3 ms-0">
                                            <b>Client :</b>
                                            <span>Alita Margarate</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Category :</b>
                                            <span>Web Design</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Subject :</b>
                                            <span>Web Design</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Date :</b>
                                            <span>28th April, 2020</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Website :</b>
                                            <span>www.yourdomain.com</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Location :</b>
                                            <span>3/2/64 Mongus Street, UK</span>
                                        </li>
                                        <li className="mt-3 ms-0">
                                            <b>Demo :</b>
                                            <span><Link to="https://1.envato.market/cristino-react" target="_blank" className="text-primary">Demo link</Link></span>
                                        </li>
                                    </ul>                          
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-6 order-1 order-md-2">
                        <div className="port-images sticky-sidebar">
                            <img src={portfolio1} className="img-fluid mx-auto d-block rounded" alt=""/>
                            <img src={portfolio2} className="img-fluid mx-auto d-block rounded mt-4" alt=""/>
                            <img src={portfolio3} className="img-fluid mx-auto d-block rounded mt-4" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-2">
                    <div className="col-12">                                
                        <ul className="pagination justify-content-center mb-0 list-unstyled">
                            <li><Link to="#" className="px-3 py-2"> <i className="mdi mdi-chevron-left"></i> Prev</Link></li>
                            <li><Link to="/page-portfolio" className="px-3 py-2"><i className="mdi mdi-home"></i> Home</Link></li>
                            <li><Link to="#" className="px-3 py-2">Next <i className="mdi mdi-chevron-right"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title">
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
            
            <div className="container mt-100 mt-60">
                <Contact/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}