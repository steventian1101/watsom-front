import { Routes, Route,  Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import "./i18n";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path = "/" element ={<Navigate to = "/"/>} /> */}
        <Route path = "/template" element = {<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
