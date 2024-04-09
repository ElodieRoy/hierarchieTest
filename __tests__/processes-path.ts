import { describe, expect, test } from '@jest/globals';
import { processes1, processes2, tree1, tree2 } from '../src/data';
import { findAllFullPathByProcessName } from '../src/processesFunctions';
import { findAllFullPathByProcessName2 } from '../src/processesFunctions2';

const firefoxPaths = [
  'system->wininit->winlogon->explorer->firefox.exe->cmd.exe',
  'system->wininit->winlogon->explorer->firefox.exe->Word.exe',
  'system->wininit->winlogon->explorer->firefox.exe->Word2.exe'
];

const p5Paths = [
  'p1->p5->p7',
  'p1->p5->p8->p10->p11',
  'p1->p5->p8->p12',
  'p1->p5->p9'
];

describe('test findAllFullPathByProcessName', () => {
  test('test find firefox.exe path in processes1', () => {
    expect(JSON.stringify(findAllFullPathByProcessName(processes1, "firefox.exe"))).toBe(JSON.stringify(firefoxPaths))
  })
  test('test find "p5" path in processes2', () => {
    expect(JSON.stringify(findAllFullPathByProcessName(processes2, "p5"))).toBe(JSON.stringify(p5Paths))
  })
  test('test for wrong process', () => {
    expect(findAllFullPathByProcessName(processes1, "wrongProcess")).toBe(undefined)
  })
});

describe('test findAllFullPathByProcessName2', () => {
  test('test find firefox.exe path in tree1', () => {
    expect(JSON.stringify(findAllFullPathByProcessName2(tree1, "firefox.exe"))).toBe(JSON.stringify(firefoxPaths))
  })
  test('test find "p5" path in tree12', () => {
    expect(JSON.stringify(findAllFullPathByProcessName2(tree2, "p5"))).toBe(JSON.stringify(p5Paths))
  })
  test('test for wrong process', () => {
    expect(findAllFullPathByProcessName2(tree1, "wrongProcess")).toBe(undefined)
  })
});
