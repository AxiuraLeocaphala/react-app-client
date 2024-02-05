import React, { useState } from 'react';
import QuerySelect from './components/query/querySelect.jsx';
import TruncateTextName from './components/trancateText/trancateTextName.jsx';
import TruncateTextDescription from './components/trancateText/trancateTextDescription.jsx';
import './App.css';

function App() {
   const [renderedCards, setRenderedCards] = useState(false);

   return (
      <div className="webApp">
         <QuerySelect onRender={() => setRenderedCards(true)} />
         {renderedCards && <TruncateTextName/>}
         {renderedCards && <TruncateTextDescription/>}
      </div>
   );
}

export default App;
