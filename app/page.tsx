import { Suspense } from "react";
import NewsContainer from "../components/NewsContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Hacker News
        </h1>
        <Suspense
          fallback={
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading...
            </div>
          }
        >
          <NewsContainer />
        </Suspense>
      </div>
    </div>
  );
}
