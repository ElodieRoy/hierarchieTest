import { describe, expect, test } from '@jest/globals';
import { findAllFullPathByProcessName } from "../src";
import { processes1, processes2 } from '../src/data';

describe('test findAllFullPathByProcessName', () => {
  test('test find firefox.exe path in processes1', () => {
    expect(JSON.stringify(findAllFullPathByProcessName(processes1, "firefox.exe"))).toBe(JSON.stringify([
      'system->wininit->winlogon->explorer->firefox.exe->cmd.exe',
      'system->wininit->winlogon->explorer->firefox.exe->Word.exe',
      'system->wininit->winlogon->explorer->firefox.exe->Word2.exe'
    ]))
  })
  test('test find "p5" path in processes2', () => {
    expect(JSON.stringify(findAllFullPathByProcessName(processes2, "p5"))).toBe(JSON.stringify([
      'p1->p5->p7',
      'p1->p5->p8->p10->p11',
      'p1->p5->p8->p12',
      'p1->p5->p9'
    ]))
  })
  test('test for wrong process', () => {
    expect(findAllFullPathByProcessName(processes1, "wrongProcess")).toBe(undefined)
  })
});
