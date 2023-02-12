import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';
import LongArticle from './pages/generate/long_article'
import ContentImprover from './pages/generate/content_improver';
import "./i18n";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<Navigate to = "/template"/>} />
        <Route path = "/template" element = {<Template/>} />
        <Route path = "/template/long_article" element = {<LongArticle/>} />
        <Route path = "/template/content_improver" element = {<ContentImprover/>} />
      </Routes>
    </div>
  );
}

export default App;
