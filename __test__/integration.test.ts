import io from '@actions/io';
import path from 'path';
import fs from 'fs';
import { expect, test, beforeAll, afterAll } from 'bun:test';

import {install} from '../src';

const tempDir = path.join(__dirname, '__cache__', 'temp');
const toolDir = path.join(__dirname, '__cache__', 'tools');

beforeAll(async () => {
  // Set the RUNNER_TOOL_CACHE and RUNNER_TEMP environment variables where downloads will be stored 
  // And then clear existing directories
  process.env['RUNNER_TOOL_CACHE'] = toolDir;
  process.env['RUNNER_TEMP'] = tempDir;
  await io.rmRF(tempDir);
  await io.rmRF(toolDir);
});

// A map of the default versions of the tools to download for testing
const versions = {
  helm: '3.16.2',
  hub: '2.14.2',
  jq: '1.7.1',
  kubectl: '1.31.1',
  kustomize: '5.5.0',
  oras: '1.2.0',
  skaffold: '2.13.2',
  yq: '4.44.3',
};

for(const tool in versions) {
  // Can do this for each platform in the same test too if we're crazy...
  test(`install built-in tool: ${tool}`, async () => {
    const binaryPath = await install(tool, {version: versions[tool]});
    expect(binaryPath).toBeTruthy();
    expect(fs.existsSync(binaryPath)).toBeTruthy();
  });
}

afterAll(async () => {
  await io.rmRF(tempDir);
  await io.rmRF(toolDir);
});