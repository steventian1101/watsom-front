import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';
import LongArticle from './pages/generate/long_article'
import ContentImprover from './pages/generate/content_improver';
import YoutubeDescription from './pages/generate/youtube/youtube_description';
import YoutubeHookIntroduction from './pages/generate/youtube/youtube_hook_introduction';
import "./i18n";
import Loading from './components/Loading';
import { useSelector } from "react-redux";

function App() {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;

  return (
    <div className="App">
      {loading && <Loading />}
      <Routes>
        <Route path = "/" element ={<Navigate to = "/template"/>} />
        <Route path = "/template" element = {<Template/>} />
        <Route path = "/template/long_article" element = {<LongArticle/>} />
        <Route path = "/template/content_improver" element = {<ContentImprover/>} />
        <Route path = "/template/youtube_description" element = {<YoutubeDescription/>} />
        <Route path = "/template/youtube_introduction" element = {<YoutubeHookIntroduction/>} />
      </Routes>
    </div>
  );
}

export default App;
