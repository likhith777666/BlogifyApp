const { getUser } = require("../service/auth");

function authCheck(req, res, next) {
  const token = req.cookies.__stripe_sid;

  try {
    const user = getUser(token);
    if (user) {
      req.user = user;
      return next(); // Proceed to the next middleware only if user is authenticated
    } else {
      return res.redirect("/Static/login"); // Redirect to login if the user is not authenticated
    }
  } catch (error) {
    console.error("Error in authCheck:", error);
    return res.redirect("/Static/login"); // Redirect to login if there is an error (e.g., invalid token)
  }
}

module.exports = { authCheck };
