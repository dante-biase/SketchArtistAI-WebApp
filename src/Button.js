

HTMLButtonElement.prototype.disable = function() {
    this.disabled = true
    this.style.opacity = 0.5
}

HTMLButtonElement.prototype.enable = function() {
    this.disabled = false
    this.style.opacity = 1
}