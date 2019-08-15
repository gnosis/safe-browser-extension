
- [ ] 1. Notify Product Owner and QA about expected time of submission to the Chrome Web Store so that all of the meta texts (descriptions, titles, keywords) are ready on time.
- [ ] 2. Make sure all feature branches are merged into `develop` branch.
- [ ] 3. Create a Pull Request to merge changes from `develop` to `master` (don't merge it yet).
- [ ] 4. Wait until you get the approval from QA. If necessary, push the required changes to the Pull Request.
- [ ] 5. Push the last commit to update the version modifying these lines with the new version number:
  - https://github.com/gnosis/safe-browser-extension/blob/master/config/manifest_template.json#L5
  - https://github.com/gnosis/safe-browser-extension/blob/master/package.json#L3
  - https://github.com/gnosis/safe-browser-extension/blob/master/package-lock.json#L3
```
  $> git commit -m "X.Y.Z"
  $> git push
```
- [ ] 6. Tag the latest commit in the `develop` branch.
```
  $> git tag vX.Y.Z <last commit number>
  $> git push origin vX.Y.Z
```
- [ ] 7. Check that a new release is created as a draft in the Github project with these two assets:
```
  safe-browser-extension-<BUILD_NUMBER>-mainnet.zip
  safe-browser-extension-<BUILD_NUMBER>-rinkeby.zip
```
- [ ] 8. Merge the Pull Request into `master`.
- [ ] 9. Login in https://chrome.google.com/webstore/category/extensions with the right account and go to the developer dashboard. Edit the Mainnet and Rinkeby items running on production enviroment and update their packages with the new ones. Make sure the summary, detailed description and the graphic assets are updated too.
- [ ] 10. Publish both items in the Chrome Web Store. The Rinkeby and Mainnet versions are likely to be publicly available after 40 minutes and 2-3 days respectively.
- [ ] 11. Publish the release draft in the Github project.
