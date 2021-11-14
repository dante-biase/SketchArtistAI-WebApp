



class Timer {
	constructor() {
		this.startTime = 0
	}
	start() {
		this.startTime = performance.now()
	}
	elapsed() {
		return performance.now() - this.startTime
	}
}

