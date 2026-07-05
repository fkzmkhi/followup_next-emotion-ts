
import { useState, useEffect } from "react";

interface Coordinates {
	latitude: number;
	longitude: number;
}

interface LocationState {
	coordinates: Coordinates | null;
	error: string | null;
	isLoading: boolean;
}

export default function useLocation() {
	const [state, setState] = useState<LocationState>({
		coordinates: null,
		error: null,
		isLoading: true, // 初期状態は読み込み中
	});

	useEffect(() => {
		// ① SSR（サーバーサイドレンダリング）対策とブラウザサポートのチェック
		if (typeof window === "undefined" || !("geolocation" in navigator)) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setState({
				coordinates: null,
				error: "このブラウザは位置情報取得に対応していません。",
				isLoading: false,
			});
			return;
		}

		// ② 現在地を取得
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// 取得成功時にStateを更新
				setState({
					coordinates: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
					error: null,
					isLoading: false,
				});
			},
			(error) => {
				// 取得失敗時にStateとエラーメッセージを更新
				setState({
					coordinates: null,
					error: `位置情報の取得に失敗しました: ${error.message}`,
					isLoading: false,
				});
			}
		);
	}, []); // 最初のマウント時に一度だけ実行

	// コンポーネントが利用できるように状態（State）を返却する
	return state;
}
