import { useEffect, useState } from 'react';
import Preloader from './../preloader/preloader.jsx';

function TruncateTextName({ text }) {
	const [loading, setLoading] = useState(true);

   useEffect(() => {
      const elements = document.querySelectorAll('#nameProduct');
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
    }, [text]);
 
   return (
      loading ? (<Preloader />) : (text)
   );
}
 
 export default TruncateTextName;