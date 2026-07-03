"use client";

import React, { useState } from "react";
import Link from "next/link";
import { css, keyframes, ThemeProvider, Global, ClassNames } from "@emotion/react";
import styled from "@emotion/styled";

// ユーザーが編集する練習ファイルをインポート
import {
  exercise1Style,
  exercise2Style,
  StyledStatusBadge,
  baseCardStyle,
  highlightCardStyle,
  disabledCardStyle,
  LoadingSpinner,
  ProfileCard,
  FeatureCard,
  FlexContainer,
  ResponsiveGridDemo,
  AlertBannerDemo,
  PolymorphicButtonDemo,
  ClassNamesDemo,
  ExtendStyledDemo,
  ComponentReferenceDemo,
  StateAttributeDemo,
  MockThirdPartyComponent,
} from "./practice";

// ==========================================
// 💡 Theming & Types
// ==========================================
interface AppTheme {
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    error: string;
    glow: string;
  };
  spacing: (factor: number) => string;
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

declare module "@emotion/react" {
  export interface Theme extends AppTheme { }
}

const darkTheme: AppTheme = {
  colors: {
    primary: "#6366f1", // Indigo
    primaryHover: "#4f46e5",
    secondary: "#ec4899", // Pink
    background: "#090d16",
    surface: "#111827",
    text: "#f9fafb",
    textMuted: "#9ca3af",
    border: "#374151",
    success: "#10b981",
    error: "#ef4444",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  spacing: (factor) => `${factor * 8}px`,
  borderRadius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
};

const lightTheme: AppTheme = {
  colors: {
    primary: "#4f46e5",
    primaryHover: "#3730a3",
    secondary: "#db2777",
    background: "#f3f4f6",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
    success: "#059669",
    error: "#dc2626",
    glow: "rgba(79, 70, 229, 0.2)",
  },
  spacing: (factor) => `${factor * 8}px`,
  borderRadius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
};

interface ExampleLink {
  href: string;
  label: string;
}
const exampleLinks: Array<ExampleLink> = [
  {
    href: "/example1",
    label: "Basic Markup",
  },
  {
    href: "/example2",
    label: "Contact Form",
  },
  {
    href: "/example3",
    label: "Movie Search",
  },
  {
    href: "/example4",
    label: "Weather App",
  },
];
// ==========================================
// 💡 正解・お手本のスタイル定義 (比較用)
// ==========================================
const ideal1Style = (theme: AppTheme) => css({
  backgroundColor: theme.colors.primary,
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: theme.borderRadius.md,
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.colors.primaryHover,
  },
});

const ideal2Style = (theme: AppTheme) => css`
  background-color: transparent;
  color: ${theme.colors.text};
  border: 2px solid ${theme.colors.border};
  padding: 10px 20px;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    background-color: ${theme.colors.border};
  }
`;

const IdealStatusBadge = styled.div<{ type: "info" | "success" | "danger" }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: 14px;
  font-weight: 600;
  
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
`;

const idealBaseCardStyle = (theme: AppTheme) => css({
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing(3),
  color: theme.colors.text,
  transition: "all 0.3s ease",
});

const idealHighlightCardStyle = (theme: AppTheme) => css({
  borderColor: theme.colors.secondary,
  boxShadow: `0 0 12px ${theme.colors.glow}`,
  transform: "translateY(-4px)",
});

const idealDisabledCardStyle = (theme: AppTheme) => css({
  opacity: 0.4,
  cursor: "not-allowed",
});

const spinAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const IdealLoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid transparent;
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spinAnim} 1s linear infinite;
`;

// 💡 課題 6: お手本プロファイルカード
const idealContainerStyle = (theme: AppTheme) => css({
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
});

const idealAvatarStyle = (theme: AppTheme) => css({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: `2px solid ${theme.colors.primary}`,
  marginBottom: theme.spacing(1.5),
  objectFit: "cover",
});

const idealNameStyle = (theme: AppTheme) => css({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.colors.text,
  marginBottom: "4px",
});

const idealRoleStyle = (theme: AppTheme) => css({
  fontSize: "14px",
  color: theme.colors.textMuted,
  margin: 0,
});

function IdealProfileCard() {
  return (
    <div css={idealContainerStyle}>
      <img src="/favicon.ico" alt="Avatar" css={idealAvatarStyle} />
      <h4 css={idealNameStyle}>理想 太郎</h4>
      <p css={idealRoleStyle}>フロントエンド職人</p>
    </div>
  );
}

// 💡 課題 7: お手本機能紹介カード
const IdealFeatureWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
`;

const IdealFeatureTitle = styled.h4`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
  margin: 0;
`;

const IdealNewBadge = styled.span`
  background-color: ${(props) => props.theme.colors.secondary};
  color: #ffffff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-weight: 700;
`;

function IdealFeatureCard({ title, isNew }: { title: string; isNew: boolean }) {
  return (
    <IdealFeatureWrapper>
      <IdealFeatureTitle>{title}</IdealFeatureTitle>
      {isNew && <IdealNewBadge>NEW</IdealNewBadge>}
    </IdealFeatureWrapper>
  );
}

// 💡 課題 8: お手本 FlexContainer
interface IdealFlexContainerProps {
  direction?: "row" | "column";
  justify?: string;
  align?: string;
  gap?: number;
  children: React.ReactNode;
}
const IdealFlexContainer = styled.div<IdealFlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.theme.spacing(props.gap || 0)};
`;

// 💡 課題 9: お手本 ResponsiveGrid
const IdealResponsiveGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function IdealResponsiveGridDemo() {
  return (
    <IdealResponsiveGrid css={css`width: 100%;`}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          css={(theme) => css`
            background-color: ${theme.colors.surface};
            border: 1px solid ${theme.colors.border};
            padding: 16px;
            border-radius: ${theme.borderRadius.md};
            text-align: center;
          `}
        >
          カード {i}
        </div>
      ))}
    </IdealResponsiveGrid>
  );
}

// 💡 課題 10: お手本 AlertBanner
const IdealAlertContainer = styled.div`
  position: relative;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(30, 41, 59, 0.45);
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  color: ${(props) => props.theme.colors.text};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 4px 0 0 4px;
  }
`;

function IdealAlertBannerDemo() {
  return (
    <IdealAlertContainer>
      <span css={css`font-size: 20px;`}>⚠️</span>
      <div css={css`display: flex; flex-direction: column; gap: 2px;`}>
        <div css={css`font-weight: bold; font-size: 14px;`}>理想警告バナー</div>
        <div css={(theme) => css`font-size: 12px; color: ${theme.colors.textMuted};`}>
          これはお手本のアラートバナーです。
        </div>
      </div>
    </IdealAlertContainer>
  );
}

// 💡 課題 11: お手本 PolymorphicButton
const IdealPolymorphicButton = styled.button<any>`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

function IdealPolymorphicButtonDemo() {
  return (
    <div css={css`display: flex; gap: 12px; align-items: center;`}>
      <IdealPolymorphicButton>ボタンとして表示</IdealPolymorphicButton>
      <IdealPolymorphicButton as="a" href="https://example.com" target="_blank">
        リンクとして表示
      </IdealPolymorphicButton>
    </div>
  );
}

// 💡 課題 12: お手本 ClassNames
function IdealClassNamesDemo() {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <MockThirdPartyComponent className={cx(css`
          background-color: #111827;
          color: #ec4899;
          border: 1px solid #1f2937;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        `, "global-legacy-class")}>
          サードパーティ製コンポーネント (ClassNames)
        </MockThirdPartyComponent>
      )}
    </ClassNames>
  );
}

// 💡 課題 13: お手本 styled の継承・拡張
const IdealBaseInput = styled.input`
  padding: 8px 12px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: transparent;
  color: inherit;
  outline: none;
  transition: all 0.2s;
`;

const IdealSearchInput = styled(IdealBaseInput)`
  border-color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.2);
`;

function IdealExtendStyledDemo() {
  return (
    <div css={css`display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 240px;`}>
      <IdealBaseInput placeholder="Base Input" />
      <IdealSearchInput placeholder="Search Input (Extended)" />
    </div>
  );
}

// 💡 課題 14: お手本コンポーネント参照
const IdealFormLabel = styled.label`
  font-size: 14px;
  color: #888;
  transition: color 0.2s ease;
`;

const IdealFormInput = styled.input`
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

const IdealFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 240px;

  &:focus-within ${IdealFormLabel} {
    color: ${(props) => props.theme.colors.primary};
  }
`;

function IdealComponentReferenceDemo() {
  return (
    <IdealFormGroup>
      <IdealFormLabel>メールアドレス</IdealFormLabel>
      <IdealFormInput placeholder="example@email.com" />
    </IdealFormGroup>
  );
}

// 💡 課題 15: お手本状態属性
const IdealTabItem = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textMuted};
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &[aria-selected="true"] {
    color: ${(props) => props.theme.colors.primary};
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

function IdealStateAttributeDemo() {
  return (
    <div css={css`display: flex; gap: 8px; border-bottom: 1px solid #2d3748; width: 100%;`}>
      <IdealTabItem aria-selected="true">アクティブタブ</IdealTabItem>
      <IdealTabItem aria-selected="false">非アクティブタブ</IdealTabItem>
    </div>
  );
}

// ==========================================
// 💡 Main Application Component
// ==========================================
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  // 各自で選択できる表示モード
  const [activeTab, setActiveTab] = useState<"css1" | "css2" | "styled" | "composition" | "animation" | "jsx1" | "jsx2" | "jsx3" | "jsx4" | "jsx5" | "jsx6" | "jsx7" | "jsx8" | "jsx9" | "jsx10">("css1");

  return (
    <ThemeProvider theme={currentTheme}>
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        })}
      />

      <div
        css={(theme) => css`
          max-width: 1200px;
          margin: 0 auto;
          padding: ${theme.spacing(4)} ${theme.spacing(2)};
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: ${theme.spacing(4)};

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            padding: ${theme.spacing(2)};
          }
        `}
      >
        {/* Left Sidebar */}
        <aside
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(3)};
            top: ${theme.spacing(4)};
            height: fit-content;
          `}
        >
          {/* Header */}
          <div
            css={(theme) => css`
              padding: ${theme.spacing(2.5)};
              background-color: ${theme.colors.surface};
              border: 1px solid ${theme.colors.border};
              border-radius: ${theme.borderRadius.lg};
            `}
          >
            <h1
              css={(theme) => css`
                font-size: 1.25rem;
                font-weight: 800;
                margin-bottom: ${theme.spacing(1)};
                background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              `}
            >
              Emotion Hands-on
            </h1>
            <p
              css={(theme) => css`
                font-size: 0.85rem;
                color: ${theme.colors.textMuted};
                line-height: 1.5;
                word-break: break-all;
              `}
            >
              [app/practice.tsx](file:///Users/kouhei/Documents/GitHub/next-emotion-ts/app/practice.tsx) の TODO を埋めて、リアルタイムに変化を確認しましょう！
            </p>
          </div>
          {/* Sample Pages */}
          <div
            css={(theme) => css`
              padding: ${theme.spacing(2.5)};
              background-color: ${theme.colors.surface};
              border: 1px solid ${theme.colors.border};
              border-radius: ${theme.borderRadius.lg};
            `}
          >
            <span css={(theme) => css`font-size: 0.75rem; font-weight: bold; color: ${theme.colors.textMuted};`}>
              SAMPLE PAGES
            </span>
            <ul
              css={(theme) => css`
                margin-top: ${theme.spacing(1)};
                margin-bottom:0;
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: ${theme.spacing(1)};
                padding-left: 0;
              `}
            >
              {exampleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    css={(theme) => css`
                    display: block;
                    padding-left: ${theme.spacing(1)};
                    color: ${theme.colors.text};
                    text-decoration: none;
                    border-radius: ${theme.borderRadius.sm};
                    transition: all 0.3s ease;
                    &:hover {
                    color: ${theme.colors.primary};
                    }
                  `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>
          {/* Theme Toggle */}
          <div
            css={(theme) => css`
              padding: ${theme.spacing(2)};
              background-color: ${theme.colors.surface};
              border: 1px solid ${theme.colors.border};
              border-radius: ${theme.borderRadius.lg};
              display: flex;
              flex-direction: column;
              gap: 8px;
            `}
          >
            <span css={(theme) => css`font-size: 0.75rem; font-weight: bold; color: ${theme.colors.textMuted};`}>
              THEME SELECT
            </span>
            <div css={css`display: flex; gap: 8px;`}>
              <button
                onClick={() => setIsDarkMode(true)}
                css={(theme) => css`
                  flex: 1;
                  padding: 8px;
                  background: ${isDarkMode ? theme.colors.primary : "transparent"};
                  color: ${isDarkMode ? "#fff" : theme.colors.text};
                  border: 1px solid ${theme.colors.border};
                  border-radius: ${theme.borderRadius.sm};
                  cursor: pointer;
                  font-size: 0.8rem;
                  font-weight: 600;
                `}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setIsDarkMode(false)}
                css={(theme) => css`
                  flex: 1;
                  padding: 8px;
                  background: ${!isDarkMode ? theme.colors.primary : "transparent"};
                  color: ${!isDarkMode ? "#fff" : theme.colors.text};
                  border: 1px solid ${theme.colors.border};
                  border-radius: ${theme.borderRadius.sm};
                  cursor: pointer;
                  font-size: 0.8rem;
                  font-weight: 600;
                `}
              >
                ☀️ Light
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav
            css={(theme) => css`
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: ${theme.spacing(1.5)};
              background-color: ${theme.colors.surface};
              border: 1px solid ${theme.colors.border};
              border-radius: ${theme.borderRadius.lg};
            `}
          >
            {[
              { id: "css1", label: "課題 1: css プロップ(Object)" },
              { id: "css2", label: "課題 2: css プロップ(String)" },
              { id: "styled", label: "課題 3: StyledBadge (動的)" },
              { id: "composition", label: "課題 4: Composition (配列結合)" },
              { id: "animation", label: "課題 5: LoadingSpinner (アニメ)" },
              { id: "jsx1", label: "課題 6: JSX + css (ProfileCard)" },
              { id: "jsx2", label: "課題 7: Styled JSX (FeatureCard)" },
              { id: "jsx3", label: "課題 8: FlexContainer (設計)" },
              { id: "jsx4", label: "課題 9: ResponsiveGrid (メディア)" },
              { id: "jsx5", label: "課題 10: AlertBanner (総合)" },
              { id: "jsx6", label: "課題 11: PolymorphicButton (as)" },
              { id: "jsx7", label: "課題 12: ClassNames (外部連携)" },
              { id: "jsx8", label: "課題 13: styled(Input) (継承)" },
              { id: "jsx9", label: "課題 14: Sibling ${Child} (参照)" },
              { id: "jsx10", label: "課題 15: [aria-selected] (属性)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                css={(theme) => css`
                  width: 100%;
                  text-align: left;
                  padding: ${theme.spacing(1.25)} ${theme.spacing(1.5)};
                  border-radius: ${theme.borderRadius.md};
                  background: ${activeTab === tab.id ? theme.colors.background : "transparent"};
                  color: ${activeTab === tab.id ? theme.colors.primary : theme.colors.text};
                  border: none;
                  font-size: 0.85rem;
                  font-weight: ${activeTab === tab.id ? "600" : "500"};
                  cursor: pointer;
                  transition: all 0.2s;

                  &:hover {
                    background: ${theme.colors.background};
                    opacity: 0.85;
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Workspace */}
        <main
          css={(theme) => css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(4)};
          `}
        >
          {/* Compare Section Container */}
          <div
            css={(theme) => css`
              display: flex;
              flex-direction: column;
              gap: ${theme.spacing(3)};
            `}
          >
            {/* Header info */}
            <div>
              <h2 css={(theme) => css`font-size: 1.5rem; font-weight: 800; color: ${theme.colors.text};`}>
                {activeTab === "css1" && "課題 1: cssプロップ (オブジェクト形式)"}
                {activeTab === "css2" && "課題 2: cssプロップ (文字列・テンプレートリテラル形式)"}
                {activeTab === "styled" && "課題 3: Styled コンポーネントと動的 Props"}
                {activeTab === "composition" && "課題 4: スタイルの結合 (Composition)"}
                {activeTab === "animation" && "課題 5: キーフレームアニメーション"}
                {activeTab === "jsx1" && "課題 6: JSX と css プロップの組み合わせ (ProfileCard)"}
                {activeTab === "jsx2" && "課題 7: Styled サブコンポーネントとコンポーネント設計 (FeatureCard)"}
                {activeTab === "jsx3" && "課題 8: FlexContainer (レイアウト・汎用コンポーネント設計)"}
                {activeTab === "jsx4" && "課題 9: レスポンシブ Grid コンポーネント (メディアクエリ)"}
                {activeTab === "jsx5" && "課題 10: Glassmorphism アラートバナー (総合演習)"}
                {activeTab === "jsx6" && "課題 11: PolymorphicButton (as プロップによる HTML 要素の動的変更)"}
                {activeTab === "jsx7" && "課題 12: ClassNames コンポーネント (サードパーティ製コンポーネントとの連携)"}
                {activeTab === "jsx8" && "課題 13: Styled コンポーネントの継承・拡張 (styled(BaseComponent))"}
                {activeTab === "jsx9" && "課題 14: コンポーネント参照セレクタ (Component Selector Referencing)"}
                {activeTab === "jsx10" && "課題 15: データ属性 / アリア属性による状態スタイリング"}
              </h2>
              <p css={(theme) => css`color: ${theme.colors.textMuted}; font-size: 0.9rem; margin-top: 4px;`}>
                {activeTab === "css1" && "Object Styles 形式は TypeScript の型安全性をフルに活かせる書き方です。"}
                {activeTab === "css2" && "String Styles 形式は通常の CSS ファイルと完全に同一の構文で記述できます。"}
                {activeTab === "styled" && "styled コンポーネントに Props を渡し、その値に基づいてスタイルを動的に切り替えます。"}
                {activeTab === "composition" && "複数の css スタイルを配列として適用することで、スタイルを効果的に再利用・上書きします。"}
                {activeTab === "animation" && "Emotion の keyframes ヘルパーを使用して無限ループするアニメーションを構築します。"}
                {activeTab === "jsx1" && "CSS定義だけでなく、自分で適切なHTMLタグを書き、そこに css={(theme) => css...} プロップを適用して画面に出力する練習です。"}
                {activeTab === "jsx2" && "styled コンポーネントで小さな部品を作り、それらを親コンポーネントの JSX 内でレイアウトし出力する練習です。"}
                {activeTab === "jsx3" && "React の props を受け取り、レイアウト（フレックス方向、配置、ギャップ）を動的に制御する汎用レイアウトコンポーネントを作成する練習です。"}
                {activeTab === "jsx4" && "CSS-in-JS 内でのメディアクエリ (@media) の記述と、画面サイズに連動したグリッドシステムの実装練習です。"}
                {activeTab === "jsx5" && "背景透過、ぼかし (backdrop-filter)、および CSS 疑似要素 (::before) を駆使したモダンな Glassmorphic UI の構築練習です。"}
                {activeTab === "jsx6" && "同一のスタイル定義を持たせたまま、JSXの指定によってHTMLの出力タグ（button または aタグなど）を動的に変える as プロップの技術を学びます。"}
                {activeTab === "jsx7" && "Emotion を直接サポートしない外部ライブラリ（className 文字列だけを受け取るもの）に対して、ClassNames コンポーネントを用いてスコープ付きクラス名を渡す方法を学びます。"}
                {activeTab === "jsx8" && "既存の Styled Component のスタイル設定をベースにしつつ、特定のスタイルを追加またはオーバーライドして再利用する継承（styled(Base)）パターンを学びます。"}
                {activeTab === "jsx9" && "親子関係にあるコンポーネントにおいて、特定の状態（親のフォーカスなど）に連動して子 styled コンポーネントのスタイルを変えるために、変数を直接セレクタとして参照する高度な手法を学びます。"}
                {activeTab === "jsx10" && "Radix UI などの Headless ライブラリやアクセシビリティマークアップで多用される、aria-selected などの属性セレクタを用いたスタイリング手法を学びます。"}
              </p>
            </div>

            {/* Comparison Live Boxes */}
            <div
              css={(theme) => css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: ${theme.spacing(3)};
                @media (max-width: 640px) {
                  grid-template-columns: 1fr;
                }
              `}
            >
              {/* Box A: User's Live Work */}
              <div
                css={(theme) => css`
                  padding: ${theme.spacing(3)};
                  background-color: ${theme.colors.surface};
                  border: 1px solid ${theme.colors.border};
                  border-radius: ${theme.borderRadius.lg};
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                `}
              >
                <div css={css`display: flex; justify-content: space-between; align-items: center;`}>
                  <h4 css={(theme) => css`font-size: 0.85rem; font-weight: bold; color: ${theme.colors.secondary};`}>
                    ⚒️ ユーザーのプレビュー (practice.tsx)
                  </h4>
                  <span css={(theme) => css`font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; background: rgba(236,72,153,0.15); color: ${theme.colors.secondary};`}>
                    ライブ反映中
                  </span>
                </div>

                <div
                  css={(theme) => css`
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                    background: ${theme.colors.background};
                    border-radius: ${theme.borderRadius.md};
                    border: 1px dashed ${theme.colors.border};
                    padding: ${theme.spacing(2)};
                  `}
                >
                  {/* TAB 1 CONTENT */}
                  {activeTab === "css1" && (
                    <button css={exercise1Style}>
                      練習用ボタン 1
                    </button>
                  )}

                  {/* TAB 2 CONTENT */}
                  {activeTab === "css2" && (
                    <button css={exercise2Style}>
                      練習用ボタン 2
                    </button>
                  )}

                  {/* TAB 3 CONTENT */}
                  {activeTab === "styled" && (
                    <div css={css`display: flex; flex-direction: column; gap: 8px; align-items: center;`}>
                      <StyledStatusBadge type="info">Info Badge</StyledStatusBadge>
                      <StyledStatusBadge type="success">Success Badge</StyledStatusBadge>
                      <StyledStatusBadge type="danger">Danger Badge</StyledStatusBadge>
                    </div>
                  )}

                  {/* TAB 4 CONTENT */}
                  {activeTab === "composition" && (
                    <div css={css`display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 280px;`}>
                      <div css={baseCardStyle}>
                        通常のカード
                      </div>
                      <div css={[baseCardStyle, highlightCardStyle]}>
                        ハイライトされたカード
                      </div>
                      <div css={[baseCardStyle, disabledCardStyle]}>
                        無効化されたカード
                      </div>
                    </div>
                  )}

                  {/* TAB 5 CONTENT */}
                  {activeTab === "animation" && (
                    <div css={css`display: flex; flex-direction: column; align-items: center; gap: 8px;`}>
                      <LoadingSpinner />
                      <span css={(theme) => css`font-size: 0.8rem; color: ${theme.colors.textMuted};`}>Loading...</span>
                    </div>
                  )}

                  {/* TAB 6 CONTENT */}
                  {activeTab === "jsx1" && (
                    <ProfileCard />
                  )}

                  {/* TAB 7 CONTENT */}
                  {activeTab === "jsx2" && (
                    <div css={css`display: flex; flex-direction: column; gap: 12px; width: 100%; align-items: center;`}>
                      <FeatureCard title="最新のAIアシスタント機能" isNew={true} />
                      <FeatureCard title="従来の検索機能" isNew={false} />
                    </div>
                  )}

                  {/* TAB 8 CONTENT */}
                  {activeTab === "jsx3" && (
                    <FlexContainer direction="column" gap={2} align="center" css={css`width: 100%;`}>
                      <div css={(theme) => css`background: ${theme.colors.primary}; color: #fff; padding: 8px 16px; border-radius: 4px;`}>
                        Item 1 (Flex Column)
                      </div>
                      <div css={(theme) => css`background: ${theme.colors.secondary}; color: #fff; padding: 8px 16px; border-radius: 4px;`}>
                        Item 2 (Flex Column)
                      </div>
                    </FlexContainer>
                  )}

                  {/* TAB 9 CONTENT */}
                  {activeTab === "jsx4" && (
                    <ResponsiveGridDemo />
                  )}

                  {/* TAB 10 CONTENT */}
                  {activeTab === "jsx5" && (
                    <AlertBannerDemo />
                  )}

                  {/* TAB 11 CONTENT */}
                  {activeTab === "jsx6" && (
                    <PolymorphicButtonDemo />
                  )}

                  {/* TAB 12 CONTENT */}
                  {activeTab === "jsx7" && (
                    <ClassNamesDemo />
                  )}

                  {/* TAB 13 CONTENT */}
                  {activeTab === "jsx8" && (
                    <ExtendStyledDemo />
                  )}

                  {/* TAB 14 CONTENT */}
                  {activeTab === "jsx9" && (
                    <ComponentReferenceDemo />
                  )}

                  {/* TAB 15 CONTENT */}
                  {activeTab === "jsx10" && (
                    <StateAttributeDemo />
                  )}
                </div>
              </div>

              {/* Box B: Ideal Goal (Model Preview) */}
              <div
                css={(theme) => css`
                  padding: ${theme.spacing(3)};
                  background-color: ${theme.colors.surface};
                  border: 1px solid ${theme.colors.border};
                  border-radius: ${theme.borderRadius.lg};
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                `}
              >
                <h4 css={(theme) => css`font-size: 0.85rem; font-weight: bold; color: ${theme.colors.primary};`}>
                  🎯 目標・お手本プレビュー
                </h4>

                <div
                  css={(theme) => css`
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                    background: ${theme.colors.background};
                    border-radius: ${theme.borderRadius.md};
                    border: 1px solid ${theme.colors.border};
                    padding: ${theme.spacing(2)};
                  `}
                >
                  {/* TAB 1 CONTENT */}
                  {activeTab === "css1" && (
                    <button css={ideal1Style}>
                      目標ボタン 1
                    </button>
                  )}

                  {/* TAB 2 CONTENT */}
                  {activeTab === "css2" && (
                    <button css={ideal2Style}>
                      目標ボタン 2
                    </button>
                  )}

                  {/* TAB 3 CONTENT */}
                  {activeTab === "styled" && (
                    <div css={css`display: flex; flex-direction: column; gap: 8px; align-items: center;`}>
                      <IdealStatusBadge type="info">Info Badge</IdealStatusBadge>
                      <IdealStatusBadge type="success">Success Badge</IdealStatusBadge>
                      <IdealStatusBadge type="danger">Danger Badge</IdealStatusBadge>
                    </div>
                  )}

                  {/* TAB 4 CONTENT */}
                  {activeTab === "composition" && (
                    <div css={css`display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 280px;`}>
                      <div css={idealBaseCardStyle}>
                        通常のカード
                      </div>
                      <div css={[idealBaseCardStyle, idealHighlightCardStyle]}>
                        ハイライトされたカード
                      </div>
                      <div css={[idealBaseCardStyle, idealDisabledCardStyle]}>
                        無効化されたカード
                      </div>
                    </div>
                  )}

                  {/* TAB 5 CONTENT */}
                  {activeTab === "animation" && (
                    <div css={css`display: flex; flex-direction: column; align-items: center; gap: 8px;`}>
                      <IdealLoadingSpinner />
                      <span css={(theme) => css`font-size: 0.8rem; color: ${theme.colors.textMuted};`}>Loading...</span>
                    </div>
                  )}

                  {/* TAB 6 CONTENT */}
                  {activeTab === "jsx1" && (
                    <IdealProfileCard />
                  )}

                  {/* TAB 7 CONTENT */}
                  {activeTab === "jsx2" && (
                    <div css={css`display: flex; flex-direction: column; gap: 12px; width: 100%; align-items: center;`}>
                      <IdealFeatureCard title="最新のAIアシスタント機能" isNew={true} />
                      <IdealFeatureCard title="従来の検索機能" isNew={false} />
                    </div>
                  )}

                  {/* TAB 8 CONTENT */}
                  {activeTab === "jsx3" && (
                    <IdealFlexContainer direction="column" gap={2} align="center" css={css`width: 100%;`}>
                      <div css={(theme) => css`background: ${theme.colors.primary}; color: #fff; padding: 8px 16px; border-radius: 4px;`}>
                        Item 1 (Flex Column)
                      </div>
                      <div css={(theme) => css`background: ${theme.colors.secondary}; color: #fff; padding: 8px 16px; border-radius: 4px;`}>
                        Item 2 (Flex Column)
                      </div>
                    </IdealFlexContainer>
                  )}

                  {/* TAB 9 CONTENT */}
                  {activeTab === "jsx4" && (
                    <IdealResponsiveGridDemo />
                  )}

                  {/* TAB 10 CONTENT */}
                  {activeTab === "jsx5" && (
                    <IdealAlertBannerDemo />
                  )}

                  {/* TAB 11 CONTENT */}
                  {activeTab === "jsx6" && (
                    <IdealPolymorphicButtonDemo />
                  )}

                  {/* TAB 12 CONTENT */}
                  {activeTab === "jsx7" && (
                    <IdealClassNamesDemo />
                  )}

                  {/* TAB 13 CONTENT */}
                  {activeTab === "jsx8" && (
                    <IdealExtendStyledDemo />
                  )}

                  {/* TAB 14 CONTENT */}
                  {activeTab === "jsx9" && (
                    <IdealComponentReferenceDemo />
                  )}

                  {/* TAB 15 CONTENT */}
                  {activeTab === "jsx10" && (
                    <IdealStateAttributeDemo />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
