import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';
import LongArticle from './pages/generate/long_article'
import "./i18n";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<Navigate to = "/template"/>} />
        <Route path = "/template" element = {<Template/>} />
        <Route path = "/template/long_article" element = {<LongArticle/>} />
      </Routes>
    </div>
  );
}

export default App;
