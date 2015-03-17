/*global assert, sinon, shortenText*/

(function(){

  "use strict";

  console.log = function(){};


  describe("shortenText", function() {

    it("empty text", function() {
      testShortenText("#example1", "", 2, "");
    });

    it("show whole text",  function() {
      testShortenText("#example1", "some text", 1, "some text");
    });

    it("end in the middle of word", function() {
      testShortenText("#example1", "Some simple text. Some simple text. Some simple text.", 2, "Some simple text. Some si…");
    });

    it("example2", function() {
      testShortenText("#example2", "Akelarre is iiiiiiiiiii period drama film directed by Pedro Olea.", 1, "Akelarre is iiiiiiiiiii…");
    });

    it("warn if selector returns no elements", function() {
      sinon.spy(console, "warn");

      var html = window.__html__["test/client/fixture/shortenText/shortenText.html"];
      document.querySelector("body").innerHTML = html;

      shortenText("#none", "", 1);
      console.warn.firstCall.calledWithMatch("#none");

      console.warn.restore();
    });

    function testShortenText(selector, text, maxLines, expected) {
      var html = window.__html__["test/client/fixture/shortenText/shortenText.html"];
      document.querySelector("body").innerHTML = html;

      shortenText(selector, text, maxLines);

      var result = document.querySelector(selector).textContent;
      assert.equal(result.trim(), expected);
    }

  });

})();
