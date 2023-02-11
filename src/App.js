import { Routes, Route,  Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import "./i18n";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<Navigate to = "/dashboard"/>} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
