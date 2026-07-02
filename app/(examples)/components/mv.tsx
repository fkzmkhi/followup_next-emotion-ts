"use client";


import styled from "@emotion/styled";
// @ts-expect-error - react-splide type exports are not resolved correctly by TypeScript bundler settings
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import { DUMMY_MV_IMAGES } from "../util/data";

// Splide のデフォルトスタイルシートをインポート
import "@splidejs/react-splide/css";

export default function Mv() {
  return (
    <StyledMv>
      <SliderWrapper>
        <Splide
          options={{
            type: "fade", // フェードアニメーション
            rewind: true,
            autoplay: true,
            interval: 5000, // 5秒ごとにスライド
            speed: 1200,
            arrows: false,
            pagination: true,
            pauseOnHover: false,
            height: "60vh",
          }}
        >
          {DUMMY_MV_IMAGES.map((slide) => (
            <SplideSlide key={slide.id}>
              <SlideContent>
                {/* 1. 背景画像 (Next.js Image による最適化) */}
                <BackgroundImageWrapper>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    priority={slide.id === 1} // 最初のスライドのみ最優先ロード
                    style={{ objectFit: "cover" }}
                  />
                  {/* 可読性を保つための暗めグラデーションのオーバーレイ */}
                  <Overlay />
                </BackgroundImageWrapper>

                {/* 2. テキストおよびコンテンツの重ね合わせ */}
                <TextOverlay>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <SlideDescription>
                    Emotion と Splide.js を組み合わせて作成されたレスポンシブスライダー。
                  </SlideDescription>

                </TextOverlay>
              </SlideContent>
            </SplideSlide>
          ))}
        </Splide>
      </SliderWrapper>
    </StyledMv>
  );
}

const StyledMv = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  width: 100%;
  /* 下部のインジケーター（ドット）のカスタムスタイル */
  .splide__pagination {
    bottom: 24px;
  }

  .splide__pagination__page {
    background: ${props => props.theme.colors.surface};
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;

    &.is-active {
      background: ${props => props.theme.colors.text};
      transform: scale(1.4);
    }
  }
`;

const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(9, 13, 22, 0.3) 0%,
    rgba(9, 13, 22, 0.8) 100%
  );
  z-index: 2;
`;

const TextOverlay = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  color: #ffffff;
  max-width: 640px;
  padding: 0 24px;
`;

const SlideTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: 16px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
`;

const SlideDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.md};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 28px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  line-height: 1.6;
`;
