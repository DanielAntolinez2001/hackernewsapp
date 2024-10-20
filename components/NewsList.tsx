import NewsItem from "./NewsItem";

interface NewsItem {
  objectID: string;
  story_url: string;
  story_title: string;
  author: string;
  created_at: string;
}

interface NewsListProps {
  news: NewsItem[];
}

export default function NewsList({ news }: NewsListProps) {
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <NewsItem key={item.objectID} item={item} />
      ))}
    </div>
  );
}
