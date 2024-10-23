import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Top50 from './pages/Top50';
import Test from './components/Test';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Top50' element={<Top50/>}></Route>
        <Route path='/test' element={<Test/>}></Route>
      </Routes>
    </>
  );
}

export default App;
