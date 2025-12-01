import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages-vitodalessandro.jpg'

import Navbar from "../components/navbar";
import Portfolio from "../components/portfolio";
import Cta from "../components/cta";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import FacebookFeed from "../components/FacebookFeed";

export default function PagePortfolio(){
    return(
        <>
        <Navbar 
            navClass="navbar-nav mx-auto" 
            socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"
        />
 
        <section 
            className="bg-half d-table w-100" 
            style={{
                backgroundImage:`url(${bg1})`, 
                backgroundPosition:'center'
            }}
        >
            <div className="bg-overlay bg-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title text-white">Le mie proposte</h4>
                        </div>
                    </div>
                </div>
            </div> 
        </section>

        <section className="section">
            <div className="container mb-60">

                <div className="row">
                    
                    {/* 🔸 COLONNA SINISTRA */}
                    <div className="col-12 col-lg-8">
                        <div className="row justify-content-center mb-5">
                            <div className="col-lg-12 text-center">
                                <p className="text-muted fs-6">
                                    Qui ho raccolto le proposte che ho costruito ascoltando i cittadini, 
                                    osservando da vicino le realtà del territorio e vivendo ogni giorno la 
                                    nostra comunità. Sono idee nate da problemi reali, ma anche da sogni, 
                                    desideri e possibilità che meritano di diventare realtà. Credo che 
                                    migliorare la città sia un percorso che si fa insieme, passo dopo passo.
                                </p>
                            </div>
                        </div>

                        <Portfolio/>
                    </div>

                    {/* 🔸 COLONNA DESTRA — FEED FACEBOOK */}
                    <div className="col-12 col-lg-4 mt-5 mt-lg-0">
                        <h5 className="mb-3">Ultimi aggiornamenti</h5>
                        <div style={{ position: "sticky", top: "120px" }}>
                            <FacebookFeed />
                        </div>
                    </div>

                </div>
            </div>
                        
            <Cta/>

            <div className="container mt-100 mt-60">
                <Contact/>
            </div>
        </section>

        <Footer/>
        <ScrollTop/>
        </>
    )
}
