import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages-vitodalessandro.jpg'


import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {getArticoloById} from "../api/articoli.js"
import { formatDataISO } from "../utils/util.js"
import { RichText } from '@graphcms/rich-text-react-renderer';
import StrapiImage from "../components/StrapiMedia.jsx";

export default function BlogDetail(){
    let params = useParams();
    let id = params.id

  const [articolo, setArticolo] = useState({});

    useEffect(() => {
    getArticoloById(id)
        .then((res) =>{
            setArticolo(res.data)
        } )
        .catch((err) => console.error(err));
    }, [id]);

    const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url; // già assoluto
    return `${process.env.REACT_APP_STRAPI_API_URL}${url}`;
    };

    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>

        <section
        className="bg-half d-table w-100"
        style={{
            backgroundImage: articolo.immagini?.[0]?.url
            ? `url(${getImageUrl(articolo.immagini[0].url)})`
            : `url(${bg1})`,
            backgroundPosition: 'center'
        }}
        >           
         <div className="bg-overlay bg-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title text-white">{articolo.titolo}</h4>
                            <ul className="page-next bg-light d-inline-block py-2 px-4 mt-3 rounded mb-0">
                                <li className="text-dark"><i className="mdi mdi-calendar-edit me-1"></i><span className="text-muted">{formatDataISO(articolo.pubblicato_il)}</span> </li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div> 
        </section>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-4">
                        <div className="sticky-sidebar">
                            {
                                articolo.immagini?.[0]?.url && (
                                    articolo.immagini.map((immagine, index) => (
                                        <StrapiImage 
                                            key={immagine.id || index}
                                            src={immagine.url}
                                            className="img-fluid rounded d-block mt-4" 
                                            alt="" 
                                        />
                                    ))
                                )
                            }

                        </div>
                    </div>
                    <div className="col-lg-7 col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="blog position-relative overflow-hidden shadow rounded">
                            <div className="content p-4">
                                {articolo.categories?.map((item,index) =>{ 
                                    return(
                                        <h6 className="font-weight-normal"><i className="mdi mdi-tag text-primary me-1"></i><Link to="#" className="text-primary">{item.name}</Link></h6>
                                )})}
                                {Array.isArray(articolo.contenuto) && (
                                    <RichText content={articolo.contenuto} />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}