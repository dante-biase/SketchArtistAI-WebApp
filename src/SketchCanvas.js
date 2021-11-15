
class SketchCanvas extends Canvas {
    constructor(id) {
        super(id)
        this.dragging = false
        this.cursor = document.getElementById("cursor")
        this.timer = new Timer()
        this.setBrushSize(10)

        const self = this
        this.canvas.addEventListener('mouseenter', () => self.cursor.style.display = "block")
        this.canvas.addEventListener('mouseleave', () => {
            if (this.dragging) {
                this._endDraw()
            }
            self.cursor.style.display = "none"
        })
        this.canvas.addEventListener('mousedown', this._startDraw.bind(this))
        this.canvas.addEventListener('mousemove', this._continueDraw.bind(this))
        this.canvas.addEventListener('mouseup', this._endDraw.bind(this))
        this.canvas.addEventListener('wheel', this._changeBrushSize.bind(this))
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault())

        this.disabled = false
    }
    setBrushSize(v) {
        this.brushRadius = v
        this.context.lineWidth = v * 2
        this.cursor.style.height = this.cursor.style.width = (v * 2) + "px"
    }
    _changeBrushSize(e) {
        e.preventDefault()
        let brushRadius = this.brushRadius + (e.deltaY * -0.01)
        brushRadius = Math.min(Math.max(1, brushRadius), 30)
        this.setBrushSize(brushRadius)
    }
    _startDraw(e) {
        if (this.disabled) return
        this.onStartDraw()
        this.dragging = true
        this._continueDraw(e)
    }
    _continueDraw(e) {
        this.cursor.style.left = e.clientX + "px",
        this.cursor.style.top = e.clientY + "px";
        
        if (this.dragging) {
            this.timer.start()
            const rect = this.canvas.getBoundingClientRect();
            const X = e.clientX - rect.left, Y = e.clientY - rect.top
            this.context.globalCompositeOperation = e.which === 1 ? "source-over" : "destination-out"
            this.context.lineTo(X, Y)
            this.context.stroke()
            this.context.beginPath()
            this.context.arc(X, Y, this.brushRadius, 0, 2 * Math.PI)
            this.context.fill()
            this.context.beginPath()
            this.context.moveTo(X, Y)
        }
    }
    _endDraw() {
        this.context.beginPath()
        this.dragging = false
        const timeout = 2000
        setTimeout(() => {
            if (this.timer.elapsed() >= timeout) {
                this.onEndDraw()
            }
        }, timeout)
    }
    onStartDraw() {}
    onEndDraw() {}
}






