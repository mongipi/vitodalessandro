import React from "react";
import { Link } from "react-router-dom";
import bg from '../assets/images/hireme.jpg'

import { FiChevronDown } from '../assets/icons/vander'

export default function Cta({containerClass}){
    return(
        <div className={containerClass}>
            <div className="rounded-pill py-5" style={{backgroundImage:`url(${bg})` , backgroundPosition:'center'}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                            <h4 className="text-light title-dark">I Am Available For Freelancer Projects.</h4>
                            <p className="text-white-50 mx-auto mt-4 para-desc">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                            <div className="mt-4">
                                <Link to="#contact" className="btn btn-primary mouse-down">Hire me <FiChevronDown className="fea icon-sm"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}