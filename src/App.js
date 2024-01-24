import React, { useEffect, useState } from 'react';
import Query1 from './query/sliderElements.jsx';
import Query2 from './query/productCards.jsx';
import TruncateTextName from './components/trancateText/trancateTextName.jsx';
import TruncateTextDescription from './components/trancateText/trancateTextDescription.jsx';
import './App.css';

function App() {
   const [renderedQueries, setRenderedQueries] = useState(false);
   
   

   return (
      <div className="webApp">
         <Query1/>
         <Query2 onRender={() => setRenderedQueries(true)} />
         {renderedQueries && <TruncateTextName/>}
         {renderedQueries && <TruncateTextDescription/>}
      </div>
   );
}

export default App;
