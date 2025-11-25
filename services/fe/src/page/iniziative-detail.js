import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages-vitodalessandro.jpg'
import Lightbox from 'react-18-image-lightbox';
import { FiCamera } from '../assets/icons/vander';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import { getIniziativaById } from "../api/iniziative.js"
import { RichText } from '@graphcms/rich-text-react-renderer';

export default function IniziativaDetail() {
    let params = useParams();
    let id = params.id

    const [iniziativa, setIniziativa] = useState({});
    const [isOpen, setisOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    
    useEffect(() => {
        getIniziativaById(id)
            .then((res) => {
                setIniziativa(res.data)
            })
            .catch((err) => console.error(err));
    }, [id]);


    const getImageUrl = (url) => {
        if (!url) return null;
        if (url.startsWith("http")) return url; // già assoluto
        return `${process.env.REACT_APP_STRAPI_API_URL}${url}`;
    };

    return (
        <>
            <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon" />

            <section
                className="bg-half d-table w-100"
                style={{
                    backgroundImage: iniziativa.immagini?.[0]?.url
                        ? `url(${getImageUrl(iniziativa.immagini[0].url)})`
                        : `url(${bg1})`,
                    backgroundPosition: 'center'
                }}
            >
                <div className="bg-overlay bg-overlay"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-lg-12 text-center">
                            <div className="page-next-level">
                                <h4 className="title text-white">{iniziativa.titolo}</h4>
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
                                    iniziativa.immagini?.map((immagine, index) => (
                                        <div
                                            key={immagine.id || index}
                                            className="portfolio-box-img position-relative overflow-hidden mt-4"
                                            style={{ height: "250px", overflow: "hidden", borderRadius: "12px" }}
                                        >
                                            <img
                                                src={getImageUrl(immagine.url)}
                                                alt=""
                                                onClick={() => handleImageClick(index)}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />

                                            {/* Overlay icona */}
                                            <div className="overlay-work">
                                                <div className="work-content text-center">
                                                    <Link
                                                        to="#"

                                                        className="lightbox text-light work-icon bg-dark d-inline-block rounded-pill"
                                                    >
                                                        <FiCamera className="fea icon-sm image-icon" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="blog position-relative overflow-hidden shadow rounded">
                                <div className="content p-4">
                                    {iniziativa.categories?.map((item, index) => {
                                        return (
                                            <h6 className="font-weight-normal"><i className="mdi mdi-tag text-primary me-1"></i><Link to="#" className="text-primary">{item.name}</Link></h6>
                                        )
                                    })}
                                    {Array.isArray(iniziativa.testo) && (
                                        <RichText content={iniziativa.testo} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <Lightbox
                            mainSrc={getImageUrl(iniziativa.immagini[currentImageIndex].url)}
                            onCloseRequest={() => setisOpen(false)}
                        />
                    )}

                </div>
            </section>
            <Footer />
            <ScrollTop />
        </>
    )
}