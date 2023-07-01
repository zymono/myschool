  if (String(new URLSearchParams(location.search).get('allowedID')).includes(window.localStorage.getItem('buid'))  || new URLSearchParams(location.search).get('allowedID') == '*') {} else {
    
  }

  function permCode() {
    var pInt = new URLSearchParams(location.search).get('pInt')

    if (pInt == '1') {
      return '22344'
    } else if (pInt == '2') {
      return '33211'
    } else {
      return '88992'
    }
  }