import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';

import LongArticlePage from './pages/generate/blog/long_article'
import ContentImproverPage from './pages/generate/blog/content_improver';
import BlogIdeaOutlinePage from './pages/generate/blog/blog_idea_outline';
import BlogIntroParagraphPage from './pages/generate/blog/blog_intro_paragraph';
import BlogSeoTitleMetaDescriptionPage from './pages/generate/blog/blog_seo_title_meta_description';
import ParaphrasingRewriteQuillbotPage from './pages/generate/blog/paraphrasing_rewrite_quillbot';

import YoutubeDescription from './pages/generate/youtube/youtube_description';
import YoutubeHookIntroduction from './pages/generate/youtube/youtube_hook_introduction';
import YoutubeTitle from './pages/generate/youtube/youtube_title';

import PinterestTitleDescriptionPage from './pages/generate/social_media/pinterest_title_description';
import PhotoPostCaptionPage from './pages/generate/social_media/photo_post_caption';
import OpinionPieceColumnPage from './pages/generate/social_media/opinion_piece_column';

import AmazonProductFeaturePage from './pages/generate/amazon/amazon_product_feature';
import AmazonProductTitlePage from './pages/generate/amazon/amazon_product_title';
import AmazonProductDescriptionPage from './pages/generate/amazon/amazon_product_description';

import FacebookAdsPage from './pages/generate/ads/facebook_ads';
import GoogleAdsPage from './pages/generate/ads/google_ads';

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
        <Route path = "/template/long_article" element = {<LongArticlePage/>} />
        <Route path = "/template/content_improver" element = {<ContentImproverPage/>} />
        <Route path = "/template/blog_idea_outline" element = {<BlogIdeaOutlinePage/>} />
        <Route path = "/template/blog_intro_paragraph" element = {<BlogIntroParagraphPage/>} />
        <Route path = "/template/blog_seo_title_meta_description" element = {<BlogSeoTitleMetaDescriptionPage/>} />
        <Route path = "/template/paraphrasing_rewrite_quillbot" element = {<ParaphrasingRewriteQuillbotPage/>} />

        <Route path = "/template/youtube_description" element = {<YoutubeDescription/>} />
        <Route path = "/template/youtube_introduction" element = {<YoutubeHookIntroduction/>} />
        <Route path = "/template/youtube_title" element = {<YoutubeTitle/>} />
        
        <Route path = "/template/pinterest_title_description" element = {<PinterestTitleDescriptionPage/>} />
        <Route path = "/template/photo_post_caption" element = {<PhotoPostCaptionPage/>} />
        <Route path = "/template/opinion_piece_column" element = {<OpinionPieceColumnPage/>} />
        
        <Route path = "/template/amazon_product_feature" element = {<AmazonProductFeaturePage/>} />
        <Route path = "/template/amazon_product_title" element = {<AmazonProductTitlePage/>} />
        <Route path = "/template/amazon_product_description" element = {<AmazonProductDescriptionPage/>} />
        
        <Route path = "/template/facebook_ads" element = {<FacebookAdsPage/>} />
        <Route path = "/template/google_ads" element = {<GoogleAdsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
