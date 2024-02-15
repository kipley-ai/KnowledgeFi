export function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"Bytes",
		"KB",
		"MB",
		"GB",
		"TB",
		"PB",
		"EB",
		"ZB",
		"YB",
	];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getTimeString(date: Date) {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1; // getUTCMonth returns 0-11
	const day = date.getUTCDate();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();

	// Pad single digit month, day, hours, minutes, and seconds with leading zeros
	const monthStr = month.toString().padStart(2, "0");
	const dayStr = day.toString().padStart(2, "0");
	const hoursStr = hours.toString().padStart(2, "0");
	const minutesStr = minutes.toString().padStart(2, "0");
	const secondsStr = seconds.toString().padStart(2, "0");

	// Construct the formatted time string
	const timeString = `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr} UTC`;

	return timeString;
}

export function getTimeStringLocal(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth returns 0-11
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Pad single digit month, day, hours, minutes, and seconds with leading zeros
	const monthStr = month.toString().padStart(2, "0");
	const dayStr = day.toString().padStart(2, "0");
	const hoursStr = hours.toString().padStart(2, "0");
	const minutesStr = minutes.toString().padStart(2, "0");
	const secondsStr = seconds.toString().padStart(2, "0");

	// Construct the formatted time string
	const timeString = `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr} UTC`;

	return timeString;
}
