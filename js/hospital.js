const HOURLY_PATTERNS = {
  "Gandhi Hospital":         ["high","high","high","high","medium","medium","high","high","medium","low","low"],
  "Osmania General Hospital":["medium","high","high","high","medium","medium","high","high","medium","low","low"],
  "Apollo Hospitals":        ["low","medium","high","medium","low","low","medium","medium","low","low","low"],
  "KIMS Hospital":           ["low","low","low","low","medium","low","low","low","medium","low","low"],
  "Yashoda Hospital":        ["medium","high","high","medium","medium","low","medium","medium","low","low","low"],
  /*"Continental Hospital":    ["low","low","medium","medium","high","medium","low","low","low","low","low"],
  "Care Hospital":           ["low","medium","high","medium","low","low","medium","medium","low","low","low"],
  "Niloufer Hospital":       ["high","high","high","high","medium","medium","high","high","high","medium","low"],*/
};

const HOURS = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM"];

async function seedHospitalsIfEmpty() {
  const snap = await db.collection("hospitals").limit(1).get();
  if (!snap.empty) return;
}

async function fetchHospitals() {
  const snap = await db.collection("hospitals").get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function updateCrowdLevel(hospitalId, newCrowd, adminEmail) {
  await db.collection("hospitals").doc(hospitalId).update({
    crowd: newCrowd,
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    updatedBy: adminEmail
  });
}

function listenToHospitals(callback) {
  return db.collection("hospitals")
    .onSnapshot(snap => {
      const hospitals = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(hospitals);
    });
}

function formatTimestamp(ts) {
  if (!ts) return "Never";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const now  = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60)    return "Just now";
  if (diff < 3600)  return `${Math.floor(diff/60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} hr ago`;
  return date.toLocaleDateString("en-IN", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" });
}

function getBestTime(hospitalName) {
  const pattern = HOURLY_PATTERNS[hospitalName];
  if (!pattern) return "Evening (after 5PM)";
  const idx = pattern.indexOf("low");
  return idx !== -1 ? HOURS[idx] : "Evening (after 5PM)";
}

function getHourlyPattern(hospitalName) {
  return HOURLY_PATTERNS[hospitalName] || Array(11).fill("medium");
}

function crowdColor(crowd) {
  return { low:"#22c55e", medium:"#f59e0b", high:"#ef4444" }[crowd] || "#94a3b8";
}
function crowdBg(crowd) {
  return { low:"#dcfce7", medium:"#fef9c3", high:"#fee2e2" }[crowd] || "#f1f5f9";
}
function crowdText(crowd) {
  return { low:"#15803d", medium:"#92400e", high:"#b91c1c" }[crowd] || "#64748b";
}
function waitTime(crowd) {
  return { low:"~5 min", medium:"~20 min", high:"~45+ min" }[crowd] || "Unknown";
}
function crowdEmoji(crowd) {
  return { low:"🟢", medium:"🟡", high:"🔴" }[crowd] || "⚪";
}