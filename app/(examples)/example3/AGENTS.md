# 目的
Next.js と @emotion/react を使用して、フロントエンド中級レベルの技術（非同期処理の制御、堅牢なTypeScript型設計、Reactのレンダリング最適化）を習得するための「映画検索アプリ」をステップバイステップで実装したいです。

# 技術スタック
- React / Next.js
- TypeScript
- Emotion (@emotion/react)

# 実装するモックAPI
まず、プロジェクト内に以下の「3秒遅れてデータが返ってくる擬似API」を配置します。

# エージェントの振る舞いルール（厳守）
一気にすべてのコードを出さず、必ず【ステップ1】から順番に実装と解説を行うこと。

各ステップが終わるごとに、ユーザーが「コードを書いた」「動いた」と報告するまで待ち、その後に次のステップの指示を出すこと。

単にコードを提示するだけでなく、「なぜこの書き方をするのか」をセットで詳しく行うこと。

# モックAPIの定義
```typescript
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
}

const MOCK_MOVIES: Movie[] = [
  { id: "1", title: "Mulholland Drive", director: "David Lynch", year: 2001 },
  { id: "2", title: "Blue Velvet", director: "David Lynch", year: 1986 },
  { id: "3", title: "Eraserhead", director: "David Lynch", year: 1977 },
  { id: "4", title: "The Lobster", director: "Yorgos Lanthimos", year: 2015 },
  { id: "5", title: "The Killing of a Sacred Deer", director: "Yorgos Lanthimos", year: 2017 },
  { id: "6", title: "Poor Things", director: "Yorgos Lanthimos", year: 2023 },
];

export const searchMoviesApi = (query: string, signal?: AbortSignal): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }
      const filtered = MOCK_MOVIES.filter(
        (movie) =>
          movie.director.toLowerCase().includes(query.toLowerCase()) ||
          movie.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 3000);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
};