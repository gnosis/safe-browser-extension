# safe-browser-extension

Install trough Chrome Store (rinkeby version)
--------------------------------------------
https://chrome.google.com/webstore/detail/gnosis-safe-rinkeby/gkiklnclpcbphbiaickiepnnnahefkoc

Manual Installation
-------
Install dependencies
```
npm install
```

Build
-------
Build files to `./build` folder.
```
npm run build
```

Run the extension
-------
* Visit `chrome://extensions` in your Google Chrome browser.
* Ensure that the **Developer mode** checkbox in the top of the page is checked.
* Click the button **Load unpacked extensions...** and open the `./build` folder in the file-selection dialog.

The extension will be loaded up and active.
