import React from "react";
import { Link } from "react-router-dom";

import { FiTag,FiChevronRight } from "../assets/icons/vander"
import { formatDataISO } from "../utils/util.js"
import StrapiImage from "./StrapiMedia.jsx";
import { EmptyState } from "./UIElements.jsx";

/**
 * Componente Blog Card List
 * Visualizza una lista di articoli come cards
 * @param {Array} articoli - Array di articoli da visualizzare
 * @param {number} limit - Numero massimo di articoli da mostrare
 */
export default function Blog({ articoli = [], limit = 3 }){
    // Protezione contro dati non validi
    const articoliSicuri = Array.isArray(articoli) ? articoli : [];

    if (articoliSicuri.length === 0) {
        return <EmptyState message="Nessun articolo disponibile" icon="📝" />;
    }

    const articoliLimitati = articoliSicuri.slice(0, limit);

    return(
        <div className="row">
            {articoliLimitati.map(( item ) =>{
                return(
                    <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={item.documentId}>
                        <div className="blog-post rounded shadow wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                            {item.immagini && (
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                              <StrapiImage
                              src={
                                item.immagini[0].formats?.small?.url ||
                                item.immagini[0].formats?.thumbnail?.url ||
                                item.immagini[0].url
                                }
                                className="img-fluid rounded-top"
                                alt={item.titolo}
                            />
                             </div>
                            )}                                
                            <div className="content pt-4 pb-4 p-3">
                                <ul className="list-unstyled d-flex justify-content-between post-meta">
                                            <li>
                                                {item.categories && item.categories.map((categoria, i) => (
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