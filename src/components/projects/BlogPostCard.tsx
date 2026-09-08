import '@/styles/components/BlogPostCard.scss';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  url: string;
}

const BlogPostCard = ({ title, excerpt, date, url }: BlogPostCardProps) => {
  return (
    <a className="blog-post-card" href={url} target="_blank" rel="noreferrer">
      <div className="blog-post-card-head">
        <span className="blog-post-card-label">기술 블로그</span>
        <span className="blog-post-card-meta">velog.io · {date}</span>
      </div>
      <p className="blog-post-card-title">{title}</p>
      <p className="blog-post-card-excerpt">{excerpt}</p>
    </a>
  );
};

export default BlogPostCard;
