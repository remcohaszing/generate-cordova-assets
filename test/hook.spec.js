const { readdirSync } = require('fs');
const path = require('path');

const { expect } = require('chai');
const cordovaCommon = require('cordova-common');
const merge = require('lodash.merge');

const hook = require('../hook');


describe('hook', () => {
  readdirSync(path.join(__dirname, 'hook')).forEach((testCase) => {
    it(`should generate icons for ${testCase}`, async () => {
      const projectRoot = path.join(__dirname, 'hook', testCase);
      const platformDir = path.join(projectRoot, 'platforms');
      const expectedDir = path.join(projectRoot, 'expected');
      const context = merge({
        opts: {
          projectRoot
        },
        requireCordovaModule(name) {
          console.assert(name === 'cordova-common');
          return cordovaCommon;
        }
        // eslint-disable-next-line global-require, import/no-dynamic-require
      }, require(`${projectRoot}/context`));
      await hook(context);
      expect(platformDir)
        .to.be.a.directory()
        .and.deep.equal(expectedDir)
        .with.files.that.satisfy((files) => {
          files.forEach((filename) => {
            expect(path.join(platformDir, filename))
              .to.be.a.file()
              .and.equal(path.join(expectedDir, filename));
          });
          return true;
        });
    });
  });
});
