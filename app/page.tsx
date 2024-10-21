"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsContainer from "../components/NewsContainer";
import FavoriteNewsContainer from "../components/FavoriteNewsContainer";
import { getStoredFilter, setStoredFilter } from "../utils/localStorage";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("angular");

  useEffect(() => {
    const storedFilter = getStoredFilter();
    if (storedFilter) {
      setActiveFilter(storedFilter);
    }
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    setStoredFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Hacker News</h1>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <NewsContainer
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>
          <TabsContent value="favorites">
            <FavoriteNewsContainer
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
