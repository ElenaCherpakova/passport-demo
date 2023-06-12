const indexController = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render('index', { messages });
};
module.exports = {indexController};
