#!/usr/bin/env node
"use strict";

if (!(process.argv.length === 4 || process.argv.length === 5)) {
  console.error('Usage: aigbb-test <dir> <100|300> (push)');
  process.exit(1);
}

const dir = process.argv[2];
const level = process.argv[3];
const push = process.argv[4] === 'push';

if (level !== '100' && level !== '300') {
  console.error('Expected the second argument to be either 100 or 300');
  process.exit(1);
}

const l100Answers = {
  solutionName: 'AI GBB scaffolding tool test',
  solutionLevel: Number.parseInt(level),
  solutionDescription: `Solution generated with the AI GBB Scaffolding tool test (level ${level})`,
  solutionSlug: `aigbb-scaffolding-l${level}-test`,
  solutionVersion: '0.1.0',
  creatorName: 'Dominique Broeglin',
  creatorEmail: 'dominique.broeglin@microsoft.com',
  withFrontend: true,
  withBackend: true,
  withGitHub: true,
  gitHubOrg: 'dbroeglin',
  gitHubRepo: `aigbb-scaffolding-l${level}-test`,
  withGitHubPush: '' + push
}
const l300Answers = {
  withPackage: true,
  packageName: 'AI GBB Scaffolding Core',
  packageDescription: 'AI GBB Scaffolding Test Core Package',
  packageSlug: 'aigbb-scaffolding-core',
}
const answers = level === '100' ? l100Answers : { ...l100Answers, ...l300Answers };

const { default: Environment } = await import('yeoman-environment');
const env = new Environment();
env.lookup();
env.run(['aigbb', dir], answers).then(() => {
  console.log('success')
}, err => {
  console.log(`error ${err}`);
});
