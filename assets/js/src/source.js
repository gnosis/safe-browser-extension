// TODO LIST extension -----------------
// [] - Create the 3 screens for transactions
// [] - Detect if capslock is enabled when typing passwords (when setting password and when unlocking)
// [] - On click pencil/edit in safe menu, make Safe name contenteditable (HTML5)
// [] - When Safe menu open, allow user to click outside menu area to close it
// [] - error validation styles for whitelist settings view
// [] - Should we reset scroll position of the whitelist, when closing it?
// [] - DISABLED states for input fields
// [] - Transaction modal > Identify method form list to inform the user
// [] - WHen OFFLINE/NETWORK errors > Show error banner + in transaction modal > show that they are offline (like banner)
// [] - Transaction modal > preparing transaction state
// [] - Icons
// -------------------------------------

  function setView (view = "welcome") {
    let allViews = document.querySelectorAll(".extension")
    for (let i = 0; i < allViews.length; i++) {
      allViews[i].classList.remove('show')
      allViews[i].classList.add('hide')
    }
    console.log(`Current active view = ${view}`)
    let activeView = document.querySelectorAll(`.extension.${view}`)[0].classList.remove('hide')
  }

  function toggleDisclaimer () {
    document.querySelectorAll(".disclaimer")[0].classList.toggle('show')
    document.querySelectorAll(".welcome .extension-inner")[0].classList.toggle('blur')
  }

  function toggleLock () {
    let lock = document.querySelectorAll(".extension .lockedState")[0]
    let isLocked = lock.getAttribute('data-locked')
    console.log('extension is ' + isLocked)
    if (isLocked == "true") {
      lock.setAttribute('data-locked', 'false')
      // Show unlock screen
      setView('unlockSafe')
    } else {
      lock.setAttribute('data-locked', 'true')
    }
  }

  function setWhiteListState (state) {
    let whitelister = document.querySelectorAll('.whitelister')[0]
    whitelister.setAttribute('data-whitelisted', state)
  }

  function toggleEditSafeName () {

  }

  function toggleDrawerMenu () {
    let menus = document.querySelectorAll('.safeDrawerMenu')
    for (let i = 0; i < menus.length; i++) {
      menus[i].classList.toggle('active')
    }

    // clicked.classList.toggle('active')
    let blur = document.querySelectorAll(".extension-inner .content")
      for (let i = 0; i < blur.length; i++) {
        blur[i].classList.toggle('blur')
      }
      console.log('menuTrigger = toggled')
  }

  function toggleSettingView (view) {
    console.log('toggling setting view for = ' + view)

    // hide drawer menu first
    toggleDrawerMenu()

    let triggers = document.querySelectorAll('header .menuTrigger')
    for (let i = 0; i < triggers.length; i++) {
      triggers[i].classList.remove('active')
    }
    // end hide drawer menu

    let settingViews = document.querySelectorAll('.settingsPage[data-page]')
    for (let i = 0; i < settingViews.length; i++) {
      settingViews[i].classList.remove('active')
    }
    document.querySelectorAll(`.settingsPage[data-page="${view}"]`)[0].classList.add('active')
  }

  function closeSettingsView () {
    let backBTNS = document.querySelectorAll('.settingsPageHeader > .btn-back')
    let settingViews = document.querySelectorAll('.settingsPage[data-page]')

    for (let i = 0; i < backBTNS.length; i++) {
      backBTNS[i].onclick = function() {
        for (let i = 0; i < settingViews.length; i++) {
          settingViews[i].classList.remove('active')
        }
      }
    }
  }

  function checkUnlockForm (e) {
    e.preventDefault();
    let password = document.querySelectorAll('.unlockSafe form > input')[0].value
    if (password === "gnosis") {
      setUnlockValidation('OK')
    } else {
      setUnlockValidation('ERROR')
    }
    return false
  }

  function setUnlockValidation(validation) {
    let els = document.querySelectorAll('.lockshape', '.unlockSafe form > input')
    if (validation === "RESET") {
      for (let i = 0; i < els.length; i++) {
        els[i].setAttribute('data-validation', "")
      }
    } else {
      for (let i = 0; i < els.length; i++) {
        els[i].setAttribute('data-validation', validation)
        setTimeout(function() {
          els[i].setAttribute('data-validation', "")
          if (validation === "OK") {
            setView('safeOverview')
          }
        }, 500);
      }
    }

  }

  document.addEventListener("DOMContentLoaded", function() {
    setView(); // set initial view



    // Get closest helper
    var getClosest = function (elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get the closest matching element
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;

  };
  // ======================================================

    // Demo only

    // menuTriggers
    (function () {
      let triggers = document.querySelectorAll('header .menuTrigger')
      let blur = document.querySelectorAll(".extension-inner .content")
      for (let i = 0; i < triggers.length; i++) {
        triggers[i].onclick = function() {
          this.classList.toggle('active')
          toggleDrawerMenu()
          console.log('menuTrigger = toggled')
        }
      }
    }());

    (function () {
      document.querySelectorAll('.unlockSafe form')[0].addEventListener('submit', checkUnlockForm);
    }());

    // Show setting views on click item in drawer
    (function () {
      let items = document.querySelectorAll('.safeDrawerMenu li[data-menu]')
      for (let i = 0; i < items.length; i++) {
        items[i].onclick = function() {
          let activeview = this.getAttribute('data-menu')
          toggleSettingView(activeview)
        }
      }
    }());

    // Edit and SAVE the safe name in menu
    (function () {
      let safeEdit = document.querySelectorAll('.safeTools_edit');
      for (let i = 0; i < safeEdit.length; i++) {
        safeEdit[i].addEventListener('click', function (e) {
          e.currentTarget.parentNode.parentNode.getElementsByTagName("P")[0].setAttribute('contenteditable', 'true')
        })
      }

      let saveName = document.querySelectorAll('.safeMenu_safeItem > span > p ~ .safeTools > .safeTools_save');
      for (let i = 0; i < saveName.length; i++) {
        saveName[i].addEventListener('click', function (e) {
          console.log(e.currentTarget.parentNode.parentNode.getElementsByTagName("P")[0])
          e.currentTarget.parentNode.parentNode.getElementsByTagName("P")[0].setAttribute('contenteditable', 'false')
        });
      }
    }());
    // =============================



    // Init listeners for closing settings views
    closeSettingsView();

    // Lock state toggle
    (function () {
      document.querySelectorAll(".extension .lockedState")[0].onclick = function(){
        toggleLock()
        console.log('toggling lock state')
      }
    }());


    // Whitelist state toggle
    (function () {
      let checkbox = document.getElementById('whitelistSwitch');
      checkbox.addEventListener( 'change', function() {
          if(this.checked) {
              // Checkbox is checked..
              setWhiteListState('true')
          } else {
              // Checkbox is not checked..
              setWhiteListState('false')
          }
      });
    }());

    // Unlock input rotate lock effect
    (function () {
      let dots = document.querySelectorAll('.lockshape_dots')[0]
      let input = document.querySelectorAll('.unlockSafe form > input')[0]
      let rotateRandom = [15,30,-45,120, 230, -10]
      input.oninput = function(){
        dots.setAttribute("style", `
          -webkit-transform: rotate(${rotateRandom[Math.floor(Math.random() * rotateRandom.length)]}deg);
          transform: rotate(${rotateRandom[Math.floor(Math.random() * rotateRandom.length)]}deg);
          `);
      };
    }());

    // Toggle safes menu dropdown
    (function () {
      let trigger = document.querySelectorAll(".safeIcon.hasMenu")[0];
      let menu = document.querySelectorAll(".safeMenu")[0];
      trigger.onclick = function(){
        menu.classList.toggle('active')
        console.log('toggling safe menu dropdown')
      }
    }());


    // Initial view 1 =============================
    (function () {
      document.querySelectorAll('.welcome > .extension-inner > .content > button')[0].addEventListener("click", toggleDisclaimer) // Toggle disclaimer
      document.querySelectorAll('.welcome > .disclaimer button.naked')[0].addEventListener("click", toggleDisclaimer)             // Toggle disclaimer

      // getting back from password view 1:
      document.querySelectorAll('.password1 .btn-back')[0].onclick = function(){
        setView('welcome')
      }
    }());
    // =============================================


    // Show Password 1 view =============================
    (function () {
      document.querySelectorAll('.welcome > .disclaimer button:not(.naked)')[0].onclick = function(){
        setView('password1')
      }

      // getting back from password view 2:
      document.querySelectorAll('.password2 .btn-back')[0].onclick = function(){
        setView('password1')
      }
    }());
    // ==================================================


    // Show Password 2 view =============================
    (function () {
      document.querySelectorAll('.password1 .btn-next')[0].onclick = function(){
        setView('password2')
      }
    }());
    // ==================================================


    // Show appConnect view =============================
    // for appConnect view
    (function () {
      document.querySelectorAll('.password2 .btn-next')[0].onclick = function(){
        setView('appConnect')
        document.querySelectorAll('#pairExtension')[0].classList.remove('hide')
      }

      document.querySelectorAll('.appConnect button[data-os="ios"]')[0].onclick = function(){
        document.querySelectorAll(".appConnect .extension-inner .content")[0].classList.add('blur')
        document.querySelectorAll('.innerOverlay.qr_ios')[0].classList.remove('hide')
        console.log('show iOS QR')
      }

      document.querySelectorAll('.appConnect button[data-os="android"]')[0].onclick = function(){
        document.querySelectorAll(".appConnect .extension-inner .content")[0].classList.add('blur')
        document.querySelectorAll('.innerOverlay.qr_android')[0].classList.remove('hide')
        console.log('show Android QR')
      }

      document.querySelectorAll('.appConnect button[data-qr="mobilepair"]')[0].onclick = function(){
        document.querySelectorAll(".appConnect .extension-inner .content")[0].classList.add('blur')
        document.querySelectorAll('.innerOverlay.qr_mobile')[0].classList.remove('hide')
        console.log('show Mobile/Extension QR')
      }

      let exitbtns = document.querySelectorAll('.innerOverlay .buttonExit')
      let overlays = document.querySelectorAll('.appConnect .innerOverlay')

      // exit buttons for overlays
      for (let i = 0; i < exitbtns.length; i++) {
        exitbtns[i].onclick = function() {
          for (let i = 0; i < overlays.length; i++) {
            overlays[i].classList.add('hide')
          }
          document.querySelectorAll(".appConnect .extension-inner .content")[0].classList.remove('blur')
        }
      }
    }());
    // ==================================================


    // Show safeOverview ==================================================
    (function () {
      document.querySelectorAll('#pairExtension')[0].onclick = function(){
        this.classList.add('hide')
        setView('safeOverview')
      }
    }());
    // ==================================================

  });












// just for fun
if( typeof console === 'object' ) {
    console.log(
`
%c\n\n\n
 =================================================\n
            Better Safe Than Sorry™\n
                 .,//(((((((
              ,/(((%     #((*..
            ,((%         #(((((((/,.
            %((,         #((  // %(((/
           (/ %((,       #((      /#%((/
          /((   %((,     #((          ((,
         /((# /*, %((,   #((  ,*/*  (( #(/
         (((/ #((*, %((, #((  ((((#     (/
         ((((, #(((#  %(((((  @(((    * ((
         ((((((*,,,.,/* %(((   /((      ((
         ((((((((((((((((%((  %###  ** /(#
         %((((((((((((((((((          /(%
           (((((((((((((((((      (%,*(#
           #((((((((((((((((  ..   ,((%
             ((((((((((((((( .***/((%
               (((((((((((((((((%%
                 %%(((((((((


  .,*//.         */*,       ,*////////    ////////
 /(((((((       ,(((/       #((((((((%    ((((((((
 (((*..        ,//*/(/      #(((.....     ((*.....
  %(((((/      ((/@(((/     #(((((((#     (((((((#
 /*.   ((%    /((((((((     #(((          ((
 ((((((((    /((%    ((/,   #(((          (((((((( \n
 =================================================
\n
            - G N O S I S  T E A M -
\n\n\n\n
`, 'background: #2c303b; color: #28B2FA');
}

