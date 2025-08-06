import React from "react";
import { Link, useParams } from "react-router-dom";

import bg1 from '../assets/images/home/bg-pages.jpg'
import blog1 from '../assets/images/blog/06.jpg'
import blog2 from '../assets/images/blog/single-1.jpg'

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { blogComment, blogData } from "../data/data";

import { FiUser, FiTag, FiChevronRight } from '../assets/icons/vander'


export default function BlogDetail(){
    let params = useParams();
    let id = params.id
    let data = blogData.find((blog) =>blog.id === parseInt(id))
    return(
        <>
        <Navbar navClass="navbar-nav navbar-nav-link mx-auto" socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon" navDark={ true }/>

        <section className="bg-half d-table w-100" style={{backgroundImage:`url(${ bg1 })`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-overlay-white"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-12 text-center">
                        <div className="page-next-level">
                            <h4 className="title"> { data?.title ? data.title : 'Three Reasons Visibility Matters in Supply Chain ' }</h4>
                            <ul className="list-unstyled mt-3">
                                <li className="list-inline-item me-3"><i className="mdi mdi-tag-outline me-1"></i><Link to="" className="text-muted">Photography</Link></li>
                                <li className="list-inline-item me-3"><i className="mdi mdi-account-heart me-1"></i><Link to="" className="text-muted">Cristino Murphy</Link></li>
                                <li className="list-inline-item"><i className="mdi mdi-calendar-edit me-1"></i><span className="text-muted">25th April, 2020</span> </li>
                            </ul>
                            <ul className="page-next bg-light d-inline-block py-2 px-4 mt-3 rounded mb-0">
                                <li><Link to="/" className="text-dark">Cristino</Link></li>
                                <li><Link to="/page-blog" className="text-dark">Blog</Link></li> 
                                <li>
                                    <span className="text-primary"> Blog Detail</span> 
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
                    <div className="col-lg-5 col-md-4">
                        <div className="sticky-sidebar">
                            <img src={ data?.image ? data.image : blog1 } className="img-fluid rounded" alt=""/>
                            <img src={ blog2 } className="img-fluid rounded d-block mt-4" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="blog position-relative overflow-hidden shadow rounded">
                            <div className="content p-4">
                                <h6 className="font-weight-normal"><i className="mdi mdi-tag text-primary me-1"></i><Link to="#" className="text-primary">Photography</Link></h6>
                                <p className="text-muted mt-3">The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also incomprehensible, but it imitates the rhythm of most European languages in Latin script. </p>
                                <blockquote className="blockquote mt-3 p-3">
                                    <p className="text-muted mb-0 font-italic">" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "</p>
                                </blockquote>
                                <p className="text-muted">The advantage of its Latin origin and the relative meaninglessness of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's attention from the layout.</p>
                                <div className="post-meta mt-3">
                                    <ul className="list-unstyled mb-0">
                                        <li className="list-inline-item float-right">
                                            <ul className="list-unstyled">
                                                <li className="list-inline-item">Share :</li>
                                                <li className="list-inline-item"><Link to="#" className="text-muted"><i className="mdi mdi-facebook"></i></Link></li>
                                                <li className="list-inline-item"><Link to="#" className="text-muted"><i className="mdi mdi-instagram"></i></Link></li>
                                                <li className="list-inline-item"><Link to="#" className="text-muted"><i className="mdi mdi-google-plus"></i></Link></li>
                                                <li className="list-inline-item"><Link to="#" className="text-muted"><i className="mdi mdi-twitter"></i></Link></li>
                                            </ul>
                                        </li>
                                        <li className="list-inline-item me-2"><Link to="#" className="text-muted like"><i className="mdi mdi-heart-outline me-1"></i>33</Link></li>
                                        <li className="list-inline-item"><Link to="#" className="text-muted comments"><i className="mdi mdi-comment-outline me-1"></i>08</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-2 comment-area ">
                            <div className="p-4 shadow rounded">
                                <h5 className="page-title pb-3">Comments :</h5>
                                <ul className="media-list list-unstyled mb-0">
                                    {blogComment.map(( item, index ) =>{
                                        return(
                                            <li className="d-flex mt-4" key={index}>
                                                <Link className="float-left pe-3 mt-2" to="#">
                                                    <img className="img-fluid d-block mx-auto img-thumbnail rounded-circle" src={item.image} alt="img"/>
                                                </Link>

                                                <div className="flex-1">
                                                    <Link to="#" className="float-right text-muted"><i className="mdi mdi-reply"></i>&nbsp; Reply</Link>
                                                    <h6 className="media-heading mb-0"><Link to="#" className="text-dark">{item.name}</Link></h6>
                                                    <small className="text-muted">{item.date}</small>
                                                    <p className="mt-2 bg-light font-italic media-para text-muted rounded pt-3 pb-3 ps-4 pe-3 mb-0">{item.desc}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 pt-2">
                            <div className="p-4 shadow rounded">
                                <h5 className="page-title pb-3">Leave A Comment :</h5>
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <textarea id="message" placeholder="Your Comment" rows="5" name="message" className="form-control border rounded" required=""></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input id="name" name="name" type="text" placeholder="Name" className="form-control border rounded" required=""/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input id="email" type="email" placeholder="Email" name="email" className="form-control border rounded" required=""/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="send">
                                            <button type="submit" className="btn btn-primary rounded">Send comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="section-title">
                            <div className="position-relative">
                                <h4 className="title text-uppercase mb-4">Related Post</h4>
                                <div>
                                    <div className="title-box"></div>
                                    <div className="title-line"></div>
                                </div>
                            </div>
                            <p className="text-muted mx-auto para-desc mt-5 mb-0">Obviously I'm a Web Designer. Experienced with all stages of the development cycle for dynamic web projects.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {blogData.slice( 0, 3 ).map(( item, index ) =>{
                        return(
                        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                            <div className="blog-post rounded shadow">
                                <img src={item.image} className="img-fluid rounded-top" alt=""/>
                                <div className="content pt-4 pb-4 p-3">
                                    <ul className="list-unstyled d-flex justify-content-between post-meta">
                                        <li><FiUser className="fea icon-sm me-1"/><Link to="#" className="text-dark">{item.name}</Link></li> 
                                        <li><FiTag className="fea icon-sm me-1"/><Link to="#" className="text-dark">{item.tag}</Link></li>                                    
                                    </ul>  
                                    <h5 className="mb-3"><Link to={`/page-blog-detail/${item.id}`} className="title text-dark">{item.title}</Link></h5> 
                                    <ul className="list-unstyled mb-0 pt-3 border-top d-flex justify-content-between">
                                        <li><Link to="#" className="text-dark">Read More <FiChevronRight className="fea icon-sm"/></Link></li>
                                        <li><i className="mdi mdi-calendar-edit me-1"></i>{item.date}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}