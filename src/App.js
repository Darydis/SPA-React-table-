import './App.scss';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from './components/MainPage';
import Page from './components/Page';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MainPage/>}  />
        <Route exact path='/id/:ID' element={<Page/>}  />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
