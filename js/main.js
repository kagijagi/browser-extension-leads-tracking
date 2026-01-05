// diagnostic logs
//console.log("chrome:", chrome);
//console.log("chrome.storage:", chrome?.storage);

// Initialize an empty array to store leads
let myLeads = [];

// Get references to DOM elements
const inputEl = document.getElementById("input-el");

const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const ulEl = document.getElementById("ul-el");

// Load leads from chrome.storage on popup open
chrome.storage.local.get("myLeads", function (result) {
    if (result.myLeads) {
        myLeads = result.myLeads;
        render(myLeads);
    }
});

// Render the leads to the unordered list
function render(leads) {
    let listItems = "";

    if (leads.length !== 0) {
        for (let lead of leads) {
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

// Add event listener to the button to save input
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    chrome.storage.local.set({ myLeads });
    render(myLeads);
})

// Add event listener to the button to save the current tab URL
tabBtn.addEventListener("click", function() {
    // Use Chrome Tabs API to get the active tab
    chrome.tabs.query(
        {active: true, currentWindow: true}, // Query for the active tab in the current window
        function(tabs) { // Callback function to handle the result
            const activeTab = tabs[0];
            myLeads.push(activeTab.url);

            chrome.storage.local.set({ myLeads });
            render(myLeads);
        }
    );
});

// Add event listener to the button to delete all leads
deleteBtn.addEventListener("dblclick", function() {
    myLeads = [];
    chrome.storage.local.remove("myLeads");

    render(myLeads);
})
