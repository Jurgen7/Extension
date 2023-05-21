let myTabs = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))
const tabBtn = document.getElementById("tab-btn")

if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage
    render(myTabs)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myTabs.push(tabs[0].url)
        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        render(myTabs)
    })
})

function render(tab) {
    let listItems = ""
    for (let i = 0; i < tab.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tab[i]}'>
                    ${tab[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myTabs = []
    render(myTabs)
})

inputBtn.addEventListener("click", function () {
    myTabs.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myTabs", JSON.stringify(myTabs))
    render(myTabs)
})
