async function handleAction(type) {
    const user = document.getElementById("username").value || "Guest";
    const item = document.getElementById("item").value || "Generic Item";
    const output = document.getElementById("output");

    try {
        const response = await fetch(`http://localhost:3000/emit?type=${type}&user=${user}&item=${item}`);
        const data = await response.json();

        if (type === 'summary') {
            output.innerText = `EVENT SUMMARY REPORT
--------------------
Logins:    ${data.counts.login}
Logouts:   ${data.counts.logout}
Purchases: ${data.counts.purchase}
Updates:   ${data.counts.profileUpdate}`;
        } else {
            output.innerText = `[SUCCESS] ${data.message}`;
        }
    } catch (error) {
        output.innerText = "Error: Node.js server not detected on port 3000.";
    }
}