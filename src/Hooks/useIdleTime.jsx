import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

//idleTime in min
export default function useIdle({ onIdle, idleTime }) {
	const [isIdle, setIsIdle] = useState();

	const handleOnIdle = (event) => {
		setIsIdle(true);
		getLastActiveTime();
		onIdle();
		// alert("user is idle", event);
	};

	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * idleTime,
		onIdle: handleOnIdle,
		debounce: 500,
		crossTab: true,
	});

	return {
		getRemainingTime,
		getLastActiveTime,
		isIdle,
	};
}
