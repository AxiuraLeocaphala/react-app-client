import {Route, Routes} from 'react-router-dom';
import ProductList from './components/productList/productList.jsx';
import Header from './components/header/header.jsx';
import Query from './query/query.jsx'
import './App.css';

function App() {
   return (
      <div className="webApp">
         <Header/>
         <Routes>
            <Route index element={<ProductList/>}/>
         </Routes>
         <Query/>
      </div>
   );
}

export default App;
