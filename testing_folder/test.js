let settingsBtn = document.getElementById("settings")
let settingsPanel = document.getElementById("settings-panel")

window.onload = () => {
    settingsPanel.querySelectorAll('input').forEach((value) => {
        document.addEventListener("keydown", (event) => {
            console.log(event.target)
            if (event.target.key === value.getAttribute("key")) {
                console.log('op')
            }
        })
    })
}

settingsPanel.querySelector("form").addEventListener("submit", () => {
    settingsPanel.querySelectorAll('input').forEach((value) => {
        localStorage.setItem("preset" + value.getAttribute("key"), value.value)
    })
})

settingsBtn.addEventListener("click", () => {
    settingsPanel.showModal()
})