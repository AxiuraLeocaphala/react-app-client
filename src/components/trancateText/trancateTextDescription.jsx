import { useEffect, useState } from 'react';
import Preloader from './../preloader/preloader.jsx';

function TruncateTextDescription({ text, onRender }) {
	const [loading, setLoading] = useState(true);

   useEffect(() => {
      const elements = document.querySelectorAll('#descriptionProduct');
      elements.forEach(element => {
         const availableHeight = element.clientHeight;
         const originalText = element.textContent;
  
         if (element.scrollHeight > availableHeight) {
            let truncatedText = originalText;
            while (element.scrollHeight > availableHeight && truncatedText.length > 0) {
               truncatedText = truncatedText.slice(0, -1);
               element.textContent = truncatedText + '...';
            }
         }
      });
		setLoading(false);
      if (typeof onRender === 'function') {
         onRender(); // Вызываем функцию обратного вызова, чтобы уведомить родительский компонент
      }
    }, [text, onRender]);
 
   return (
      loading ? (<Preloader />) : (text)
   );
}
 
 export default TruncateTextDescription;