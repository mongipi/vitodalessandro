import React from "react";

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

import { clientData } from "../data/data";

export default function Client(){
    let setting = {
        container: '.client-review-slider',
        items: 1,
        controls: false,
        slideBy: "page",
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 16,
        responsive: {
            767: {
                items: 2
            }
        },
    }
    return(
        <div className="row">
            <div className="col-12">
                <div className="client-review-slider">
                    <TinySlider settings={setting}>
                        {clientData.map((item,index) =>{
                            return(
                                <div className="tiny-slide wow animate__animated animate__fadeInUp" data-wow-delay=".3s" key={index}>
                                    <div className="client-review rounded shadow m-2">
                                        <div className="review-star">
                                            <ul className="list-unstyled float-right mb-0">
                                                <li className="list-inline-item text-primary"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item text-primary"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item text-primary"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item text-primary"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item text-primary"><i className="mdi mdi-star"></i></li>
                                            </ul>

                                            <div className="review-base">
                                                <h6 className="title">{item.title}</h6>
                                            </div>
                                        </div>

                                        <p className="text-muted review-para font-italic mt-3 mb-3">{item.desc}</p>
                                        <div className="reviewer d-flex align-items-center">
                                            <img src={item.image} className="img-fluid rounded-circle avatar avatar-small me-3" alt=""/>
                                            <div className="content">
                                                <h5 className="name mb-0">{item.name}</h5>
                                                <small className="designation text-muted">{item.brand}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
            </div>
        </div>
    )
}