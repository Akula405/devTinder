function userAuth(req, res, next) {
  const token = "abcd";
  const isAuthenticated = token === "abc";
  if (!isAuthenticated) {
    res.status(401).send("not authenticated");
  } else {
    next();
  }
}
function adminAuth(req, res, next) {
  const token = "abc";
  const isAuthenticated = token === "abc";
  if (!isAuthenticated) {
    res.status(401).send("not authenticated");
  } else {
    next();
  }
}
module.exports = { userAuth, adminAuth };
