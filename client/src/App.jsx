import './App.css';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';
import GuestRoute from './util/GuestRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<GuestRoute/>}>
        <Route exact path="/" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
