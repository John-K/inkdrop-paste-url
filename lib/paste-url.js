"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.pasteURL = pasteURL;

var _electron = require('electron');

function getFirstUrlFromClipboard() {
  // first try to read clipboard as html

  //var clip_text = _electron.clipboard.readHTML();
  //if (clip_text.length > 0) {
  //  const mydom = new DOMParser().parseFromString(clip_text, 'text/html')
  //  if (mydom.getElementsByTagName('a').length > 0) {
  //    return mydom.getElementsByTagName('a')[0].href
  //  }
  //}

  // else use regex on text
  var clip_text = _electron.clipboard.readText();
  if (clip_text.length > 0) {
    const re = /(http[s]?:\/\/[^\s"'<]*)/
    var results = re.exec(clip_text)
    if (results.length > 0) {
      return results[0]
    }
  }
    
  return false
}

function pasteURL() {
  try {
    // parse a URL from the clipboard
    const url = getFirstUrlFromClipboard()
    if (url === false) {
      console.log("paste-url: Clipboard does not contain a URL")
      return false
    }

    // download the webpage and grab <head><title> contents
    fetch(url).then(res=>res.text()).then(text => {
      console.log("paste-url fetching: "+url)
      var newdom = new DOMParser().parseFromString(text, 'text/html');
      const title = newdom.head.getElementsByTagName('title')[0].text;
        
      // paste the URL with title into the Note
      const cm = inkdrop.getActiveEditor().codeMirror;
      cm.replaceSelection("["+title+"]("+url+")");
    })
  } catch (err) {
    console.log("paste-url Error: "+err.message);
  }
  return true;
}