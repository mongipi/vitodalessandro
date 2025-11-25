import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages-vitodalessandro.jpg'
import hero from '../assets/images/home/hero.jpg'

import Navbar from "../components/navbar";
import { blogData, recentPost } from "../data/data";

import { FiUser, FiTag, FiChevronRight } from '../assets/icons/vander'
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import { getAllArticoli } from "../api/articoli";
import { getAllCategorie } from "../api/categorie";
import { FiX } from "react-icons/fi";
import { formatDataISO } from "../utils/util.js"
import StrapiImage from "../components/StrapiMedia.jsx";

export default function Blog(){
    const [articoli, setArticoli] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categoriaSelezionata, setCategoriaSelezionata] = useState(null);
    const [query, setQuery] = useState("");
    const [paginaCorrente, setPaginaCorrente] = useState(1);
    const articoliPerPagina = 10;
    const indexUltimoArticolo = paginaCorrente * articoliPerPagina;
    const indexPrimoArticolo = indexUltimoArticolo - articoliPerPagina;
    const articoliFiltrati = articoli
  .filter((item) => {
    if (!query) return true;
    const titolo = item.titolo?.toLowerCase() || "";
    return titolo.includes(query.toLowerCase());
  })
  .filter((item) => {
    if (!categoriaSelezionata) return true;
    return item.categories.some(
      (cat) => cat.name === categoriaSelezionata
    );
  });

const numeroPagine = Math.ceil(articoliFiltrati.length / articoliPerPagina);

const indexUltimo = paginaCorrente * articoliPerPagina;
const indexPrimo = indexUltimo - articoliPerPagina;
const articoliDaMostrare = articoliFiltrati.slice(indexPrimo, indexUltimo);

    
    const fetchArticoli = async () => {
        try {
            const data = await getAllArticoli();
            setArticoli(data.data);
        } catch (err) {
            console.error(err.message);
        } 
    };

    const fetchCategorie = async () => {
        try {
            const data = await getAllCategorie();
            setCategorie(data.data);
        } catch (err) {
            console.error(err.message);
        } 
    };

  useEffect(() => {
    fetchArticoli();
    fetchCategorie();
  }, []);
  
useEffect(() => {
  setPaginaCorrente(1);
}, [query, categoriaSelezionata]);
    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title text-white">Blog</h4>
                        </div>
                    </div>
                </div>
            </div> 
        </section>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="row">
                        {articoli.length === 0 ? (
                        <p>Caricamento in corso...</p>
                        ) : articoliFiltrati.length === 0 ? (
                        <p>Nessun articolo trovato.</p>
                        ) : (
                        articoliDaMostrare.map((item, index) => {
                                return(
                                    <div className="col-lg-6 col-12 mb-4 pb-2" key={index}>
                                        <div className="blog-post rounded shadow">
                                        {item.immagini?.[0]?.url && (
                                        <StrapiImage
                                            src={item.immagini[0].url}
                                            className="img-fluid rounded-top"
                                            alt=""
                                        />
                                        )} 
                                            <div className="content pt-4 pb-4 p-3">
                                                <ul className="list-unstyled d-flex justify-content-between post-meta">
                                                    {/* <li><FiUser className="fea icon-sm me-1"/><Link to="" className="text-dark">{item.name}</Link></li>  */}
                                                    <li>
                                                        <FiTag className="fea icon-sm me-1"/>
                                                        {item.categories.map((categoria, i) => (
                                                            <Link to="" key={i} className="text-dark me-2">
                                                            {categoria.name}
                                                            </Link>
                                                        ))}
                                                    </li>                                  
                                                </ul> 
                                                <h5 className="mb-3"><Link to={`/page-blog-detail/${item.documentId}`} className="title text-dark">{item.titolo}</Link> </h5>
                                                <ul className="list-unstyled mb-0 pt-3 border-top d-flex justify-content-between">
                                                    <li><Link to={`/page-blog-detail/${item.documentId}`} className="text-dark">Leggi di piu <FiChevronRight className="fea icon-sm"/></Link></li>
                                                    <li><i className="mdi mdi-calendar-edit me-1"></i>{formatDataISO(item.pubblicato_il)}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))}

                            <div className="col-12">                                
                                <ul className="pagination justify-content-center mb-0 list-unstyled">
                                    <li>
                                        <Link
                                        className="pe-3 ps-3 pt-2 pb-2"
                                        onClick={() => setPaginaCorrente(p => Math.max(p - 1, 1))}
                                        disabled={paginaCorrente === 1}
                                        >
                                        Indietro
                                        </Link>
                                    </li>
                                    {Array.from({ length: numeroPagine }, (_, i) => (
                                        <li key={i} className={paginaCorrente === i + 1 ? "active" : ""}>
                                        <Link
                                            className="pe-3 ps-3 pt-2 pb-2"
                                            onClick={() => setPaginaCorrente(i + 1)}
                                        >
                                            {i + 1}
                                        </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                        className="pe-3 ps-3 pt-2 pb-2"
                                        onClick={() => setPaginaCorrente(p => Math.min(p + 1, numeroPagine))}
                                        disabled={paginaCorrente === numeroPagine}
                                        >
                                        Avanti
                                        </Link>
                                    </li>
                                    </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="sidebar sticky-sidebar">

                            <div className="widget">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Ricerca</h6>
                                    <div id="search2" className="widget-search mt-4 mb-0">
                                       <form
                                        role="search"
                                        className="searchform"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                        >
                                        <div>
                                            <input
                                            type="text"
                                            className="border rounded w-100"
                                            name="s"
                                            placeholder="Cerca per titolo..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            />
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                                <div className="widget mt-4 pt-2">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Categorie</h6>

                                    {/* SEZIONE FILTRO ATTIVO */}
                                    {categoriaSelezionata && (
                                    <div className="alert alert-info d-flex justify-content-between align-items-center mt-3">
                                        <span>
                                         <strong>{categoriaSelezionata}</strong>
                                        </span>
                                        <button
                                        onClick={() => setCategoriaSelezionata(null)}
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        >
                                         <FiX />
                                        </button>
                                    </div>
                                    )}

                                    {/* LISTA CATEGORIE */}
                                    <ul className="list-unstyled mt-4 mb-0 catagories">
                                    {categorie.map((item, index) => (
                                        <li className="d-flex justify-content-between" key={index}>
                                        <button
                                            onClick={() =>
                                            setCategoriaSelezionata(
                                                categoriaSelezionata === item.name ? null : item.name
                                            )
                                            }
                                            className={`border-0 bg-transparent p-0 text-start text-dark ${
                                            categoriaSelezionata === item.name ? "fw-bold text-primary" : ""
                                            }`}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {item.name}
                                        </button>
                                        <span>{item.articolis.length}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
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