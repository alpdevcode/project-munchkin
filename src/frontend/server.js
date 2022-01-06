// Connect to Server
// Server URL and App ID are defined in a configuration file
Moralis.start({ serverUrl, appId });


// User Login and Logout
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate();
    }
    console.log("logged in user:", user);
    getStats();
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}


// Event Binding
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-get-stats").onclick = getStats;


// Historical Transactions of User
function getStats() {
    const user = Moralis.User.current();
    if (user) {
      getUserTransactions(user);
    }
    getAverageGasPrices();
  }
  
async function getUserTransactions(user) {
    // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));

    // subscribe to query updates ** add this**
    const subscription = await query.subscribe();
    handleNewTransaction(subscription);

    // run query
    const results = await query.find();
    console.log("user transactions:", results);
}

async function handleNewTransaction(subscription) {
    // log each new transaction
    subscription.on("create", function(data) {
      console.log("new transaction: ", data);
    });
}

async function getAverageGasPrices() {
    const results = await Moralis.Cloud.run("getAvgGas");
    console.log("average user gas prices:", results);

    // show in the GUI
    renderGasStats(results);
}

function renderGasStats(data) {
    const container = document.getElementById("gas-stats");
    container.innerHTML = data
      .map(function (row, rank) {
        return `<li>#${rank + 1}: ${Math.round(row.avgGas)} gwei</li>`;
      })
      .join("");
}