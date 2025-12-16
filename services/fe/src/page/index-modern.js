import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as Link1 } from "react-scroll";
import heroImg1 from '../assets/images/home/vito_dalessandro_home.jpg'
import heroImg2 from '../assets/images/home/home_vito-dalessandro.jpeg'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Blog from "../components/blog";
import BottomBanner from "../components/BottomBanner";
import bg1 from "../assets/images/home/04_vitodalessandro.jpg"
import { TypeAnimation } from 'react-type-animation';
import shape from '../assets/images/shape.png'
import { getAllArticoli } from "../api/articoli";
import Contact from "../components/contact";
import Cta from "../components/cta";

export default function IndexModern() {
    const [articoli, setArticoli] = useState([]);
    const fetchArticoli = async () => {
        try {
            const data = await getAllArticoli();
            setArticoli(data.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchArticoli();
    }, []);
    return (
        <>
            <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon" />
            <section className="bg-home" style={{ backgroundImage: `url(${bg1})` }} id="home">
                <div className="bg-overlay"></div>
                <div className="container">
                    <div className="row mt-5 mt-sm-0 justify-content-center">
                        <div className="col-lg-12 text-center">
                            <div className="title-heading">
                                <img src={heroImg1} className="img-fluid rounded-circle" alt="" />
                                <h1 className="heading text-primary mt-3 rammetto-one-regular">VITO D'ALESSANDRO</h1>
                                <h6 className="sub-title text-light">Un cittadino in
                                    <TypeAnimation
                                        sequence={[
                                            "'COMUNE'",
                                            1000,
                                            'BITONTO',
                                            1000,
                                            'COMUNE',
                                            1000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        className="typewrite text-primary ps-1"
                                        repeat={Infinity}
                                    />
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="home-shape">
                            <img src={shape} alt="" className="img-fluid mx-auto d-block" />
                        </div>
                    </div>
                </div>
                <Link1 to="services" data-scroll-nav="1" className="mouse-icon mouse-icon-white rounded-pill bg-transparent mouse-down">
                    <span className="wheel position-relative d-block mover"></span>
                </Link1>
            </section>

            <section className="section pb-3 overflow-hidden bg-light" id="chi-sono">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-5">
                            <div className="about-hero wow animated fadeInLeft" data-wow-delay="0.5s">
                                <img src={heroImg2} className="img-fluid mx-auto d-block about-tween position-relative" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                            <div className="section-title mb-0 ms-lg-5 ms-md-3 wow animated fadeInRight" data-wow-delay="0.5s">
                                <h4 className="title text-primary mb-3">Vito D'Alessandro</h4>
                            

                                <p className="text-muted">
                                    Sono un cittadino di Bitonto che ha scelto di impegnarsi in prima persona per la propria comunità.
                                    Credo in una politica fatta di ascolto, presenza e coerenza, capace di partire dalle persone e dai loro bisogni reali.
                                </p>

                                <p className="text-muted">
                                    Durante le ultime elezioni comunali ho deciso di candidarmi per portare un modo diverso di fare politica:
                                    vicino alla gente, trasparente e concreto. Anche se non sono stato eletto, sto continuando a impegnarmi per dimostrare
                                    che la mia non era una candidatura “di facciata”, ma l’inizio di un percorso vero.
                                </p>

                                <p className="text-muted">
                                    Attraverso la pagina social “Vito D’Alessandro – Un Cittadino in Comune”, porto avanti ogni giorno un lavoro di ascolto,
                                    informazione e partecipazione.
                                </p>

                                <p className="text-muted">
                                    Oggi il legame con la mia comunità guarda avanti: vorrei costruire un gruppo di persone che condividano il desiderio
                                    di migliorare Bitonto e che, insieme, possano un domani portare idee e visioni nuove nelle istituzioni.
                                </p>

                                <p className="signature-text">
                                    Vito D'Alessandro
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="section bg-light pb-3 overflow-hidden pb-5" id="blog">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="section-title wow animated fadeInUp">
                                <div className="position-relative">
                                    <h4 className="title text-uppercase mb-4">Ultimi articoli</h4>
                                    <div>
                                        <div className="title-box"></div>
                                        <div className="title-line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Blog articoli={articoli} />
                    <div className="row">
                        <div className="col-lg-12 mt-4 pt-2">
                            <div className="text-center wow animated fadeInUp" data-wow-delay="1.7s">
                                <Link to="/page-blog" className="btn btn-outline-primary">Tutti gli articoli</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           {/* CTA E FOOTER */}
            <section className="section">
                <Cta />
            </section>
            <div class="container mb-60">
                <Contact />
            </div>
            <Footer />
            {/* <ScrollTop/> */}
            <BottomBanner />
        </>
    )
}