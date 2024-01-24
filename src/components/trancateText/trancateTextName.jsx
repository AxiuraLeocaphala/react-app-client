import { useEffect } from 'react';

function TruncateTextName({ text }) {
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
    }, [text]);
 
   return text;
}
 
 export default TruncateTextName;