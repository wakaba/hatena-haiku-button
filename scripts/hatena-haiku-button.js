(function () {
  var canceller = function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.hatenaHaikuButtonPanel) return;
    var buttons = document.hatenaHaikuButtons;
    if (!buttons) return;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].hatenaHaikuButtonPanel.style.display = 'none';
    }
  };
  if (window.addEventListener) {
    window.addEventListener('click', canceller, true);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', canceller);
  }
})();

function initHatenaHaikuButton (haikuButton) {
  var code = function (ev) {
    var ev = ev || window.event;
    var button = ev.target || ev.srcElement;

    if (button.hatenaHaikuButtonPanel) {
      if (button.hatenaHaikuButtonPanel.style.display == 'none') {
        button.hatenaHaikuButtonPanel.style.display = 'block';
        button.hatenaHaikuButtonPanel.style.zIndex = document.hatenaHaikuButtonLastIndex++;
      } else {
        button.hatenaHaikuButtonPanel.style.display = 'none';
      }
      if (ev.preventDefault) ev.preventDefault();
      ev.returnValue = false;
      return;
    }
    var widgetWidth = button.getAttribute('data-haiku-width') || 300;
    var widgetHeight = button.getAttribute('data-haiku-height') || 200;
    var word = button.getAttribute('data-haiku-word') || location.href;

    var id = ('haiku-widget-' + Math.random()).replace(/\./, '');
    var url = 'http://h.hatena.ne.jp/widget?word=' + encodeURIComponent(word) + '&id=' + id + '&height=' + widgetHeight + '&width=' + widgetWidth + '&scrolling=auto';

    var article = document.createElement('div');
    article.className = 'haiku-button-container';
    article.style.position = 'absolute';
    var left = button.offsetLeft;
    var top = button.offsetTop;
    var parent = button.offsetParent;
    while (parent) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    var docWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    if (docWidth < left) {
      left = docWidth - widgetWidth;
    }
    article.style.left = left + 'px';
    article.style.top = (top + button.offsetHeight) + 'px';
    document.hatenaHaikuButtonLastIndex = document.hatenaHaikuButtonLastIndex || 8191;
    article.style.zIndex = document.hatenaHaikuButtonLastIndex++;
    article.innerHTML = '<style>.haiku-button-container iframe { background-image: url(http://www.hatena.ne.jp/images/loading32.gif); background-repeat: no-repeat }</style>';
    var div = document.createElement('div');
    div.id = id;
    article.appendChild(div);
    var script = document.createElement('script');
    script.src = url;
    article.appendChild(script);
    document.body.appendChild(article);

    button.hatenaHaikuButtonPanel = article;
    document.hatenaHaikuButtons = document.hatenaHaikuButtons || [];
    document.hatenaHaikuButtons.push(button);
    if (ev.preventDefault) ev.preventDefault();
    ev.returnValue = false;
  };

  if (haikuButton) {
    var img = haikuButton;
    if (img.addEventListener) {
      img.addEventListener('click', code, false);
    } else if (img.attachEvent) {
      img.attachEvent('onclick', code);
    }
  } else {
    var images = document.images;
    var imagesLength = images.length;
    for (var i = 0; i < imagesLength; i++) {
      var img = images[i];
      if (/\bhatena-haiku-button\b/.test(img.className)) {
        if (img.addEventListener) {
          img.addEventListener('click', code, false);
        } else if (img.attachEvent) {
          img.attachEvent('onclick', code);
        }
      }
    }
  }
}
initHatenaHaikuButton();

/*

************ LICENSE ************

Copyright 2011 Wakaba.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
