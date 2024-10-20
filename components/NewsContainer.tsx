"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "./NewsList";
import Pagination from "./Pagination";
import { getStoredFilter, setStoredFilter } from "../utils/localStorage";

interface NewsItem {
  objectID: string;
  story_url: string;
  story_title: string;
  author: string;
  created_at: string;
}

export default function NewsContainer() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filter, setFilter] = useState<string>(
    () => getStoredFilter() || "angular"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<{ hits: NewsItem[]; nbPages: number }>(
          `/api/news?query=${filter}&page=${currentPage - 1}`
        );
        setNews(res.data.hits);
        setTotalPages(res.data.nbPages);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [filter, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setCurrentPage(1);
    setStoredFilter(newFilter);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-700 dark:text-gray-200 appearance-none"
        >
          <option value="angular">Angular</option>
          <option value="reactjs">React</option>
          <option value="vuejs">Vue.js</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <>
          <NewsList news={news} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
