let timerState = "yellow"

let timerKillButton
let pauseText

let counterHourLeftElement
let counterHourRightElement

let counterMinuteLeftElement
let counterMinuteRightElement

let counterSecondLeftElement
let counterSecondRightElement

let timerCode
let extraTimerCode

let timerValue = 0
let isPaused = false

function incrementHours() {
    if (timerState === "yellow") {
        let currentHour = Number(counterHourLeftElement.textContent + counterHourRightElement.textContent)

        if (!(currentHour + 1 > 23)) {
            if (currentHour + 1 < 10) {
                counterHourRightElement.textContent = String(currentHour + 1)
            }
            else {
                let newHour = String(currentHour + 1)
                counterHourLeftElement.textContent = newHour[0]
                counterHourRightElement.textContent = newHour[1]
            }
    }
    }
    
}

function decrementHours() {
    if (timerState === "yellow") {
        let currentHour = Number(counterHourLeftElement.textContent + counterHourRightElement.textContent)

        if (!(currentHour - 1 > 23)) {
            if (currentHour - 1 < 10) {
                if (currentHour - 1 >= 0) {
                    counterHourLeftElement.textContent = String(0)
                    counterHourRightElement.textContent = String(currentHour - 1)
                }
            }
            else {
                let newHour = String(currentHour - 1)
                counterHourLeftElement.textContent = newHour[0]
                counterHourRightElement.textContent = newHour[1]
            }
        }
    }
}

function incrementMinutes() {
    if (timerState === "yellow") {
        let currentMinute = Number(counterMinuteLeftElement.textContent + counterMinuteRightElement.textContent)

        if (!(currentMinute + 1 > 59)) {
            if (currentMinute + 1 < 10) {
                counterMinuteRightElement.textContent = String(currentMinute + 1)
            }
            else {
                let newMinute = String(currentMinute + 1)
                counterMinuteLeftElement.textContent = newMinute[0]
                counterMinuteRightElement.textContent = newMinute[1]
            }
        }
    }
}

function decrementMinutes() {
    if (timerState === "yellow") {
        let currentMinute = Number(counterMinuteLeftElement.textContent + counterMinuteRightElement.textContent)

        if (!(currentMinute - 1 > 59)) {
            if (currentMinute - 1 < 10) {
                if (currentMinute - 1 >= 0) {
                    counterMinuteLeftElement.textContent = String(0)
                    counterMinuteRightElement.textContent = String(currentMinute - 1)
                }
            }
            else {
                let newMinute = String(currentMinute - 1)
                counterMinuteLeftElement.textContent = newMinute[0]
                counterMinuteRightElement.textContent = newMinute[1]
            }
        }
    }
}

function incrementSeconds() {
    if (timerState === "yellow") {
        let currentSecond = Number(counterSecondLeftElement.textContent + counterSecondRightElement.textContent)

        if (!(currentSecond + 1 > 59)) {
            if (currentSecond + 1 < 10) {
                counterSecondRightElement.textContent = String(currentSecond + 1)
            }
            else {
                let newSecond = String(currentSecond + 1)
                counterSecondLeftElement.textContent = newSecond[0]
                counterSecondRightElement.textContent = newSecond[1]
            }
        }
    }
}

function decrementSeconds() {
    if (timerState === "yellow") {
        let currentSecond = Number(counterSecondLeftElement.textContent + counterSecondRightElement.textContent)

        if (!(currentSecond - 1 > 59)) {
            if (currentSecond - 1 < 10) {
                if (currentSecond - 1 >= 0) {
                    counterSecondLeftElement.textContent = String(0)
                    counterSecondRightElement.textContent = String(currentSecond - 1)
                }
            }
            else {
                let newSecond = String(currentSecond - 1)
                counterSecondLeftElement.textContent = newSecond[0]
                counterSecondRightElement.textContent = newSecond[1]
            }
        }
    }
}

function changeTimerState(to) {
    timerState = to

    let statusText = document.querySelector(".status-text")

    if (timerState === "green") {
        statusText.textContent = "Running"
    }

    else if (timerState === "yellow") {
        statusText.textContent = "Ready"
    }

    else {
        statusText.textContent = "Time Elapsed"
    }
}

function startTimer() {
    clearInterval(timerCode)
    let stat = document.getElementById("status")

    if (timerState === "yellow") {
        changeTimerState("green")
        stat.style.backgroundColor = '#00B622'
    }

    let currentHour = Number(counterHourLeftElement.textContent + counterHourRightElement.textContent)
    let currentMinute = Number(counterMinuteLeftElement.textContent + counterMinuteRightElement.textContent)
    let currentSecond = Number(counterSecondLeftElement.textContent + counterSecondRightElement.textContent)

    timerValue = (currentHour * 60 * 60 * 1000) + (currentMinute * 60 * 1000) + (currentSecond * 1000)

    clearInterval(timerCode)
    timerCode = setInterval(updateCounterDisplay, 1000)
}

function updateCounterDisplay() {
    if ((timerValue - 1000 < 0) || (timerValue === 0)) {
        let stat = document.getElementById("status")
        let timeUp = document.getElementById("time-up")
        let pauseText = document.querySelector(".paused")
        let extraTimeCounter = document.getElementById("extra-time-counter")

        clearInterval(timerCode)
        changeTimerState("red")
        stat.style.backgroundColor = '#FF2C00'

        extraTimerCode = setInterval(updateExtraTime, 1000)

        pauseText.style.display = 'none'
        timeUp.style.display = 'block'

        extraTimeCounter.style.display = 'block'
        extraTimeCounter.textContent = "-00:00:00"
    }

    else {
        timerValue -= 1000

        let rawHour = timerValue / 1000 / 60 / 60
        let newHour = String(Math.floor(rawHour))

        let rawMin = ((rawHour * 60 * 60) - (60 * 60 * Number(newHour))) / 60
        let newMin = String(Math.floor(rawMin)).replace('-', '')

        let newSec = String(Math.fround((rawMin * 60) - (newMin * 60)))
        
        updateDisplay()

        // Removes the decimal points from numbers with them
        function processNumber(numberString) {
            numberString = String(numberString)

            if (numberString.includes('.')) {
                return numberString.split('.')[0]
            }
            else {
                return String(numberString)
            }
        }

        // Updates the counter display
        function updateDisplay() {
            // Setting The Second
            if (newSec < 10) {
                if (newSec >= 0) {
                    if (newSec >= 0) {
                        counterSecondLeftElement.textContent = String(0)
                        counterSecondRightElement.textContent = String(newSec)
                    }
                }
            }
            else {
                let newSecond = String(newSec)
                counterSecondLeftElement.textContent = newSecond[0]
                counterSecondRightElement.textContent = newSecond[1]
            }
            
            // Settimg The Minute
            if (newMin < 10) {
                if (newMin >= 0) {
                    if (newMin >= 0) { 
                        counterMinuteLeftElement.textContent = String(0)
                        counterMinuteRightElement.textContent = String(newMin)
                    }
                }
            }
            else {
                let newMinute = String(newMin)
                counterMinuteLeftElement.textContent = newMinute[0]
                counterMinuteRightElement.textContent = newMinute[1]
            }

            // Setting the Hour
            if (newHour < 10) {
                if (newHour >= 0) {
                    if (newHour >= 0) {
                        counterHourLeftElement.textContent = String(0)
                        counterHourRightElement.textContent = String(newHour)
                    }
                }
            }
            else {
                let newHour = String(newHour)
                counterHourLeftElement.textContent = newHour[0]
                counterHourRightElement.textContent = newHour[1]
            }
        }
    }
}

function updateExtraTime() {
    let timeUp = document.getElementById("time-up")

    if (timeUp.style.backgroundColor === "rgb(250, 250, 250)") {
        timeUp.style.backgroundColor = "#ee393f"
    }

    else {
        timeUp.style.backgroundColor = "rgb(250, 250, 250)"
    }

    timerValue += 1000

    let rawHour = timerValue / 1000 / 60 / 60
    let newHour = String(Math.floor(rawHour))

    let rawMin = ((rawHour * 60 * 60) - (60 * 60 * Number(newHour))) / 60
    let newMin = String(Math.floor(rawMin)).replace('-', '')

    let newSec = String(Math.fround((rawMin * 60) - (newMin * 60)))

    let extraTimeCounter = document.getElementById("extra-time-counter")
    extraTimeCounter.style.display = 'block'

    extraTimeCounter.textContent = `-${Number(newHour) < 10 ? "0" + newHour : newHour}:${Number(newMin) < 10 ? "0" + newMin : newMin}:${Number(newSec) < 10 ? "0" + newSec : newSec}`

    // Removes the decimal points from numbers with them
    function processNumber(numberString) {
        numberString = String(numberString)

        if (numberString.includes('.')) {
            return numberString.split('.')[0]
        }
        else {
            return String(numberString)
        }
    }
}

function zeroTimer() {
    counterSecondLeftElement.textContent = String(0)
    counterSecondRightElement.textContent = String(0)

    counterMinuteLeftElement.textContent = String(0)
    counterMinuteRightElement.textContent = String(0)

    counterHourLeftElement.textContent = String(0)
    counterHourRightElement.textContent = String(0)
}

function killTimer() {
    let stat = document.getElementById("status")

    clearInterval(timerCode)
    zeroTimer()

    changeTimerState("yellow")
    stat.style.backgroundColor = '#FFFD4C'
    
    pauseText.style.display = 'none'
    timerKillButton.style.display = 'none'
}

function toggleFullscreen() {
    // document.documentElement targets the entire <html> page
    const page = document.documentElement; 
    const button = document.getElementById('fullscreenBtn');

    // Check if the page is already in full screen mode
    if (!document.fullscreenElement) {
        // If not, request full screen
        page.requestFullscreen()
            .catch(err => {
                alert(`Error trying to enable fullscreen: ${err.message}`);
            });
    } else {
        // If it is already full screen, exit it
        document.exitFullscreen();
    }
}

// Event Listeners
window.onload = () => {
    timerKillButton = document.querySelector(".kill")

    timerKillButton.addEventListener('click', killTimer)
    pauseText = document.querySelector(".paused")

    counterHourLeftElement = document.getElementById("counter-hours-left")
    counterHourRightElement = document.getElementById("counter-hours-right")

    counterHourLeftElement.addEventListener('click', decrementHours)
    counterHourRightElement.addEventListener('click', incrementHours)

    counterMinuteLeftElement = document.getElementById("counter-minutes-left")
    counterMinuteRightElement = document.getElementById("counter-minutes-right")

    counterMinuteLeftElement.addEventListener('click', decrementMinutes)
    counterMinuteRightElement.addEventListener('click', incrementMinutes)

    counterSecondLeftElement = document.getElementById("counter-seconds-left")
    counterSecondRightElement = document.getElementById("counter-seconds-right")

    counterSecondLeftElement.addEventListener('click', decrementSeconds)
    counterSecondRightElement.addEventListener("click", incrementSeconds)

    function updateTime() {
        const now = new Date()
        let timeElement = document.querySelector(".real-time")
        timeElement.textContent = now.toLocaleTimeString()
    }
    
    updateTime()
    setInterval(updateTime, 1000)

    let statusBar = document.querySelector(".status-bar")
    statusBar.addEventListener('click', () => {
        let currentHour = Number(counterHourLeftElement.textContent + counterHourRightElement.textContent)
        let currentMinute = Number(counterMinuteLeftElement.textContent + counterMinuteRightElement.textContent)
        let currentSecond = Number(counterSecondLeftElement.textContent + counterSecondRightElement.textContent)
        
        if (timerState === "yellow" && ((currentSecond !== 0) || (currentMinute > 0) || (currentHour > 0))) {
            startTimer()
        }

        else if (timerState === "red") {
            let stat = document.getElementById("status")
            let timeUp = document.getElementById("time-up")
            let extraTimeCounter = document.getElementById("extra-time-counter")

            changeTimerState("yellow")
            clearInterval(extraTimerCode)
            extraTimeCounter.textContent = ""
            extraTimeCounter.style.display = 'none'

            timeUp.style.display = 'none'
            stat.style.backgroundColor = '#FFFD4C'
        }

        else if (timerState === "green") {
            if (!isPaused) {
                pauseText.style.display = 'block'
                timerKillButton.style.display = 'block'
                isPaused = true

                clearInterval(timerCode)
            }
            else {
                pauseText.style.display = 'none'
                timerKillButton.style.display = 'none'
                isPaused = false

                clearInterval(timerCode)
                timerCode = setInterval(updateCounterDisplay, 1000)
            }
        }
    })
}