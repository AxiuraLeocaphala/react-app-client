import React, { useState } from 'react';
import Query from './components/query/query.jsx';
import TruncateTextName from './components/trancateText/trancateTextName.jsx';
import TruncateTextDescription from './components/trancateText/trancateTextDescription.jsx';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {
   const [renderedCards, setRenderedCards] = useState(false);

   console.log(tg.initDataUnsafe.user.id);

   return (
      <div className="webApp">
         <Query onRender={() => setRenderedCards(true)} />
         {renderedCards && <TruncateTextName/>}
         {renderedCards && <TruncateTextDescription/>}
      </div>
   );
}

export default App;
