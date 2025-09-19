import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as Link1 } from "react-scroll";

import heroImg1 from '../assets/images/home/vito_dalessandro_home.jpg'
import heroImg2 from '../assets/images/home/hero_vito-dalessandro.jpg'
import sign from '../assets/images/sign-vitodalessandro.png'
import counterBg from '../assets/images/bg-counter.jpg'
import ctaBg from '../assets/images/skills.jpg'
import testibg from '../assets/images/testi.jpg'

import CountUp from 'react-countup';


import { FiDownload, FiStar, FiRefreshCw, } from '../assets/icons/vander'
import { counterData, hobbiesData, offerData, workTabData } from "../data/data";

import Navbar from "../components/navbar";
import ScrollTop from "../components/scrollTop";
import Footer from "../components/footer";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Blog from "../components/blog";
import Client from "../components/client";
import Portfolio from "../components/portfolio";
import BottomBanner from "../components/BottomBanner";
import bg1 from "../assets/images/home/04_vitodalessandro.jpg"
import { TypeAnimation } from 'react-type-animation';
import shape from '../assets/images/shape.png'
import { getAllArticoli } from "../api/articoli";

export default function IndexModern(){
    let [ activeIndex, setActiveIndex ] = useState(1);
    const [articoli, setArticoli] = useState([]);
        const fetchArticoli = async () => {
    try {
        const data = await getAllArticoli();
        console.log('data ', data.data)
        setArticoli(data.data);
        console.log(articoli)
      } catch (err) {
        console.error(err.message);
      } 
    };

  useEffect(() => {
    fetchArticoli();
  }, []);
    return(
        <>
        <Navbar navClass="navbar-nav mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"/>

                <section className="bg-home" style={{backgroundImage:`url(${bg1})`}} id="home">
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row mt-5 mt-sm-0 justify-content-center">
                            <div className="col-lg-12 text-center">
                                <div className="title-heading">
                                    <img src={heroImg1} className="img-fluid rounded-circle" alt=""/>
                                    <h1 className="heading text-primary mt-3 rammetto-one-regular">VITO D'ALESSANDRO</h1>
                                    <h6 className="sub-title text-light">Un cittadino in
                                        <TypeAnimation
                                            sequence={[
                                                'COMUNE',
                                                1000,
                                                'ASCOLTO',
                                                1000,
                                                'AMBIENTE',
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
                                <img src={shape} alt="" className="img-fluid mx-auto d-block"/>
                            </div>
                        </div>
                    </div>
                    <Link1 to="services" data-scroll-nav="1" className="mouse-icon mouse-icon-white rounded-pill bg-transparent mouse-down">
                        <span className="wheel position-relative d-block mover"></span>
                    </Link1>
                </section>

     <section className="section bg-light" id="services">        
  <div className="container">    
    <div className="row justify-content-center">
      <div className="col-12 text-center">
        <div className="section-title wow animated fadeInUp">
          <div className="position-relative">
            <h4 className="title text-uppercase mb-4">Cosa Faccio per la Comunità</h4>
            <div className="title-box"></div>
            <div className="title-line"></div>
          </div>
          <p className="text-muted mx-auto para-desc mt-5 mb-0">
            Il mio impegno quotidiano è costruire un futuro sostenibile, trasparente e condiviso per tutti.
          </p>
        </div>
      </div>
    </div>

    <div className="row">
      {offerData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
            <div className="service-wrapper rounded position-relative text-center border border-footer p-4 pt-5 pb-5 wow animated fadeInUp" data-wow-delay=".3s">
              <div className="icon text-success">
                <Icon className="fea icon-md" />
              </div>
              <div className="content mt-4">
                <h5 className="title">{item.title}</h5>
                <p className="text-muted mt-3 mb-0">{item.desc}</p>
              </div>
              <div className="big-icon">
                <Icon className="fea icons" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

        <section className="section bg-light pb-3 overflow-hidden" id="blog">
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
                <Blog articoli={articoli}/>
                <div className="row">
                    <div className="col-lg-12 mt-4 pt-2">
                        <div className="text-center wow animated fadeInUp" data-wow-delay="1.7s">
                            <Link to="/page-blog" className="btn btn-outline-primary">Tutti gli articoli</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section pb-3 overflow-hidden" id="chi-sono">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-5">
                        <div className="about-hero wow animated fadeInLeft" data-wow-delay="0.5s">
                            <img src={heroImg2} className="img-fluid mx-auto d-block about-tween position-relative" alt=""/>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="section-title mb-0 ms-lg-5 ms-md-3 wow animated fadeInRight" data-wow-delay="0.5s">
                            <h4 className="title text-primary mb-3">Vito D'Alessandro</h4>
                            <h6 className="designation mb-3">Sono un appasionato di <span className="text-primary">AMBIENTE</span></h6>
                            <p className="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien at convallis lacinia, justo urna tristique tellus, sit amet dignissim nisi orci vel metus. Mauris efficitur nisi ut purus luctus, ac pharetra erat tincidunt.
                            </p>
                            <p className="text-muted">
                            Curabitur nec commodo velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin blandit sapien at diam luctus, nec iaculis ipsum dignissim. Integer sed ex in magna tincidunt mattis.
                            </p>
                            <p  className="signature-text">
                            Vito D'Alessandro
                            </p>
                            {/* <div className="mt-4">
                                <Link1 to="projects" className="btn btn-primary mouse-down">View Portfolio</Link1>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section className="section pb-0" id="contattami">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Contattami</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Se hai voglia di collaborare per mantere l'ambiente più sano</p>
                        </div>
                    </div>
                </div>

                <Contact/>
            </div>
        </section>

        <section className="section pt-5 mt-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="custom-form mb-sm-30 wow animated fadeInUp" data-wow-delay="1.1s">
                            <form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6">
                                                <div className="form-group">
                                                    <input name="name" id="name" type="text" className="form-control border rounded" placeholder="Nome :"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-6">
                                                <div className="form-group">
                                                    <input name="email" id="email" type="email" className="form-control border rounded" placeholder="Email :"/>
                                                </div> 
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input name="subject" id="subject" className="form-control border rounded" placeholder="Oggetto :"/>
                                                </div>                                                                               
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <textarea name="comments" id="comments" rows="4" className="form-control border rounded" placeholder="Messaggio :"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-sm-12 text-end">
                                        <button type="submit" id="submit" name="send" className="btn btn-primary">Invia Messaggio</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        {/* <ScrollTop/> */}
        <BottomBanner />
        </>
    )
}