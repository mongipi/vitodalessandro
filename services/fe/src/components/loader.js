import React from "react";
import logo from '../assets/images/logo.png'
export default function Loader(){
    return(
        <div id="preloader">
            <div id="status">
                {/* <div>
                    <h2 className="logo-text">Vito D'Alessandro un cittadino in <span className="text-primary">COMUNE</span></h2>
                </div> */}
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </div>
    )
}