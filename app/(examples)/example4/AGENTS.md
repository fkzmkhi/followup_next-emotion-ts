# AI Agent Instructions: Frontend Interview Master Project (Weather App Edition)

## 1. 開発の目的とゴール
ユーザーがフロントエンド中級レベルの非同期処理（直列・並列のデータフェッチ、リトライ機構、エラーハンドリング）を、Next.js と Emotion を使って習得するための「タフな天気予報アプリ」を開発する。

## 2. 技術スタック
- React / Next.js
- TypeScript
- Emotion (@emotion/react)

## 3. 実装するモックAPI
プロジェクト内に以下の「通信の成功・失敗・遅延をわざと引き起こせる擬似API」を配置して使用すること。


```typescript
export interface Weather {
  city: string;
  temperature: number;
  condition: "Sunny" | "Rainy" | "Cloudy";
}

export interface ClothingRecommendation {
  text: string;
}

// 🌤️ 天気データを取得するAPI（確率でエラーや遅延が発生する）
export const fetchWeatherApi = (city: string): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 実験用：お台場（Odaiba）が指定されたら、わざと500エラーを発生させる
      if (city.toLowerCase() === "odaiba") {
        reject(new Error("天気データの取得に失敗しました（サーバーエラー: 500）"));
        return;
      }
      
      const weathers: Record<string, Weather> = {
        tokyo: { city: "Tokyo", temperature: 26, condition: "Sunny" },
        osaka: { city: "Osaka", temperature: 22, condition: "Rainy" },
        fukuoka: { city: "Fukuoka", temperature: 24, condition: "Cloudy" },
      };

      const result = weathers[city.toLowerCase()] || { city, temperature: 20, condition: "Sunny" };
      resolve(result);
    }, 1500); // 1.5秒の遅延
  });
};

// 👕 天気に合わせたおすすめの服装を取得するAPI（天気データに依存する直列処理用）
export const fetchClothingRecommendationApi = (condition: "Sunny" | "Rainy" | "Cloudy"): Promise<ClothingRecommendation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recommendations = {
        Sunny: { text: "日差しが強いです。 Tシャツにサングラスがおすすめ！" },
        Rainy: { text: "雨が降っています。傘とお気に入りの防水ジャケットを忘れずに。" },
        Cloudy: { text: "少し肌寒いかも。薄手のカーディガンがあると安心です。" },
      };
      resolve(recommendations[condition]);
    }, 1000); // 1秒の遅延
  });
};

## 4. エージェントの振る舞いルール（厳守）
一気にすべてのコードを出さず、必ず【ステップ1】から順番に実装と解説を行うこと。

各ステップが終わるごとに、ユーザーが「コードを書いた」「動いた」と報告するまで待ち、その後に次のステップの指示を出すこと。

単にコードを提示するだけでなく、以下の学習テーマをステップごとに学べるように誘導すること。

【ステップ1】直列の非同期処理（天気を取ってから、その結果を使って服装データを取る）

【ステップ2】並列の非同期処理（Promise.all / Promise.allSettled を使って複数都市の天気を同時に取る）

【ステップ3】堅牢なエラーハンドリングとリトライ機能（エラー時に「もう一度試す」ボタンで再送する）

## 5. 開始の指示
ユーザーから「天気アプリ開始」という合図があったら、【ステップ1：直列の非同期処理（useEffects / async awaitの連鎖）と画面作成】の具体的な手順を提示して、開発をスタートさせてください。面接でのアピールポイント（例: 逐次読み込みのUX低下をどう防ぐか）も解説に含めてください。