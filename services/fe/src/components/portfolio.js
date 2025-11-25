import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from 'react-18-image-lightbox';
import "react-18-image-lightbox/style.css";
import { FiCamera } from '../assets/icons/vander';
import { getAllInizative } from "../api/iniziative";

export default function Portfolio() {
    const [isOpen, setisOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [iniziative, setIniziative] = useState([]);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };

    const getImageUrl = (url) => {
        if (!url) return null;
        if (url.startsWith("http")) return url;
        return `${process.env.REACT_APP_STRAPI_API_URL}${url}`;
    };

    const fetchIniziative = async () => {
        try {
            const data = await getAllInizative();
            setIniziative(data.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getLightboxImage = () => {
        if (!iniziative[currentImageIndex]) return "";
        return getImageUrl(iniziative[currentImageIndex].immagini[0].url);
    };

    useEffect(() => {
        fetchIniziative();
    }, []);

    const styles = {
        box: {
            height: "250px",
            width: "100%",
            overflow: "hidden",
        },
        img: {
            height: "100%",
            width: "100%",
            objectFit: "cover",
        }
    };


    return (
        <div id="grid" className="row">
            {iniziative.map((item, index) => (
                <div className="col-lg-4 col-md-6 mt-4 pt-2 picture-item" key={index}>
                    <div className="item-box portfolio-box rounded shadow bg-white overflow-hidden">
                        <div className="portfolio-box-img position-relative overflow-hidden" style={styles.box}>
                            <img
                                className="item-container w-full h-full object-cover mx-auto"
                                src={getImageUrl(item.immagini[0].url)}
                                alt=""
                                style={styles.img}
                            />
                            <div className="overlay-work">
                                <div className="work-content text-center">
                                    <Link to="#" onClick={() => handleImageClick(index)} className="lightbox text-light work-icon bg-dark d-inline-block rounded-pill">
                                        <FiCamera className="fea icon-sm image-icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="gallary-title py-4 text-center">
                            <h5><Link to={`/inizative-detail/${item.documentId}`} className="title text-dark">{item.titolo}</Link></h5>
                        </div>
                    </div>
                </div>
            ))}

            {isOpen && (
                <Lightbox
                    mainSrc={getLightboxImage()}  // <-- qui
                    onCloseRequest={() => setisOpen(false)}
                />
            )}
        </div>
    );
}