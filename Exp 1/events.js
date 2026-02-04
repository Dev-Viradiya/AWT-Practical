const EventEmitter = require("events");
const events = new EventEmitter();

let loginCount = 0;
let purchaseCount = 0;
let updateCount = 0;
let logoutCount = 0;

events.on("login", (user) => {
  loginCount++;
  console.log(`User ${user} logged in`);
});

events.on("purchase", (user, item) => {
  purchaseCount++;
  console.log(`User ${user} purchased ${item}`);
});

events.on("update", (oldName, newName) => {
  updateCount++;
  console.log(`User ${oldName} updated profile to ${newName}`);
});

events.on("logout", (user) => {
  logoutCount++;
  console.log(`User ${user} logged out`);
});

events.on("summary", () => {
  console.log("\n===== EVENT SUMMARY =====");
  console.log("Login events   :", loginCount);
  console.log("Purchase events:", purchaseCount);
  console.log("Update events  :", updateCount);
  console.log("Logout events  :", logoutCount);
  console.log("=========================\n");
});

module.exports = events;
