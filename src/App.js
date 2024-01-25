import React, { useState } from 'react';
import SliderElements from './components/query/sliderElements.jsx';
import ProductCards from './components/query/productCards.jsx';
import TruncateTextName from './components/trancateText/trancateTextName.jsx';
import TruncateTextDescription from './components/trancateText/trancateTextDescription.jsx';
import './App.css';

function App() {
   const [renderedCards, setRenderedCards] = useState(false);

   return (
      <div className="webApp">
            <SliderElements/>
            <ProductCards onRender={() => setRenderedCards(true)} />
            {renderedCards && <TruncateTextName/>}
            {renderedCards && <TruncateTextDescription/>}
      </div>
   );
}

export default App;
