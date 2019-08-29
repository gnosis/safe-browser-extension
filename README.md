# Gnosis Safe Authenticator

Install through Web Chrome Store
--------------------------------------------
Mainnet version: https://chrome.google.com/webstore/detail/gnosis-safe/iecodoenhaghdlpodmhooppdhjhmibde

Rinkeby version: https://chrome.google.com/webstore/detail/gnosis-safe-rinkeby/gkiklnclpcbphbiaickiepnnnahefkoc

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
touch .env
npm run build
```

Run the Gnosis Safe Authenticator
-------
* Visit `chrome://extensions` in your Google Chrome browser.
* Ensure that the **Developer mode** checkbox in the top of the page is checked.
* Click the button **Load unpacked extensions...** and open the `./build` folder in the file-selection dialog.

The extension will be loaded up and active.

Dapp interaction
-------
The web3 provider injected by the Gnosis Safe Authenticator has been separated in a different github repository ([SafeWeb3Provider](https://github.com/gnosis/safe-web3-provider)) and is imported and injected by this extension.

Dapps must be **whitelisted** in order to have full access to the provider.

It is highly recommended to integrate it in your Dapp to asure a good performance.

**Different situations:**

- **Only the Gnosis Safe Authenticator is installed**
	- **Dapp is not whitelisted**
		- *Dapp integrates safe-web3-provider*
			- Dapp is unusable. Local safe-web3-provider is empty (no Safe account data and pop-up never opens).
		- *Dapp is not integrated with the Safe*
			- Dapp is unusable.
	- **Dapp is whitelisted**
		- *Dapp integrates safe-web3-provider*
			- safe-web3-provider is injected by default. Local safe-web3-provider can be used if selected.
		- *Dapp is not integrated with the Safe*
			- safe-web3-provider is injected by default. Be careful if Dapp listens to the provider at load event. There is no problem with Dapps that load the provider using a button.
	
- **Both Gnosis Safe Authenticator and Metamask are installed**
	- **Dapp is not whitelisted**
		- *Metamask is used*
	- **Dapp is whitelisted**
		- *Dapp integrates safe-web3-provider*
			- Local safe-web3-provider is used.
		- *Dapp is not integrated with the Safe*
			- Metamask is used.




Example of a simple Dapp interacting with the Gnosis Safe Authenticator and Metamask:

![safe_web3_provider](https://user-images.githubusercontent.com/6764315/51697091-4cfcb300-2007-11e9-8b11-0f0aff1a6a4e.gif)
