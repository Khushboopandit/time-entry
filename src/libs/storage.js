// constant value
const DATA_KEY = "data-key";
const Current_User = "currentUser";
const Time_Entries = "time-entries";
// add new user
async function setUser(data) {
  let users = await getUsers();
  users = JSON.parse(users || "[]");
  users.push(data);
  var auth = {};
  Object.assign(auth, { isLogin: true });
  Object.assign(auth, data);
  await localStorage.setItem(DATA_KEY, JSON.stringify(users));
  await localStorage.setItem(Current_User, JSON.stringify(auth));
}
// auth user
async function authUser(data) {
  var auth = {};
  Object.assign(auth, { isLogin: true });
  Object.assign(auth, data);
  await localStorage.setItem(Current_User, JSON.stringify(auth));
}
// remove auth
async function logoutUser() {
  let user = await checkUser(),
    entries = [];
  Object.assign(user, { isLogin: false });

  await localStorage.setItem(Current_User, JSON.stringify(user));
  await localStorage.setItem(Time_Entries, JSON.stringify(entries));
}
// access all the users
async function getUsers() {
  const to_return = await localStorage.getItem(DATA_KEY);
  return to_return;
}

// get info of a user
async function checkUser() {
  const user = await localStorage.getItem(Current_User);
  return user;
}

// store time entries
async function saveTimeEntries(data) {
  let entries = await getTimeEntries();
  entries = JSON.parse(entries || "[]");
  entries.push(data);
  await localStorage.setItem(Time_Entries, JSON.stringify(entries));
}

async function getTimeEntries() {
  const entries = await localStorage.getItem(Time_Entries);
  return entries;
}

export {
  setUser,
  getUsers,
  checkUser,
  logoutUser,
  authUser,
  getTimeEntries,
  saveTimeEntries,
};
