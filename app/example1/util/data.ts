export interface ImageItem {
    id: number;
    src: string;
    alt: string;
    title: string;

}

export interface CardItem extends ImageItem {
    description?: string;
    link?: string;
}

export const DUMMY_LOGO = {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=40&q=80",
    text: "NEXUS",
};

export const DUMMY_MV_IMAGES: ImageItem[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&h=1080&q=80",
        alt: "Premium Abstract Glassmorphism Art",
        title: "Minimalist Abstract",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&h=1080&q=80",
        alt: "Modern Architectural Design",
        title: "Modern Architecture",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&h=1080&q=80",
        alt: "Future Tech Abstract Space",
        title: "Future Network",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&h=1080&q=80",
        alt: "Creative Agency Workspace Team",
        title: "Creative Workspace",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&h=1080&q=80",
        alt: "Scenic Beach Sunset Landscape",
        title: "Natural Horizon",
    },
];

export const DUMMY_CARD_ITEMS: CardItem[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "UI/UX Design Process",
        title: "UI/UX Design",
        description: "ユーザー体験を最大化する、使いやすく美しいインターフェースを設計します。",
        link: "/example1/services/ui-ux",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Business Analytics and Charts",
        title: "Data Analytics",
        description: "複雑なデータを可視化し、ビジネスにおける意思決定を強力にサポートします。",
        link: "/example1/services/analytics",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Mobile Application Interface",
        title: "App Development",
        description: "iOS/Androidに対応した、パフォーマンスが高く洗練されたモバイルアプリを開発します。",
        link: "/example1/services/mobile-app",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Global Cloud Network Systems",
        title: "Cloud Infrastructure",
        description: "安全でスケーラブルなサーバー環境の構築から、運用の自動化までサポートします。",
        link: "/example1/services/cloud",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Artificial Intelligence and Robotics",
        title: "AI Integrations",
        description: "最新の機械学習・生成AIモデルを活用し、業務効率化や新規サービス創出を実現します。",
        link: "/example1/services/ai",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Corporate Branding Strategy",
        title: "Marketing & Branding",
        description: "ブランド認知度を向上させ、ターゲット層へ確実にアプローチするためのマーケティング戦略を展開します。",
        link: "/example1/services/branding",
    },
];
