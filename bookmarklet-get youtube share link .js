javascript:
function getYTID(link) {
  // http://localhost:8080/?text=https%3A%2F%2Fyoutu.be%2FNMswKw7nsws#/share
  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^\#\&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }
  return new Promise((resolve) => {
    resolve(youtube_parser(link))
  })
}
(function (text) {
  function getYTID(url) {
    var regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }
  text = 'https://dreamcloud.netlify.com/#/t/YouTube' + getYTID(text)

  var node = document.createElement('textarea')
  var selection = document.getSelection()
  node.textContent = text
  document.body.appendChild(node)

  selection.removeAllRanges()
  node.select()
  document.execCommand('copy')

  selection.removeAllRanges()
  document.body.removeChild(node)
  alert('copied' + text)
})(window.location.href)

 
// javascript: go(window.location.href); function go(a) { a = a.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/); a = "https://dreamcloud.netlify.com/#/t/YouTube" + (a && 11 == a[7].length ? a[7] : !1); var b = document.createElement("textarea"), c = document.getSelection(); b.textContent = a; document.body.appendChild(b); c.removeAllRanges(); b.select(); document.execCommand("copy"); c.removeAllRanges(); document.body.removeChild(b); alert("copied " + a + ' to clipboard') };