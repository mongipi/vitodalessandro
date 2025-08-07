import React from "react";
import { Link } from "react-router-dom";
import { contactData } from "../data/data";

export default function Contact(){
    return(
        <div className="row">
            {contactData.map(( item, index ) =>{
                let Icon = item.icon
                return(
                    <div className="col-md-6 mt-6 pt-2" key={index}>
                        <div className="contact-detail text-center wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                            <div className="icon">
                                <Icon className="fea icon-md"/>
                            </div>
                            <div className="content mt-4">
                                <h5 className="title text-uppercase">{item.title}</h5>
                                <p className="text-muted">{item.desc}</p>
                                <Link to={item.linkData} className="text-primary">{item.link}</Link>
                            </div>  
                        </div>
                    </div>
                )
            })}
        </div>
    )
}