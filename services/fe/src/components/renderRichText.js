export const renderRichText = (text) => {
  return (
    text
      // Images
      .replace(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g, (match, alt, url) => {
        const decodedUrl = url
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        return `<img src="${decodedUrl}" alt="${alt}" loading="lazy" />`;
      })

      // Links
      // .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        const decodedUrl = url
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        return `<a href="${decodedUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      })

      // Code blocks
      .replace(/```\s*([\s\S]*?)\s*```/g, '<pre class="code-block">$1</pre>')

      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // Italic
      // .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '<em>$1</em>')

      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del>$1</del>')

      // Blockquotes
      // .replace(/>\s*([^\n>]+)/g, '<blockquote class="quote">$1</blockquote>')

      // Line breaks
      .replace(/\n/g, '<br>')
  );
};