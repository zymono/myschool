// import { checkIfUser } from './backend/account.js'
// checkIfUser()
  if (window.localStorage.getItem('uid') == null) {
    window.location.href = '/auth/?b=' + window.location
  } else {
        console.log('%cBe Careful Do Not Paste Anything Here If You Don\'t Know What You Are Doing, It Could Give Hackers Access To Your Account!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cIf you do know what you are doing you should contribute to our development at https://zymono.com/contribute!', 'color: green; font-size: 20px;');
    console.log('%cDo NOT abuse bugs in any Zymono systems!', 'color: orange; font-size: 20px;');
  }