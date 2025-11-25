import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/scss/bootstrap.scss'
import './assets/scss/style.scss'
import './assets/css/materialdesignicons.min.css'
import Blog from "./page/page-blog";
import BlogDetail from "./page/page-blog-detail";
import IniziativaDetail from "./page/iniziative-detail";
import PagePortfolio from "./page/page-portfolio";
import PortfolioDetail from "./page/page-portfolio-detail";
import Index from "./page/index-modern";
import Collaboriamo from "./page/collaboriamo";
import InfoUtili from "./page/info";
function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/page-blog" element={<Blog/>}/>
          <Route path="/page-blog-detail" element={<BlogDetail/>}/>
          <Route path="/page-blog-detail/:id" element={<BlogDetail/>}/>
          <Route path="/inizative-detail/:id" element={<IniziativaDetail/>}/>
          <Route path="/proposte" element={<PagePortfolio/>}/>
          <Route path="/collaboriamo" element={<Collaboriamo/>}/>
          <Route path="/page-portfolio-detail" element={<PortfolioDetail/>}/>
          <Route path="/info-utili" element={<InfoUtili/>}/>
       </Routes>
    </div>
  );
}

export default App;
