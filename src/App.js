import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import IndexAnimation from "./page/index-animation";
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './assets/scss/style.scss'
import './assets/css/materialdesignicons.min.css'
import Blog from "./page/page-blog";
import BlogDetail from "./page/page-blog-detail";
import PagePortfolio from "./page/page-portfolio";
import PortfolioDetail from "./page/page-portfolio-detail";
import IndexBoxed from "./page/index-boxed";
import IndexClassy from "./page/index-classy";
import IndexClip from "./page/index-clip";
import IndexCreative from "./page/index-creative";
import IndexModern from "./page/index-modern";
import IndexParallax from "./page/index-parallax";
import Index from "./page/index-modern";
import IndexVideo from "./page/index-video";
import IndexSlider from "./page/index-slider";
import Loader from "./components/loader";


function App() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
      let timeOut  = setTimeout(() => setLoading(false), 2000)

      return () => {
        clearTimeout(timeOut);
      };
  }, [])
  if (loading) {
      return <Loader/>
  }
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/index" element={<Index/>}/>
          <Route path="/page-blog" element={<Blog/>}/>
          <Route path="/page-blog-detail" element={<BlogDetail/>}/>
          <Route path="/page-blog-detail/:id" element={<BlogDetail/>}/>
          <Route path="/page-portfolio" element={<PagePortfolio/>}/>
          <Route path="/page-portfolio-detail" element={<PortfolioDetail/>}/>
          <Route path="/index-boxed" element={<IndexBoxed/>}/>
          <Route path="/index-classy" element={<IndexClassy/>}/>
          <Route path="/index-clip" element={<IndexClip/>}/>
          <Route path="/index-creative" element={<IndexCreative/>}/>
          <Route path="/index-modern" element={<IndexModern/>}/>
          <Route path="/index-parallax" element={<IndexParallax/>}/>
          <Route path="/index-animation" element={<IndexAnimation/>}/>
          <Route path="/index-video" element={<IndexVideo/>}/>
          <Route path="/index-slider" element={<IndexSlider/>}/>
       </Routes>
    </div>
  );
}

export default App;
