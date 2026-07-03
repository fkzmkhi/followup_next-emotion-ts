# 目的
Next.js と @emotion/react を使用して、フロントエンド中級レベルの技術（非同期処理の制御、堅牢なTypeScript型設計、Reactのレンダリング最適化）を習得するための「映画検索アプリ」をステップバイステップで実装したいです。

# 技術スタック
- React / Next.js
- TypeScript
- Emotion (@emotion/react)

# 実装するAPI (TVmaze API)
外部の無料テレビ番組・映画データベースAPI（TVmaze API）に接続して、リアルタイムにデータを検索・取得します。

# エージェントの振る舞いルール（厳守）
一気にすべてのコードを出さず、必ず【ステップ1】から順番に実装と解説を行うこと。

各ステップが終わるごとに、ユーザーが「コードを書いた」「動いた」と報告するまで待ち、その後に次のステップの指示を出すこと。

単にコードを提示するだけでなく、「なぜこの書き方をするのか」をセットで詳しく行うこと。

# APIクライアントとデータ型の定義 (api.ts)
```typescript
export interface Movie {
  id: string;
  title: string;
  summary: string;
  image: string;
  year: number;
}

export const searchMoviesApi = async (query: string, signal?: AbortSignal): Promise<Movie[]> => {
  if (!query.trim()) {
    return [];
  }

  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  interface TVMazeResult {
    show: {
      id: number;
      name: string;
      summary?: string;
      image?: {
        medium: string;
      };
      premiered?: string;
    };
  }

  return data.map((item: TVMazeResult) => {
    const cleanSummary = item.show.summary
      ? item.show.summary.replace(/<[^>]*>/g, "")
      : "No summary available";

    return {
      id: String(item.show.id),
      title: item.show.name,
      summary: cleanSummary,
      image: item.show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image",
      year: item.show.premiered ? new Date(item.show.premiered).getFullYear() : 0,　
    };
  });
};
```