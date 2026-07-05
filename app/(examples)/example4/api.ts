export interface WeatherData {
	hourly: {
		time: string[];
		temperature_2m: number[];
		relativehumidity_2m: number[];
		weathercode: number[];
		windspeed_10m: number[];
	};
	hourly_units: {
		temperature_2m: string;
		relativehumidity_2m: string;
		windspeed_10m: string;
	};
	latitude: number;
	longitude: number;
}


export const getWeatherApi = async (lat: number, lon: number, signal?: AbortSignal): Promise<WeatherData> => {
	if (lat === undefined || lat === null || lon === undefined || lon === null) {
		throw new Error("緯度と経度が指定されていません。");
	}
	const baseUrl = "https://api.open-meteo.com/v1/forecast";
	const params = new URLSearchParams({
		latitude: lat.toString(),
		longitude: lon.toString(),
		hourly: "temperature_2m,relativehumidity_2m,weathercode,windspeed_10m",
		timezone: "Asia/Tokyo",
	});

	const url = `${baseUrl}?${params}`;

	const response = await fetch(url, { signal });
	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}
	const data: WeatherData = await response.json();
	return data;
}

