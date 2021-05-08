exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    //error message 프론트에서 활용 예정
    res.json({ status: 403, message: "로그인이 필요합니다." });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    //로그인한 상태면 302를 보내고 프론트에서 처리하도록 예정
    res.json({ status: 403, message: "로그인이 되어 있습니다." });
  }
};
