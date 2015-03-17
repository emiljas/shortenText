window.shortenText = (function() {

  "use strict";

  function TextShorterer(selector, text, maxLineNumber) {
    this.selector = selector;
    this.originalText = text;
    this.maxLineNumber = maxLineNumber;
    this.shortenText = "";
  }

  TextShorterer.prototype.execute = function() {
    var el = document.querySelector(this.selector);
    if(el) {

      var style = window.getComputedStyle(el);

      this.width = parseInt(style.width);
      this.testEl = this.createTestEl(el, style);
      document.body.appendChild(this.testEl);

      this.fitWords();
      if (this.ifTextMustBeShorten) {
        this.fitLetters();
        this.insertEndingChar();
      }
      el.textContent = this.shortenText;
    }
    else {
      console.warn(this.selector + " does NOT exists");
    }
  };

  TextShorterer.prototype.createTestEl = function(el, style) {
    var testEl = document.createElement(el.tagName);
    testEl.style.visibility = "hidden";
    testEl.style.position = "absolute";
    testEl.style.top = "0";
    testEl.style.left = "0";
    testEl.style.display = "inline-block";
    testEl.style.fontFamily = style.fontFamily;
    testEl.style.fontSize = style.fontSize;
    testEl.style.fontWeight = style.fontWeight;
    testEl.style.width = "auto";
    return testEl;
  };

  TextShorterer.prototype.fitWords = function() {
    var line = "";

    var lineNumber = 0;
    var parts = this.originalText.split(" ");

    for (var i = 0; i < parts.length; i++) {
      this.testEl.textContent += parts[i] + " ";

      if (this.getRealWidth(this.testEl) > this.width - 1) {
        lineNumber++;
        if (lineNumber === this.maxLineNumber) {
          break;
        }
        else {
          this.testEl.textContent = "";
          line = "";
          i--;
          continue;
        }
      }

      this.shortenText += parts[i] + " ";
      line += parts[i] + " ";
    }
    this.ifTextMustBeShorten = i !== parts.length;

    this.testEl.textContent = line;
  };

  TextShorterer.prototype.fitLetters = function() {
    var index = this.shortenText.length;

    for (var i = index; i < this.originalText.length; i++) {
      this.testEl.textContent += this.originalText[i];
      if (this.getRealWidth(this.testEl) <= this.width - 1) {
        this.shortenText += this.originalText[i];
      }
      else {
        this.testEl.textContent = this.testEl.textContent.substring(0, this.testEl.textContent.length - 1);
        break;
      }
    }
  };

  TextShorterer.prototype.insertEndingChar = function() {
    while (true) {
      this.testEl.textContent = this.testEl.textContent.substring(0, this.testEl.textContent.length - 1);
      this.testEl.textContent += "…";

      if (this.getRealWidth(this.testEl) <= this.width - 1) {
        this.shortenText = this.shortenText.substring(0, this.shortenText.length - 1);
        this.shortenText += "…";
        break;
      }
      else {
        this.testEl.textContent = this.testEl.textContent.substring(0, this.testEl.textContent.length - 1);
        this.shortenText = this.shortenText.substring(0, this.shortenText.length - 1);
      }
    }
    return this.shortenText;
  };

  TextShorterer.prototype.getRealWidth = function(el) {
    return parseInt(window.getComputedStyle(el).width);
  };

  return function(selector, text, maxLineNumber) {
    var shorterer = new TextShorterer(selector, text, maxLineNumber);
    shorterer.execute();
  };

})();
