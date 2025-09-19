import React from "react";
import { Link } from "react-router-dom";
import logoLight from '../assets/images/logo-dark.png'

export default function Footer(){
    return(
        <>
        <footer className="footer bg-dark">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                        <Link to="/"><p className="logo-text text-white">VITO D'ALESSANDRO</p></Link>
                            <p className="para-desc mx-auto mt-5">
                            Questo sito è ospitato su un server a basso impatto ambientale, alimentato da energia rinnovabile. Una scelta sostenibile per rispettare il pianeta.
                            </p>                        
                        <ul className="list-unstyled mb-0 mt-4 social-icon">
                            <li className="list-inline-item"><Link to="https://www.facebook.com/vitodalessandrobitonto/"><i className="mdi mdi-facebook"></i></Link></li>
                            <li className="list-inline-item"><Link to="https://www.instagram.com/vito_dalessandro_/#"><i className="mdi mdi-instagram"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <footer className="footer footer-bar bg-dark wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
            <div className="container text-foot text-center">
                <p className="mb-0">© {new Date().getFullYear()} Vito D'Alessandro - un cittadino in comune</p>
            </div>
        </footer>
        </>
    )
}