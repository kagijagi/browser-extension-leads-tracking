// Initialize an empty array to store leads
let myLeads = [];

// Get references to DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

// Retrieve leads from local storage if available
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// If leads exist in local storage, update myLeads and render them
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

// Add event listener to the button to save input
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
})

// Add event listener to the button to delete all leads
deleteBtn.addEventListener("dblclick", function() {
    myLeads = [];
    localStorage.clear();

    renderLeads();
})

// Render the leads to the unordered list
function renderLeads() {
    let listItems = "";

    if (myLeads.length !== 0) {
        for (let lead of myLeads) {
            listItems += `
                <li>
                    <a target='_blank' href='${lead}'>
                        ${lead}
                    </a>
                </li>
            `;
        }
    }

    ulEl.innerHTML = listItems;
}
