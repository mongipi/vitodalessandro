import React from "react";
import { Link } from "react-router-dom";

import { blogData } from "../data/data";

import { FiUser,FiTag,FiChevronRight } from "../assets/icons/vander"

export default function Blog(){
    return(
            <div className="row">
                {blogData.slice( 0, 3 ).map(( item, index ) =>{
                    return(
                        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                            <div className="blog-post rounded shadow wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                <img src={item.image} className="img-fluid rounded-top" alt=""/>
                                <div className="content pt-4 pb-4 p-3">
                                    <ul className="list-unstyled d-flex justify-content-between post-meta">
                                                <li><FiUser className="fea icon-sm me-1"/><Link to="#" className="text-dark">{item.name}</Link></li> 
                                                <li><FiTag className="fea icon-sm me-1"/><Link to="#" className="text-dark">{item.tag}</Link></li>                                    
                                            </ul>  
                                    <h5 className="mb-3"><Link to={`/page-blog-detail/${item.id}`} className="title text-dark">{item.title}</Link></h5> 
                                    <ul className="list-unstyled mb-0 pt-3 border-top d-flex justify-content-between">
                                        <li><Link to="#" className="text-dark">Read More<FiChevronRight className="fea icon-sm"/></Link></li>
                                        <li><i className="mdi mdi-calendar-edit me-1"></i>{item.date}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}