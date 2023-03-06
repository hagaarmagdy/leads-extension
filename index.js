// chrome://extensions/

var myLeads = []
const inputBtn = document.getElementById("input-btn")
var inputEl = document.getElementById("input-el")
var listEl = document.getElementById("list-el")
const leadsLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if(leadsLocalStorage){
    myLeads = leadsLocalStorage
    render(myLeads)
}

function render(leads){
    listItem = ""
    for (var i = 0 ; i<leads.length ; i++){
        listItem += 
        `<li>
        <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
        </li>`
}
    listEl.innerHTML = listItem
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // console.log(myLeads)
    render(myLeads)
    inputEl.value=""
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    // listEl.innerText = ""
    myLeads=[]
    render(myLeads)
})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

