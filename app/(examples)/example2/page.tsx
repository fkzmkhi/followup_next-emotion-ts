"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";

export default function Example2Page() {
  // TODO: ここにお問い合わせフォームのロジック、状態管理、スタイリングを実装してみましょう！

  return (
    <PageContainer>
      <FormTitle>Contact Us</FormTitle>
      <p style={{ textAlign: "center", color: "#A9ABB3" }}>
        ここに独自のフォームをスクラッチで実装していきましょう。
      </p>

      {/* 
        ヒント:
        1. フォームの送信先: POST /api/contact
        2. 状態管理: useState を使って入力値 (name, email, type, message) と送信ステータス (idle, submitting, success, error) を管理する
        3. Emotion を使ったインプットやボタンのスタイリング
      */}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing(6)} ${props => props.theme.spacing(2.5)};
  background-color: #0F1115; /* お問い合わせフォーム用のダークな背景 */
  min-height: calc(100vh - 140px);
`;

const FormTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing(2)};
`;
