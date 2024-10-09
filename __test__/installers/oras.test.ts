import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { OrasInstaller } from '../../src/installers/oras';

const toolDir = process.env['RUNNER_TOOL_CACHE'] as string;
const IS_WINDOWS = process.platform === 'win32';

describe('kustomize installer tests', () => {
  const installer = new OrasInstaller();

  const versions = ['1.2.0'];

  for (const version of versions) {
    it('Acquires the specified version of oras', async () => {
      await installer.install(version);

      const dir = path.join(toolDir, 'oras', version, os.arch());

      if (IS_WINDOWS) {
        expect(fs.existsSync(path.join(dir, 'oras.exe'))).toBe(true);
      } else {
        expect(fs.existsSync(path.join(dir, 'oras'))).toBe(true);
      }
    }, 100000);
  }
});
