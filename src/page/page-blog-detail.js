import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages-vitodalessandro.jpg'
import blog1 from '../assets/images/blog/06.jpg'
import blog2 from '../assets/images/blog/single-1.jpg'

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { blogComment, blogData } from "../data/data";

import { FiUser, FiTag, FiChevronRight } from '../assets/icons/vander'
import {getArticoloById} from "../api/articoli.js"
import { formatDataISO } from "../utils/util.js"

export default function BlogDetail(){
    let params = useParams();
    let id = params.id
    let data = blogData.find((blog) =>blog.id === parseInt(id))

  const [articolo, setArticolo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  getArticoloById(id)
    .then((res) => setArticolo(res.data))
    .catch((err) => console.error(err));
}, []);


    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${ bg1 })`, backgroundPosition:'center'}}>
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
                                articolo.immagini?.map((immagine) => {
                                    <img src={ immagine.url } className="img-fluid rounded d-block mt-4" alt=""/> 
                                })
                            }
                            {/* <img src={ data?.image ? data.image : blog1 } className="img-fluid rounded" alt=""/>
                            <img src={ blog2 } className="img-fluid rounded d-block mt-4" alt=""/> */}
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="blog position-relative overflow-hidden shadow rounded">
                            <div className="content p-4">
                                {articolo.categories?.map((item,index) =>{ 
                                    return(
                                        <h6 className="font-weight-normal"><i className="mdi mdi-tag text-primary me-1"></i><Link to="#" className="text-primary">{item.name}</Link></h6>
                                )})}
                                {articolo.testo}
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