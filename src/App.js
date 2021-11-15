import './App.scss';
import {Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from './views/MainPage/MainPage';
import Page from './views/Page/Page';


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
