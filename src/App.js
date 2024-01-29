import React, { useState } from 'react';
import Query from './components/query/query.jsx';
import TruncateTextName from './components/trancateText/trancateTextName.jsx';
import TruncateTextDescription from './components/trancateText/trancateTextDescription.jsx';
import './App.css';

function App() {
   const [renderedCards, setRenderedCards] = useState(false);

   return (
      <div className="webApp">
            <Query onRender={() => setRenderedCards(true)} />
            {renderedCards && <TruncateTextName/>}
            {renderedCards && <TruncateTextDescription/>}
      </div>
   );
}

export default App;
