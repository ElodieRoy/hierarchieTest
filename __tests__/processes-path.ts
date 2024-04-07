import { describe, expect, test } from '@jest/globals';
import { findAllFullPathByProcessName } from "../src";
import { processes1 } from '../src/data';

describe('test findAllFullPathByProcessName', () => {
  // test('test processes1', () => {
  //   expect(findAllFullPathByProcessName(processes1, "firefox.exe")).toBe([
  //     'system->wininit->winlogon->explorer->firefox.exe->cmd.exe',
  //     'system->wininit->winlogon->explorer->firefox.exe->Word.exe',
  //     'system->wininit->winlogon->explorer->firefox.exe->Word2.exe'
  //   ])
  // })
  test('test for wrong process', () => {
    expect(findAllFullPathByProcessName(processes1, "wrongProcess")).toBe(undefined)
  })
});
