"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { DUMMY_LOGO } from "@/app/(examples)/util/data";

export default function Header() {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Esc キーでメニューを閉じる
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus(); // ボタンにフォーカスを戻す
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <StyledHeader>
      {/* 1. ロゴエリア (SEO的・セマンティック的に div または h1 等) */}
      <LogoArea>
        <Link href="/example1">
          <Image
            src={DUMMY_LOGO.src}
            alt={DUMMY_LOGO.text}
            width={120}
            height={40}
            priority={true}
          />
        </Link>
      </LogoArea>

      {/* 2. PC用ナビゲーション (ナビゲーション要素なので <nav> を使用) */}
      <DesktopNav>
        <ul>
          <li><Link href="/example1/about">About</Link></li>
          <li><Link href="/example1/features">Features</Link></li>
          <li><Link href="/example1/contact">Contact</Link></li>
        </ul>
      </DesktopNav>

      {/* 3. スマホ用メニューボタン (アクセシビリティ対応のため <button> を使用) */}
      <MenuButton
        ref={menuButtonRef}
        aria-label="メニューを開閉"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu" /* メニュー本体のIDを指定 */
        onClick={toggleMenu}
        $isOpen={isMenuOpen} /* アニメーション用に開閉状態を渡す */
      >
        <span />
        <span />
        <span />
      </MenuButton>

      {/* 4. スマホ用ナビゲーション (ドロワーメニュー) */}
      <MobileNav
        id="mobile-menu" /* aria-controlsと紐付け */
        isOpen={isMenuOpen}
        aria-hidden={!isMenuOpen} /* 閉じている時は読み上げソフトから隠す */
      >
        <ul>
          <li><Link href="/example1/about" onClick={toggleMenu}>About</Link></li>
          <li><Link href="/example1/features" onClick={toggleMenu}>Features</Link></li>
          <li><Link href="/example1/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </MobileNav>
    </StyledHeader>
  );
}

// 構造のアウトライン用の最小限のプレースホルダー（スタイルはほぼ空）
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(2.5)} ${props => props.theme.spacing(5)};
  position: relative;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing(2.5)};
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: ${props => props.theme.zIndex.header};
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  z-index: ${props => (props.theme.zIndex.overlay ?? 1000) + 1};
`;

const DesktopNav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: ${props => props.theme.spacing(3.5)};
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    text-decoration: none;
    transition: ${props => props.theme.transitions.default};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

interface MenuButtonProps {
  $isOpen: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${props => (props.theme.zIndex.overlay ?? 1000) + 1}; /* ドロワーより前面に出す */
  display: none;
  flex-direction: column;
  gap: 6px;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: ${props => props.theme.colors.text};
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  /* ハンバーガーから『X』へのアニメーション */
  ${props => props.$isOpen && `
    span:nth-of-type(1) {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-of-type(2) {
      opacity: 0;
    }
    span:nth-of-type(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}

  @media (max-width: 768px) {
    display: flex;
  }
`;

interface MobileNavProps {
  isOpen: boolean;
}

const MobileNav = styled.nav<MobileNavProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.surface};
  z-index: ${props => props.theme.zIndex.overlay};
  
  visibility: ${props => props.isOpen ? "visible" : "hidden"};
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? "auto" : "none"};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing(4)};
    text-align: center;
  }

  a {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSizes.lg};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    text-decoration: none;
    transition: ${props => props.theme.transitions.default};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
