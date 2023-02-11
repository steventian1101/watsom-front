import { Routes, Route,  Navigate } from 'react-router-dom';
import Template from './pages/template';
import "./i18n";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<Navigate to = "/template"/>} />
        <Route path = "/template" element = {<Template/>} />
      </Routes>
    </div>
  );
}

export default App;
