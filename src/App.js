import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';
import LongArticle from './pages/generate/long_article'
import ContentImprover from './pages/generate/content_improver';
import YoutubeDescription from './pages/generate/youtube/youtube_description';
import YoutubeHookIntroduction from './pages/generate/youtube/youtube_hook_introduction';
import YoutubeTitle from './pages/generate/youtube/youtube_title';
import PinterestTitleDescriptionPage from './pages/generate/social_media/pinterest_title_description';
import AmazonProductFeaturePage from './pages/generate/amazon/amazon_product_feature';
import AmazonProductTitlePage from './pages/generate/amazon/amazon_product_title';
import AmazonProductDescriptionPage from './pages/generate/amazon/amazon_product_description';
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
        <Route path = "/template/youtube_title" element = {<YoutubeTitle/>} />
        <Route path = "/template/pinterest_title_description" element = {<PinterestTitleDescriptionPage/>} />
        <Route path = "/template/amazon_product_feature" element = {<AmazonProductFeaturePage/>} />
        <Route path = "/template/amazon_product_title" element = {<AmazonProductTitlePage/>} />
        <Route path = "/template/amazon_product_description" element = {<AmazonProductDescriptionPage/>} />
      </Routes>
    </div>
  );
}

export default App;
