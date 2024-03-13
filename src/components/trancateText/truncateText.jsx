const TruncateText = () => {
    const truncateText = (elements) => {
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
    }

    const names = document.querySelectorAll('#nameProduct');
    const descriptions = document.querySelectorAll('#descriptionProduct');
    truncateText(names);
    truncateText(descriptions);
};
 
export default TruncateText;