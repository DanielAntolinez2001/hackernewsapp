export function getStoredFilter(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("newsFilter");
  }
  return null;
}

export function setStoredFilter(filter: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("newsFilter", filter);
  }
}

export function getLikedStatus(id: string): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(`liked_${id}`) === "true";
  }
  return false;
}

export function setLikedStatus(id: string, status: boolean): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`liked_${id}`, status.toString());
  }
}
