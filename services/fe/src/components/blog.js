import React from "react";
import { Link } from "react-router-dom";

import { FiTag,FiChevronRight } from "../assets/icons/vander"
import { formatDataISO } from "../utils/util.js"

export default function Blog({ articoli = [] }){
    return(
            <div className="row">
                {articoli.slice( 0, 3 ).map(( item, index ) =>{
                    return(
                        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                            <div className="blog-post rounded shadow wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                {item.immagini && (
                                <img
                                   src={item.immagini[0].formats.small.url}
                                    className="img-fluid rounded-top"
                                    alt=""
                                />
                                )}                                
                                <div className="content pt-4 pb-4 p-3">
                                    <ul className="list-unstyled d-flex justify-content-between post-meta">
                                                {/* <li><FiUser className="fea icon-sm me-1"/><Link to="#" className="text-dark">{item.name}</Link></li>  */}
                                                <li>
                                                    {item.categories.map((categoria, i) => (
                                                        <Link to="" key={i} className="text-dark me-2">
                                                            <FiTag className="fea icon-sm me-1"/>
                                                            {categoria.name}
                                                        </Link>
                                                    ))}
                                                </li>                                            
                                            </ul>  
                                    <h5 className="mb-3"><Link to={`/page-blog-detail/${item.documentId}`} className="title text-dark">{item.titolo}</Link></h5> 
                                    <ul className="list-unstyled mb-0 pt-3 border-top d-flex justify-content-between">
                                        <li><Link to={`/page-blog-detail/${item.documentId}`} className="text-dark">Leggi di più<FiChevronRight className="fea icon-sm"/></Link></li>
                                        <li><i className="mdi mdi-calendar-edit me-1"></i>{formatDataISO(item.pubblicato_il)}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}