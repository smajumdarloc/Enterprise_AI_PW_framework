import { test, expect } from '@playwright/test';

import {
  readRules,
  readSkills
} from '../../ai/knowledge/knowledgeReader';


test(
  'rules.md can be loaded',
  () => {

    const rules =
      readRules();

    expect(rules.length)
      .toBeGreaterThan(0);

    expect(rules)
      .toContain('Playwright');
  }
);


test(
  'skills.md can be loaded',
  () => {

    const skills =
      readSkills();

    expect(skills.length)
      .toBeGreaterThan(0);

    expect(skills)
      .toContain('UI Automation');
  }
);