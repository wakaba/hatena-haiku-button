javascript:

  var links = document.links;
  var linksL = links.length;
  for (var i = 0; i < linksL; i++) {
    var link = links[i];
    if (/^http:\/\/b\.hatena\.ne\.jp\/entry\//.test(link.href)) {
      var img = document.createElement('img');
      img.src = 'http://h.hatena.ne.jp/images/haiku-button.png';
      img.className = 'hatena-haiku-button';
      img.style.verticalAlign = 'bottom';
      var url = link.href
          .replace(/^http:\/\/b\.hatena\.ne\.jp\/entry\/https\//, 'https://')
          .replace(/^http:\/\/b\.hatena\.ne\.jp\/entry\/https:\/\//, 'https://')
          .replace(/^http:\/\/b\.hatena\.ne\.jp\/entry\/http:\/\//, 'http://')
          .replace(/^http:\/\/b\.hatena\.ne\.jp\/entry\//, 'http://');
      img.setAttribute('data-haiku-word', url);
      link.parentNode.insertBefore(img, link.nextSibling);
    }
  }

  var script = document.createElement('script');
  script.src = 'https://github.com/wakaba/hatena-haiku-button/raw/master/scripts/hatena-haiku-button.js';
  document.body.appendChild(script);
  void(0);

/*

Open <http://b.hatena.ne.jp/> and execute this bookmarklet.

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
