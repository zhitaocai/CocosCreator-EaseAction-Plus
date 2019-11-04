export const easeExponentialOutIn = {
	/**
	 * @param time [0, 1]
	 */
	easing: (time: number) => {
		if (time == 0 || time == 1) {
			return time;
		} else if (time < 0.5) {
			return 0.5 * (1 - Math.pow(2, -10 * (time / 0.5)));
		} else if (time == 0.5) {
			return 0.5;
		} else {
			return 0.5 + 0.5 * Math.pow(2, 10 * ((time - 0.5) / 0.5 - 1));
		}
	},
	reverse: () => {
		cc.easeCircleActionOut;
		return cc.easeExponentialInOut();
	}
};

export const easeCircleOutIn = {
	/**
	 * @param time [0, 1]
	 */
	easing: (time: number) => {
		if (time >= 0 && time <= 0.5) {
			return 0.5 * Math.sqrt(1 - Math.pow(time / 0.5 - 1, 2));
		} else {
			return 0.5 + 0.5 * (1 - Math.sqrt(1 - Math.pow((time - 0.5) / 0.5, 2)));
		}
	},
	reverse: () => {
		// return _easeCircleActionInOut;
	}
};

export const easeBoomEffect = {
	/**
	 * @param time [0, 1]
	 */
	easing: (time: number) => {
		let bp1 = 0.3,
			bp2 = 0.8,
			x1 = 0.3,
			y1 = 0.5 * (1 - Math.pow(2, -10 * (0.3 / 0.5))),
			x2 = 0.31,
			y2 = 0.5 * (1 - Math.pow(2, -10 * (0.31 / 0.5))),
			a = (y2 - y1) / (x2 - x1),
			b = y1 - a * x1;

		if (time == 0 || time == 1) {
			return time;
		} else if (time < bp1) {
			return 0.5 * (1 - Math.pow(2, -10 * (time / 0.5)));
		} else if (time < bp2) {
			return a * time + b;
		} else {
			return a * bp2 + b + (1 - (a * bp2 + b)) * (1 - Math.sqrt(1 - Math.pow((time - bp2) / (1 - bp2), 2)));
			// return a * bp2 + b + (1 - (a * bp2 + b)) * Math.pow((time - bp2) / (1 - bp2), 2);
			// return a * bp2 + b;
		}
	},
	reverse: () => {
		return cc.easeExponentialInOut();
	}
};
