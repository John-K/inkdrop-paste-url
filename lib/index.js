"use strict";

module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
      'paste-url:paste-url': () => require("./paste-url").pasteURL()
    });
  },

  deactivate() {
    this.subscription.dispose();
  }
}