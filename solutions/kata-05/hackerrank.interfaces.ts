// Transcripción de la respuesta de https://jsonmock.hackerrank.com/api/article_users
// Viene dada: no forma parte del reto.

export interface HackerRankResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: HackerRankUser[];
}

export interface HackerRankUser {
  id: number;
  username: string;
  about: string;
  submitted: number;
  updated_at: number;
  submission_count: number;
  comment_count: number;
  created_at: number;
}
