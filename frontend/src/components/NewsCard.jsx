// NewsCard Component - Single news article card
export default function NewsCard({ article }) {
  return (
    <div className="news-card">
      {article.image && (
        <img src={article.image} alt={article.title} className="news-image" />
      )}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-source">Source: {article.source.name}</p>
        <p className="news-description">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more-btn"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
