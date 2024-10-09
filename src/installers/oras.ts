import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getTarballBinary } from './utils';

const toolName = 'oras';

export class OrasInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const orasPath = await getTarballBinary(toolName, version, url);

    core.debug(`oras has been cached at ${orasPath}`);

    core.addPath(path.dirname(orasPath));
  }
}

function getDownloadUrl(version: string): string {
  let platformMap: { [platform: string]: string } = {
    linux: 'linux',
    darwin: 'darwin',
    win32: 'windows',
  };

  let archMap: { [arch: string]: string } = {
    x64: 'amd64',
    arm64: 'arm64',
  };

  const arch = archMap[os.arch()];
  const platform = platformMap[os.platform()];
  const extension = os.platform() === 'win32' ? '.zip' : '.tar.gz';
  const isWindowsArm64 = arch === 'arm64' && platform === 'windows';

  if (!arch || !platform || isWindowsArm64) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/oras-project/oras/releases/download/${version}/oras_${version}_${os}_${platform}.${extension}`;
}
