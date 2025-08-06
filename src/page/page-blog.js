import React from "react";
import { Link } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages.jpg'
import hero from '../assets/images/home/hero.jpg'

import Navbar from "../components/navbar";
import { blogData, recentPost } from "../data/data";

import { FiUser, FiTag, FiChevronRight } from '../assets/icons/vander'
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

export default function Blog(){
    return(
        <>
        <Navbar navClass="navbar-nav navbar-nav-link mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon" navDark={true}/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-overlay-white"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title"> Latest News or Blog </h4>
                            <ul className="page-next bg-light d-inline-block py-2 px-4 mt-3 rounded mb-0">
                                <li><Link to="/" className="text-dark">Cristino</Link></li>
                                <li>
                                    <span className="text-primary"> Blog</span> 
                                </li> 
                            </ul>
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
                            {blogData.map(( item, index ) =>{
                                return(
                                    <div className="col-lg-6 col-12 mb-4 pb-2" key={index}>
                                        <div className="blog-post rounded shadow">
                                            <img src={item.image} className="img-fluid rounded-top" alt=""/>
                                            <div className="content pt-4 pb-4 p-3">
                                                <ul className="list-unstyled d-flex justify-content-between post-meta">
                                                    <li><FiUser className="fea icon-sm me-1"/><Link to="" className="text-dark">{item.name}</Link></li> 
                                                    <li><FiTag className="fea icon-sm me-1"/><Link to="" className="text-dark">{item.tag}</Link></li>                                    
                                                </ul> 
                                                <h5 className="mb-3"><Link to={`/page-blog-detail/${item.id}`} className="title text-dark">{item.title}</Link> </h5>
                                                <ul className="list-unstyled mb-0 pt-3 border-top d-flex justify-content-between">
                                                    <li><Link to="" className="text-dark">Read More <FiChevronRight className="fea icon-sm"/></Link></li>
                                                    <li><i className="mdi mdi-calendar-edit me-1"></i>{item.date}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="col-12">                                
                                <ul className="pagination justify-content-center mb-0 list-unstyled">
                                    <li><Link to="#" className="pe-3 ps-3 pt-2 pb-2"> Previous</Link></li>
                                    <li className="active"><Link to="#" className="pe-3 ps-3 pt-2 pb-2">1</Link></li>
                                    <li><Link to="#" className="pe-3 ps-3 pt-2 pb-2">2</Link></li>
                                    <li><Link to="#" className="pe-3 ps-3 pt-2 pb-2">3</Link></li>
                                    <li><Link to="#" className="pe-3 ps-3 pt-2 pb-2">Next </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="sidebar sticky-sidebar">
                            <div className="widget">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Author</h6>
                                    <div className="text-center author mt-4">
                                        <img src={hero} className="avatar avatar-md shadow border mx-auto rounded-circle" alt=""/>
                                        <div className="mt-4">
                                            <h6>Cristino Murphy</h6>
                                            <small>Web Designer</small>
                                            <ul className="list-unstyled social-icon social mt-4 mb-0">
                                                <li className="list-inline-item"><Link to="" className="rounded"><i className="mdi mdi-facebook"></i></Link></li>
                                                <li className="list-inline-item"><Link to="" className="rounded"><i className="mdi mdi-instagram"></i></Link></li>
                                                <li className="list-inline-item"><Link to="" className="rounded"><i className="mdi mdi-twitter"></i></Link></li>
                                                <li className="list-inline-item"><Link to="" className="rounded"><i className="mdi mdi-vimeo"></i></Link></li>
                                                <li className="list-inline-item"><Link to="" className="rounded"><i className="mdi mdi-linkedin"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="widget mt-4 pt-2">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Search</h6>
                                    <div id="search2" className="widget-search mt-4 mb-0">
                                        <form role="search" method="get" id="searchform" className="searchform">
                                            <div>
                                                <input type="text" className="border rounded" name="s" id="s" placeholder="Search Keywords..."/>
                                                <input type="submit" id="searchsubmit" value="Search"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="widget mt-4 pt-2">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Catagories</h6>
                                    <ul className="list-unstyled mt-4 mb-0 catagories">
                                        <li className="d-flex justify-content-between"><Link to="">Finance</Link> <span>13</span></li>
                                        <li className="d-flex justify-content-between"><Link to="">Business</Link> <span>09</span></li>
                                        <li className="d-flex justify-content-between"><Link to="">Blog</Link> <span>18</span></li>
                                        <li className="d-flex justify-content-between"><Link to="">Corporate</Link> <span>20</span></li>
                                        <li className="d-flex justify-content-between"><Link to="">Investment</Link> <span>22</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="widget mt-4 pt-2">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded text-center">Recent Post</h6>
                                    <div className="mt-4">
                                        {recentPost.map(( item, index ) =>{
                                            return(
                                                <div className="clearfix d-flex align-items-center post-recent" key={index}>
                                                    <div className="post-recent-thumb"><Link to=""> <img alt="img" src={item.image} className="img-fluid rounded"/></Link></div>
                                                    <div className="post-recent-content"><Link to="">{item.title}</Link><span className="text-muted">{item.date}</span></div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="widget mt-4 pt-2 text-center">
                                <div className="p-4 rounded shadow">
                                    <h6 className="widget-title font-weight-bold pt-2 pb-2 bg-light rounded">Tags Cloud</h6>
                                    <div className="tagcloud mt-4">
                                        <Link to="" className="rounded">Business</Link>
                                        <Link to="" className="rounded">Finance</Link>
                                        <Link to="" className="rounded">Marketing</Link>
                                        <Link to="" className="rounded">Fashion</Link>
                                        <Link to="" className="rounded">Bride</Link>
                                        <Link to="" className="rounded">Lifestyle</Link>
                                        <Link to="" className="rounded">Travel</Link>
                                        <Link to="" className="rounded">Beauty</Link>
                                        <Link to="" className="rounded">Video</Link>
                                        <Link to="" className="rounded">Audio</Link>
                                    </div>
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