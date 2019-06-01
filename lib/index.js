"use strict";

var _pasteURL = require("./paste-url");

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      'paste-url': () => (0, _pasteURL.pasteURL)()
    });
  },

  deactivate() {
    this.subscription.dispose();
  }
};