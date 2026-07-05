"use client";

import { useState, useEffect } from "react";
import useLocation from "./hooks/useLocation";
import { getWeatherApi, type WeatherData } from "./api";

export default function Example4Page() {
	// ① useLocation はカスタムフックなので、トップレベルで直接呼び出します（useState の中には入れません）
	const location = useLocation();
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [isWeatherLoading, setIsWeatherLoading] = useState(false);
	const [weatherError, setWeatherError] = useState<string | null>(null);

	useEffect(() => {
		// ② 位置情報の取得が完了するまではフェッチを開始しない
		if (!location.coordinates) {
			return;
		}

		const controller = new AbortController();
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsWeatherLoading(true);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setWeatherError(null);

		// ③ getWeatherApi を非同期に呼び出し、結果を state に保存
		getWeatherApi(
			location.coordinates.latitude,
			location.coordinates.longitude,
			controller.signal
		)
			.then((data) => {
				setWeather(data);
				setIsWeatherLoading(false);
			})
			.catch((err) => {
				if (err.name === "AbortError") {
					console.log("天気情報の取得要求がキャンセルされました");
					return;
				}
				setWeatherError(err.message || "天気情報の取得に失敗しました");
				setIsWeatherLoading(false);
			});

		// クリーンアップ関数でリクエストをキャンセル可能にする
		return () => {
			controller.abort();
		};
	}, [location.coordinates]); // ④ 位置情報が更新されたら再実行する

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<h1>現在地の天気予報</h1>

			{/* ① 位置情報の取得状態の表示 */}
			{location.isLoading && <p>現在地を取得中...</p>}
			{location.error && <p style={{ color: "red" }}>{location.error}</p>}

			{/* ② 天気情報の取得状態の表示 */}
			{isWeatherLoading && <p>天気予報を読み込み中...</p>}
			{weatherError && <p style={{ color: "red" }}>{weatherError}</p>}

			{/* ③ 天気情報の表示 */}
			{weather && (
				<div style={{ marginTop: "20px" }}>
					<h2>取得結果</h2>
					<p>緯度: {weather.latitude}° / 経度: {weather.longitude}°</p>

					<h3>時間ごとの気温 (最新5件)</h3>
					<table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
						<thead>
							<tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
								<th style={{ padding: "8px" }}>時間</th>
								<th style={{ padding: "8px" }}>気温 ({weather.hourly_units.temperature_2m})</th>
								<th style={{ padding: "8px" }}>湿度 ({weather.hourly_units.relativehumidity_2m})</th>
								<th style={{ padding: "8px" }}>風速 ({weather.hourly_units.windspeed_10m})</th>
							</tr>
						</thead>
						<tbody>
							{weather.hourly.time.slice(0, 24).map((time, index) => {
								const formattedTime = new Date(time).toLocaleString("ja-JP", {
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								});
								return (
									<tr key={time} style={{ borderBottom: "1px solid #eee" }}>
										<td style={{ padding: "8px" }}>{formattedTime}</td>
										<td style={{ padding: "8px" }}>{weather.hourly.temperature_2m[index]}</td>
										<td style={{ padding: "8px" }}>{weather.hourly.relativehumidity_2m[index]}</td>
										<td style={{ padding: "8px" }}>{weather.hourly.windspeed_10m[index]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}