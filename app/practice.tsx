"use client";

import { css, keyframes, ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react"

// =========================================================================
// 📝 Emotion 基礎練習用ファイル (app/practice.tsx)
//
// ここにスタイリングコードを書き込んでいきます。
// 保存するとブラウザのプレビューに即座に反映されます。
// 各課題の「TODO」を読み、指示通りにスタイルコードを書いてみましょう！
// =========================================================================

// -------------------------------------------------------------------------
// 課題 1: cssプロップ (オブジェクト形式)
// -------------------------------------------------------------------------
// TODO: 下記の `exercise1Style` を完成させてください。
// 要件:
//   - 背景色 (backgroundColor): テーマのプライマリ色 (theme.colors.primary)
//   - 文字色 (color): 白色 (#ffffff)
//   - 内側余白 (padding): 縦12px, 横24px
//   - 角丸 (borderRadius): テーマの角丸 (theme.borderRadius.md)
//   - 枠線 (border): なし ("none")
//   - カーソル (cursor): ポインター ("pointer")
export const exercise1Style = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  backgroundColor: theme.colors.primary, // TODO: theme.colors.primary に変更してください
  color: "#fff",      // TODO: "#ffffff" に変更してください
  padding: "12px 24px",// TODO: "12px 24px" に変更してください
  borderRadius: theme.borderRadius.md,// TODO: theme.borderRadius.md に変更してください
  border: "none",// TODO: "none" に変更してください
  cursor: "pointer"// TODO: "pointer" に変更してください
  // ↑↑↑ ここまで ↑↑↑
});


// -------------------------------------------------------------------------
// 課題 2: cssプロップ (文字列/テンプレートリテラル形式) & 疑似クラス
// -------------------------------------------------------------------------
// TODO: 下記の `exercise2Style` を完成させてください。標準の CSS と同じ書式です。
// 要件:
//   - 背景色: 透明 (transparent)
//   - 文字色: テーマのテキスト色 (theme.colors.text)
//   - 枠線: 2px の実線で、色はテーマの境界線色 (theme.colors.border)
//   - ホバー時 (&:hover):
//     - 枠線色と文字色をテーマのセカンダリ色 (theme.colors.secondary) に変更
//     - 背景色をテーマの境界線色 (theme.colors.border) に変更
export const exercise2Style = (theme: any) => css`
  /* ↓↓↓ ここにスタイルを記述してください ↓↓↓ */
  background:transparent;
  color:${theme.colors.text};
  border:2px solid ${theme.colors.border};
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.md};// TODO: theme.borderRadius.md に変更してください
  outline: none;// TODO: "none" に変更してください
  cursor: pointer;
  transition: all 0.2s;
  /* ホバー時の記述例:
 
  */
   &:hover {
    color:${theme.colors.secondary};
    border-color:${theme.colors.secondary};
    background:${theme.colors.border}
  }
  /* ↑↑↑ ここまで ↑↑↑ */
`;


// -------------------------------------------------------------------------
// 課題 3: Styled コンポーネントと動的 Props
// -------------------------------------------------------------------------
// TODO: `StyledStatusBadge` という名前の div コンポーネントを完成させてください。
// 要件:
//   - React Props として `type: "info" | "success" | "danger"` を受け取ります。
//   - 共通スタイル:
//     - ディスプレイ: inline-block
//     - 内側余白: 8px 16px
//     - 角丸: テーマの丸み (theme.borderRadius.full)
//     - 文字サイズ: 14px, 太字 (600)
//   - 動的スタイル (type による背景色・文字色の分岐):
//     - "info": 背景 `#dbeafe` / 文字 `#1e40af`
//     - "success": 背景 `#d1fae5` / 文字 `#065f46`
//     - "danger": 背景 `#fee2e2` / 文字 `#991b1b`

interface BadgeProps {
  type: "info" | "success" | "danger";
}

export const StyledStatusBadge = styled.div<BadgeProps>`
  /* 共通スタイル */
  display: inline-block;
  padding: 4px 8px;
  border-radius:${(props) => props.theme.borderRadius.full};
  font-size: 14px;
  background-color: #ccc;
  color: #333;

  /* ↓↓↓ ここから動的スタイル（props.type による分岐）を追加してください ↓↓↓ */
  /* ヒント:
  \${(props) => {
    if (props.type === "success") {
      return css\`
        background-color: #d1fae5;
        color: #065f46;
      \`;
    }
    // ... 他の条件分岐
  }}
  */
  ${(props) => {
    switch (props.type) {
      case "success":
        return css`
        background-color: #d1fae5;
        color: #065f46;
      `;
      case "danger":
        return css`
          background-color: #fee2e2;
          color: #991b1b;
        `;
      case "info":
      default:
        return css`
          background-color: #dbeafe;
          color: #1e40af;
        `;

    }
  }}
  /* ↑↑↑ ここまで ↑↑↑ */
`;


// -------------------------------------------------------------------------
// 課題 4: スタイルの結合 (Composition)
// -------------------------------------------------------------------------
// 複数のスタイルを配列で合成し、上書き適用する手法の練習です。
//
// TODO: 下記の 3 つのスタイルを完成させてください。
//   - `baseCardStyle`: 全てのカードの基本スタイル (背景 surface, ボーダー, パディング)
//   - `highlightCardStyle`: ハイライト時に上書きするスタイル (セカンダリの枠線, シャドウ)
//   - `disabledCardStyle`: 無効化時に上書きするスタイル (透明度を下げ、クリック不可にする)

export const baseCardStyle = (theme: any) => css({
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing(3),
  color: theme.colors.text,
  transition: "all 0.3s ease",
});

export const highlightCardStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  // 要件:
  //   - border の色を theme.colors.secondary に変更
  //   - box-shadow に \`0 0 12px \${theme.colors.glow}\` を設定
  //   - transform で要素を上に 4px 移動 (translateY(-4px))
  border: `1px solid ${theme.colors.secondary}`,
  boxShadow: `0 0 12px ${theme.colors.glow}`,
  transform: "trasnlateY(4px)"

  // ↑↑↑ ここまで ↑↑↑
});

export const disabledCardStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  // 要件:
  //   - opacity (透明度) を 0.4 に設定
  //   - cursor を "not-allowed" に設定
  opacity: 0.4,
  cursor: "not-allowed"
  // ↑↑↑ ここまで ↑↑↑
});


// -------------------------------------------------------------------------
// 課題 5: キーフレームアニメーション
// -------------------------------------------------------------------------
// TODO: `spin` アニメーションを keyframes で定義し、
// それを使用した Styled コンポーネント `LoadingSpinner` を作成してください。
// 要件:
//   - spin アニメーション: 0% (rotate(0deg)) から 100% (rotate(360deg)) へ回転
//   - LoadingSpinner:
//     - 形状: 32px x 32px の円形
//     - ボーダー: 太さ 4px、色は透明。ただし上部のボーダーのみテーマのプライマリ色 (theme.colors.primary)
//     - 角丸: 50%
//     - アニメーション: spin アニメーションを 1秒周期で無限ループ (linear infinite)

// ↓↓↓ ここに keyframes 定義と Styled コンポーネント定義を書いてください ↓↓↓
const spin = keyframes`
  /* ここにキーフレームを記述 */
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid transparent;
  border-radius: 50%;

  /* ここにボーダースタイルとアニメーションの適用を記述 */
  border-top:4px solid ${(props) => props.theme.colors.primary};
  animation:${spin} 1s linear infinite;
`;
// ↑↑↑ ここまで ↑↑↑


// -------------------------------------------------------------------------
// 課題 6: JSX と css プロップの組み合わせ (プロファイルカード)
// -------------------------------------------------------------------------
// TODO: 下記の CSS 定義を完成させ、それらを適用した `ProfileCard` コンポーネントを JSX で出力してください。
//
// 要件 (スタイル):
//   - containerStyle: 背景 surface, padding 20px, border-radius lg, border, text-align center, 陰影
//   - avatarStyle: width 80px, height 80px, border-radius 50%, border 2px solid primary, margin-bottom 12px, object-fit cover
//   - nameStyle: font-size 18px, font-weight 700, color text, margin-bottom 4px
//   - roleStyle: font-size 14px, color textMuted
//
// 要件 (JSX 出力):
//   - 適切な HTML タグ (div, img, h4, p) を使い、各要素に `css={...}` を適用してレイアウトしてください。
//   - 画像パスには `"/favicon.ico"` を指定してください。

export const containerStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing(2.5),
  textAlign: "center",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  width: "100%",
  maxWidth: "240px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // ↑↑↑ ここまで ↑↑↑
});

export const avatarStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: `2px solid ${theme.colors.primary}`,
  marginBottom: theme.spacing(1.5),
  objectFit: "cover",
  // ↑↑↑ ここまで ↑↑↑
});

export const nameStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  fontSize: "18px",
  fontWeight: 700,
  color: theme.colors.text,
  marginBottom: "4px",
  // ↑↑↑ ここまで ↑↑↑
});

export const roleStyle = (theme: any) => css({
  // ↓↓↓ ここにスタイルを記述してください ↓↓↓
  fontSize: "14px",
  color: theme.colors.textMuted,
  margin: 0,
  // ↑↑↑ ここまで ↑↑↑
});

export function ProfileCard() {
  return (
    // ↓↓↓ ここに JSX と css プロップを記述してください ↓↓↓
    <div css={[containerStyle]}>
      <img src="/favicon.ico" css={[avatarStyle]} />
      <h4 css={[nameStyle]}>dumber</h4>
      <p css={[roleStyle]}> aaa</p>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 7: Styled サブコンポーネントとコンポーネント設計 (機能紹介カード)
// -------------------------------------------------------------------------
// styled コンポーネントで小さな部品を作り、それらを組み合わせて1つのコンポーネントを出力する練習です。
//
// TODO: `FeatureWrapper`, `FeatureTitle`, `NewBadge` という 3 つの Styled Component を完成させ、
// それらを使って `FeatureCard` コンポーネントの JSX を出力してください。
//
// 要件:
//   - FeatureWrapper: div要素。背景 surface, border, padding 16px, border-radius md, flexboxによる横並び(align-items center, justify-content space-between)
//   - FeatureTitle: h4要素。font-size 16px, color text, font-weight 600, margin 0
//   - NewBadge: span要素。背景 secondary, 文字色 #fff, font-size 11px, padding 2px 8px, border-radius full

const FeatureWrapper = styled.div`
  /* ↓↓↓ ここにスタイルを記述してください ↓↓↓ */
  background-color:${(props) => props.theme.colors.surface};
  border:1px solid ${(props) => props.theme.colors.border};
  padding: 8px;
  padding: 16px;
  border-radius:${(props) => props.theme.borderRadius.md};
  display:flex;
  align-items:center;
  justify-content:space-between;

  width:100%;
  /* ↑↑↑ ここまで ↑↑↑ */
`;

const FeatureTitle = styled.h4`
  /* ↓↓↓ ここにスタイルを記述してください ↓↓↓ */
  font-size: 16px;
  color:${(props) => props.theme.colors.text};
  font-weight:600;
  margin:0;

  /* ↑↑↑ ここまで ↑↑↑ */
`;

const NewBadge = styled.span`
  /* ↓↓↓ ここにスタイルを記述してください ↓↓↓ */
  font-size: 10px;
  background-color:${(props) => props.theme.colors.secondary};
  color:#fff;
  font-size:11px;
  padding: 2px 8px;
  border-radius:${(props) => props.theme.borderRadius.full};
  /* ↑↑↑ ここまで ↑↑↑ */
`;

interface FeatureCardProps {
  title: string;
  isNew: boolean;
}

export function FeatureCard({ title, isNew }: FeatureCardProps) {
  return (
    // ↓↓↓ ここに JSX を記述してください ↓↓↓
    <FeatureWrapper>
      <FeatureTitle>{title}  </FeatureTitle>
      {isNew && <NewBadge>NEW</NewBadge>}
    </FeatureWrapper>

  );
}


// -------------------------------------------------------------------------
// 課題 8: FlexContainer (レイアウト・汎用コンポーネント設計)
// -------------------------------------------------------------------------
// UIデザインシステム等でよく使われる、汎用レイアウトコンポーネント（Stack / Box）を作る練習です。
//
// TODO: Propsを動的に受け取り、flexレイアウトを形成する `FlexContainer` を完成させてください。
//
// 要件 (Props & スタイル):
//   - display: flex としてください。
//   - direction: "row" | "column" (デフォルト "row") -> flex-direction に割り当てる
//   - justify: string (デフォルト "flex-start") -> justify-content に割り当てる
//   - align: string (デフォルト "stretch") -> align-items に割り当てる
//   - gap: number (デフォルト 0) -> theme.spacing(gap) を使って gap に割り当てる

interface FlexContainerProps {
  direction?: "row" | "column";
  justify?: string;
  align?: string;
  gap?: number;
  children: React.ReactNode;
}

export const FlexContainer = styled.div<FlexContainerProps>`
  /* ↓↓↓ ここに Props を使ったスタイル指定を記述してください ↓↓↓ */
  display: flex; // TODO: flexに変更してください
  flex-direction: ${(props) => props.direction ?? "row"}; // TODO: props.direction があれば適用、なければ "row" になるようにアロー関数で記述
  justify-content: ${(props) => props.justify ?? "flex-start"}; // TODO: props.justify を適用
  align-items: ${(props) => props.align ?? " strech"}; // TODO: props.align を適用
  gap: ${(props) => props.theme.spacing(props.gap ?? 0)}; // TODO: props.gap を受け取り、props.theme.spacing(props.gap) になるようアロー関数で記述
  /* ↑↑↑ ここまで ↑↑↑ */
`;


// -------------------------------------------------------------------------
// 課題 9: レスポンシブ Grid コンポーネント (メディアクエリ)
// -------------------------------------------------------------------------
// 画面サイズに応じてカラム数を自動調整するレスポンシブなグリッドを設計します。
//
// TODO: メディアクエリを記述した `ResponsiveGrid` コンポーネントと、それを使用する JSX を完成させてください。
//
// 要件 (スタイル):
//   - display: grid
//   - gap: 16px
//   - 初期状態 (スマホサイズ):
//     - カラム数: 1列 (grid-template-columns: 1fr)
//   - タブレットサイズ以上 (幅 480px 以上):
//     - カラム数: 2列 (grid-template-columns: repeat(2, 1fr))
//   - デスクトップサイズ以上 (幅 768px 以上):
//     - カラム数: 3列 (grid-template-columns: repeat(3, 1fr))

export const ResponsiveGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  width:100%;
  @media (min-width: 480px) {
   grid-template-columns: repeat(2, 1fr)
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr)
   }
  /* ↓↓↓ ここにメディアクエリを記述してください ↓↓↓ */
  /* ヒント:
  
  */
  /* ↑↑↑ ここまで ↑↑↑ */
`;
export const Card = styled.div`

  background:${(props) => props.theme.colors.surface};
  padding:16px;
  border:1px solid ${(props) => props.theme.colors.border};
  border-radius:${(props) => props.theme.borderRadius.md};
`

export function ResponsiveGridDemo() {
  // TODO: `ResponsiveGrid` を使い、3枚のシンプルなカードを出力する JSX を記述してください。
  // 各カードには、背景色に theme.colors.surface, padding 16px, border を適用してください。
  return (
    // ↓↓↓ ここに JSX を記述してください ↓↓↓
    <ResponsiveGrid>

      <Card>カード1</Card>
      <Card>カード2</Card>
      <Card>カード3</Card>

    </ResponsiveGrid>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 10: Glassmorphism アラートバナー (総合演習)
// -------------------------------------------------------------------------
// これまでの集大成として、半透明のガラス効果 (glassmorphism)、疑似要素 (::before) を
// 組み合わせた美しいアラートバナーを作成します。
//
// TODO: `AlertContainer` Styled Component と、その JSX レンダリングを完成させてください。
//
// 要件 (AlertContainer):
//   - 背景色: theme.colors.surface を半透明にしたもの (例: rgba(30, 41, 59, 0.45) など)
//   - 枠線: 1px の半透明ボーダー (border: 1px solid rgba(255, 255, 255, 0.08))
//   - ガラスぼかし効果: backdrop-filter: blur(12px)
//   - padding: 16px
//   - border-radius: theme.borderRadius.md
//   - display: flex (align-items: center)
//   - position: relative;
//   - 疑似要素 ::before:
//     - 左端に縦に伸びるカラーバーを配置します。
//     - content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 4px;
//     - 背景色: theme.colors.secondary
//     - 角丸: 左側だけ丸める (border-radius: 4px 0 0 4px)

export const AlertContainer = styled.div`
  position: relative;
  /* ↓↓↓ ここに Glassmorphism と疑似要素のスタイルを記述してください ↓↓↓ */
  background-color:rgba(30, 41, 59, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  padding: 16px;
  border-radius:${props => props.theme.borderRadius.md};
  display: flex;
  align-items:center;
  position: relative;
  gap:${props => props.theme.spacing(2)};
  width:100%;
  &:before {
    content:"";
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    width:4px;
    background:${props => props.theme.colors.secondary};
    border-radius: 4px 0 0 4px;
  }
  & > span {
    font-size:20px;
  }
 
  & h4 {
    font-size:14px;
    margin:0;
  }
  & p {
       margin:0;
       font-size:12px;
  }
  /* &::before { ... } を使って左側のカラーバーを書いてください */
  /* ↑↑↑ ここまで ↑↑↑ */
`;

export function AlertBannerDemo() {
  return (
    // ↓↓↓ ここに JSX を記述し、AlertContainer の中にアイコンやメッセージを入れてください ↓↓↓
    <div css={css`width:100%;`}>
      {/* AlertContainer を使い、中に警告アイコン (⚠️など) とメッセージを配置してください */}
      <AlertContainer>
        <span>⚠️</span>
        <div>
          <h4 >理想警告バナー</h4>
          <p >これはお手本のアラートバナーです。</p>
        </div>
      </AlertContainer>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 11: PolymorphicButton (asプロップによるタグの動的変更)
// -------------------------------------------------------------------------
// UIカタログ等で同一のスタイルを保ちつつ、HTML要素を a (リンク) や button (ボタン) に切り替える
// 「ポリモーフィックコンポーネント」の練習です。
//
// TODO: button要素のデフォルトスタイルを定義した `PolymorphicButton` を作成し、
// JSX 内で as="a" などの Prop を使ってレンダリングしてください。
//
// 要件 (PolymorphicButton):
//   - padding: 10px 20px
//   - background-color: theme.colors.primary
//   - color: #fff
//   - border: none, border-radius: md
//   - cursor: pointer
//   - aタグ (リンク) としてレンダリングされた時も、下線が消えるように `text-decoration: none` を指定してください。

export const PolymorphicButton = styled.button<any>`
  /* ↓↓↓ ここにスタイルを記述してください ↓↓↓ */
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  text-decoration: none;
  transition:all 0.2s;
  &:hover {
    opacity:0.75
  }
  a& {
    background:blue;
  }
  ${props => props.as === "a" && css`text-decoration: underline;`}
  /* ↑↑↑ ここまで ↑↑↑ */
`;

export function PolymorphicButtonDemo() {
  return (
    // ↓↓↓ ここに JSX を記述し、普通のボタンと aタグ (リンク) 形式のボタンを並べてください ↓↓↓
    <div css={css`display:flex; gap:16px;`}>
      <PolymorphicButton>ボタン</PolymorphicButton>
      <PolymorphicButton as="a" href="https://example.com">リンク</PolymorphicButton>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 12: ClassNames コンポーネント (サードパーティ製ライブラリ等のスタイリング)
// -------------------------------------------------------------------------
// cssプロップやstyledを直接サポートしていない外部ライブラリ（クラス名文字列 className のみを受け取るもの）を
// Emotion でスタイリングする際に使う `<ClassNames>` ヘルパーの練習です。
//
// TODO: `<ClassNames>` を用いて、className 文字列を生成し、`MockThirdPartyComponent` に渡してください。
//
// 要件 (適用するスタイル):
//   - 背景色: theme.colors.surface
//   - 文字色: theme.colors.secondary
//   - border: 1px solid theme.colors.border
//   - padding: 12px

// ダミーの外部コンポーネント（className という文字列しか受け取れない設計）
interface ThirdPartyProps {
  className?: string;
  children: React.ReactNode;
}
export function MockThirdPartyComponent({ className, children }: ThirdPartyProps) {
  return <div className={className}>{children}</div>;
}

export function ClassNamesDemo() {
  return (
    // ↓↓↓ ClassNames コンポーネントを使用して、クラス名を生成して適用してください ↓↓↓
    <ClassNames>
      {({ css, theme }) => (
        <MockThirdPartyComponent
          className={css`
          background-color:${theme.colors.surface};
          color:${theme.colors.secondary};
          border: 1px solid ${theme.colors.border};
          padding: 12px;
          border-radius:${theme.borderRadius.md};
          `}>

          外部コンポーネントのスタイリング
        </MockThirdPartyComponent>
      )}
    </ClassNames>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 13: styledコンポーネントの継承・拡張 (styled(Existing))
// -------------------------------------------------------------------------
// 既存のコンポーネントのスタイルを再利用しつつ、新しいスタイルを追加して「継承・拡張」する練習です。
//
// TODO: `BaseInput` を継承した `SearchInput` を完成させてください。
//
// 要件 (BaseInput):
//   - padding: 8px 12px, border-radius: md, border: 1px solid theme.colors.border
// 要件 (SearchInput - BaseInputを拡張):
//   - border-color を theme.colors.primary に変更
//   - shadow 効果を追加 (box-shadow: 0 0 8px rgba(99, 102, 241, 0.2))

export const BaseInput = styled.input`
  /* ↓↓↓ ここにベーススタイルを記述してください ↓↓↓ */
  background: transparent;
  color: inherit;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border};
  transition:all 0.2s ease;
  outline:none;
   
  &:disabled {
    background:rgba(0,0,0,0.5);
    cursor:not-allowed;
  }
  /* ↑↑↑ ここまで ↑↑↑ */
`;

// TODO: BaseInput を継承・拡張した Styled Component を作成してください
export const SearchInput = styled(BaseInput)`
  /* ↓↓↓ ここに拡張するスタイルを記述してください ↓↓↓ */
  border-color: ${props => props.theme.colors.primary};
 &:focus {
    box-shadow: 0 0 8px ${props => props.theme.colors.primary};
  }
  /* ↑↑↑ ここまで ↑↑↑ */
`;

export function ExtendStyledDemo() {
  return (
    // ↓↓↓ ここに JSX を記述し、BaseInput と SearchInput の違いを比較できるように並べてください ↓↓↓
    <div css={css`display:flex; flex-direction:column; gap:16px;width:100%;`}>
      {/* BaseInput と SearchInput を並べて配置してください */}
      <BaseInput placeholder="ベースインプット"></BaseInput>
      <BaseInput placeholder="disabled" disabled></BaseInput>
      <SearchInput placeholder="サーインプット"></SearchInput>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 14: コンポーネントセレクタによる他コンポーネントの参照 (Component Referencing)
// -------------------------------------------------------------------------
// 親コンポーネントのホバーやフォーカス時などの状態に応じて、特定の「子コンポーネント」の
// スタイルを動的に変更するために、コンポーネントのクラス名や変数を直接参照する技術の練習です。
//
// TODO: `FormGroup` のフォーカス状態に応じて `FormLabel` の色を変化させてください。
//
// 要件 (FormGroup 内のスタイル定義):
//   - FormGroup がフォーカスを受けている時 (:focus-within) に、
//     その中の `FormLabel` の色を theme.colors.primary に変更してください。
//     ※セレクタとして `${FormLabel}` という変数参照を使用してください。

export const FormLabel = styled.label`
  font-size: 14px;
  color: #888;
  transition: color 0.2s ease;
`;

export const FormInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;
  color: inherit;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &:focus-within ${FormLabel} {
    color: ${props => props.theme.colors.primary}
  }

  /* ↑↑↑ ここまで ↑↑↑ */
`;

export function ComponentReferenceDemo() {
  return (
    // ↓↓↓ FormGroup, FormLabel, FormInput を使ったシンプルなフォームを出力してください ↓↓↓
    <div>
      <FormGroup>
        <FormLabel>メールアドレス</FormLabel>
        <FormInput placeholder="example@email.com" type="email"></FormInput>
      </FormGroup>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


// -------------------------------------------------------------------------
// 課題 15: データ属性 / アリア属性による状態スタイリング (Data/Aria Attribute Selector)
// -------------------------------------------------------------------------
// Headless UI (Radix, Ariakitなど) やアクセシビリティマークアップで非常によく用いられる、
// `data-state="active"` や `aria-selected="true"` などの属性セレクタを用いた条件付きスタイリングの練習です。
//
// TODO: `aria-selected="true"` 属性が付与された時に、スタイルが切り替わる `TabItem` を完成させてください。
//
// 要件 (TabItem):
//   - ボタン要素。背景透明、border: none、文字色: theme.colors.textMuted
//   - `&[aria-selected="true"]` 属性を持つ場合:
//     - 文字色: theme.colors.primary
//     - 下線を表示: border-bottom: 2px solid theme.colors.primary

export const TabItem = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  font-weight: 500;
  transition:all 0.2s ease;
  border-bottom:2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textMuted};
  
  /* ↓↓↓ ここに aria-selected="true" のセレクタ定義を記述してください ↓↓↓ */
  &[aria-selected="true"] {
    color: ${props => props.theme.colors.primary};
    border-bottom:2px solid ${props => props.theme.colors.primary};
  }
  /* ↑↑↑ ここまで ↑↑↑ */
`;

export function StateAttributeDemo() {
  const [ariaState, setAriaState] = useState(true)
  return (
    // ↓↓↓ ここに JSX を記述し、アクティブ状態(true)と非アクティブ状態(false)のタブを並べてください ↓↓↓
    <div>
      <TabItem aria-selected={ariaState} onClick={() => { setAriaState(!ariaState) }}>{ariaState ? "アクティブ" : "非アクティブ"}</TabItem>
    </div>
    // ↑↑↑ ここまで ↑↑↑
  );
}


