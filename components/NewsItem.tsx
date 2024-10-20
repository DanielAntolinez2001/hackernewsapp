"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { getLikedStatus, setLikedStatus } from "../utils/localStorage";

interface NewsItemProps {
  item: {
    objectID: string;
    story_url: string;
    story_title: string;
    author: string;
    created_at: string;
  };
}

export default function NewsItem({ item }: NewsItemProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(getLikedStatus(item.objectID));
  }, [item.objectID]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikedStatus(item.objectID, newLikedStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <a
        href={item.story_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          {item.story_title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          By {item.author}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(item.created_at).toLocaleString()}
          </span>
          <button
            onClick={handleLike}
            className="focus:outline-none transition-colors duration-300"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart
              className={`h-6 w-6 ${
                isLiked
                  ? "text-red-500 fill-current"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            />
          </button>
        </div>
      </a>
    </div>
  );
}
