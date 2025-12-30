// Initialize an empty array to store leads
let myLeads = [];

// Get references to DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");

// Add event listener to the button
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    renderLeads();
})

// Render the leads to the unordered list
function renderLeads() {
    let listItems = "";

    for (let lead of myLeads) {
        listItems += `
            <li>
                <a target='_blank' href='${lead}'>
                    ${lead}
                </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}
