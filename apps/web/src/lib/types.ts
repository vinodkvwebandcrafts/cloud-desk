export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  _count: {
    articles: number;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  readTime: number;
  isFeatured: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
    icon: string | null;
  };
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string | null;
  videoUrl: string;
  createdAt: string;
}

export interface SystemStatus {
  status: "operational" | "degraded" | "down";
  services: {
    database: string;
    api: string;
    support: string;
  };
  timestamp: string;
}

export interface ChatResponse {
  reply: string;
  timestamp: string;
}
