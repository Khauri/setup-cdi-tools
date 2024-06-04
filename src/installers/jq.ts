import * as core from '@actions/core';
import * as os from 'os';
import * as path from 'path';
import { Installer } from './installer';
import { getBinary } from './utils';

const toolName = 'jq';

export class JqInstaller implements Installer {
  async install(version: string) {
    const url = getDownloadUrl(version);
    const jqPath = await getBinary(toolName, version, url);

    core.debug(`jq has been cached at ${jqPath}`);

    core.addPath(path.dirname(jqPath));
  }
}

function getDownloadUrl(version: string): string {
  let platformMap: { [platform: string]: string } = {
    linux: 'linux',
    darwin: 'macos',
    win32: 'windows',
  };

  let archMap: { [arch: string]: string } = {
    x64: 'amd64',
    arm64: 'arm64',
  };

  const arch = archMap[os.arch()];
  const platform = platformMap[os.platform()];
  const extension = os.platform() === 'win32' ? '.exe' : '';
  const isWindowsArm64 = arch === 'arm64' && platform === 'windows';

  if (!arch || !platform || isWindowsArm64) {
    throw `Unsupported platform. platform:${os.platform()}, arch:${os.arch()}`;
  }

  return `https://github.com/jqlang/jq/releases/download/jq-${version}/jq-${platform}-${arch}${extension}`;
}
