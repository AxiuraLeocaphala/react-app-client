import {Route, Routes} from 'react-router-dom';
import ProductList from './components/productList/productList.jsx';
import Query1 from './query/sliderEements.jsx';
import Query2 from './query/productCards.jsx';
import './App.css';

function App() {
   return (
      <div className="webApp">
         <Query1/>
         <Routes>
            <Route index element={<ProductList/>}/>
         </Routes>
         <Query2/>
      </div>
   );
}

export default App;
