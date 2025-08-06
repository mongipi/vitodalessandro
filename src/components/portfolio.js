import React, { useState } from "react";
import { Link } from "react-router-dom";
import { portfolioData, portfolioImage } from "../data/data";

import Lightbox from 'react-18-image-lightbox';
import "react-18-image-lightbox/style.css"

import { FiCamera } from '../assets/icons/vander'

export default function Portfolio(){

    let [selectedCategory, setSelectedCategory] = useState(null);
    let [isOpen, setisOpen] = useState(false);
    let [currentImageIndex, setCurrentImageIndex] = useState(0);

    let handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + portfolioImage.length - 1) % portfolioImage.length);
    };

    let handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % portfolioImage.length);
    };
    let handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    let currentImage = portfolioImage[currentImageIndex];
   
    let matchCategory = (category) => {
        setSelectedCategory(category);
    };

    let filteredData = selectedCategory
        ? portfolioData.filter((item) => item.category === selectedCategory)
        : portfolioData;

    return(
        <>
            <div className="row mt-4 justify-content-center">
                <div className="col-12 filters-group-wrap wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                    <div className="filters-group">
                        <ul className="portfolioFilter list-inline mb-0 filter-options text-center">
                            <li className={`${selectedCategory === null ? 'active' : '' } list-inline-item categories-name border text-dark px-3 rounded`} onClick={() =>matchCategory(null)}>All</li>
                            <li className={`${selectedCategory === 'branding' ? 'active' : '' } list-inline-item categories-name border text-dark px-3 rounded`} onClick={() =>matchCategory('branding')}>Branding</li>
                            <li className={`${selectedCategory === 'designing' ? 'active' : '' } list-inline-item categories-name border text-dark px-3 rounded`} onClick={() =>matchCategory('designing')}>Designing</li>
                            <li className={`${selectedCategory === 'photography' ? 'active' : '' } list-inline-item categories-name border text-dark px-3 rounded`} onClick={() =>matchCategory('photography')}>Photography</li>
                            <li className={`${selectedCategory === 'development' ? 'active' : '' } list-inline-item categories-name border text-dark px-3 rounded`} onClick={() =>matchCategory('development')}>Development</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="grid" className="row">
                {filteredData.map((item, index) =>{
                    return(
                        <div className="col-lg-4 col-md-6 mt-4 pt-2 picture-item wow animate__animated animate__fadeInUp" data-wow-delay=".5s" key={index}>
                            <div className="item-box portfolio-box rounded shadow bg-white overflow-hidden">
                                <div className="portfolio-box-img position-relative overflow-hidden">
                                    <img className="item-container img-fluid mx-auto" src={item.image} alt=""/>
                                    <div className="overlay-work">
                                        <div className="work-content text-center">
                                            <Link to="#" onClick={() => handleImageClick(index)} className="lightbox text-light work-icon bg-dark d-inline-block rounded-pill "><FiCamera className="fea icon-sm image-icon"/></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallary-title py-4 text-center">
                                    <h5><Link to="/page-portfolio-detail" className="title text-dark">{item.title}</Link></h5>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {isOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        prevSrc={portfolioImage[(currentImageIndex + portfolioImage.length - 1) % portfolioImage.length]}
                        nextSrc={portfolioImage[(currentImageIndex + 1) % portfolioImage.length]}

                        onCloseRequest={() => setisOpen(false)}
                        onMovePrevRequest={handleMovePrev}
                        onMoveNextRequest={handleMoveNext}
                    />
                )}
            </div>
        </>
    )
}