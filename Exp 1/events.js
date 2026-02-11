const EventEmitter = require("events");
const events = new EventEmitter();
const db = require("./db");


let loginCount = 0;
let purchaseCount = 0;
let updateCount = 0;
let logoutCount = 0;

events.on("login", (user) => {
  loginCount++;
  console.log(`User ${user} logged in`);

  const userQuery = `
    INSERT INTO users (username)
    VALUES (?)
    ON DUPLICATE KEY UPDATE last_updated = CURRENT_TIMESTAMP
  `;

  db.query(userQuery, [user]);

  const logQuery = `
    INSERT INTO activity_log (username, event_type)
    VALUES (?, 'login')
  `;

  db.query(logQuery, [user]);
});

events.on("purchase", (user, item) => {
  purchaseCount++;
  console.log(`User ${user} purchased ${item}`);

  const logQuery = `
    INSERT INTO activity_log (username, event_type, item_name)
    VALUES (?, 'purchase', ?)
  `;

  db.query(logQuery, [user, item], (err) => {
    if (err) {
      console.error("DB Purchase Insert Error:", err);
    }
  });
});

events.on("update", (oldName, newName) => {
  updateCount++;
  console.log(`User ${oldName} updated profile to ${newName}`);

  const updateUserQuery = `
    UPDATE users
    SET username = ?, last_updated = CURRENT_TIMESTAMP
    WHERE username = ?
  `;

  db.query(updateUserQuery, [newName, oldName], (err) => {
    if (err) {
      console.error("User Update Error:", err);
    }
  });

  const logQuery = `
    INSERT INTO activity_log (username, event_type, item_name)
    VALUES (?, 'update', ?)
  `;

  db.query(logQuery, [oldName, newName], (err) => {
    if (err) {
      console.error("Activity Log Update Error:", err);
    }
  });
});

events.on("logout", (user) => {
  logoutCount++;
  console.log(`User ${user} logged out`);

  const logQuery = `
    INSERT INTO activity_log (username, event_type)
    VALUES (?, 'logout')
  `;

  db.query(logQuery, [user]);
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
