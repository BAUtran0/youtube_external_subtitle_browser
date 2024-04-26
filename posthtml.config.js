module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        WEBPAGE_TITLE: process.env.WEBPAGE_TITLE
      }
    }
  }
};
