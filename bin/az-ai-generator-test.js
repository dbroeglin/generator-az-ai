#!/usr/bin/env node
"use strict";

if (!(process.argv.length === 4 || process.argv.length === 5)) {
  console.error('Usage: az-ai-test <dir> <100|300> (push)');
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
  solutionName: 'Az AI scaffolding tool test',
  solutionLevel: Number.parseInt(level),
  solutionDescription: `Solution generated with the Az AI Scaffolding tool test (level ${level})`,
  solutionSlug: `az-ai-scaffolding-l${level}-test`,
  solutionVersion: '0.1.0',
  creatorName: 'Dominique Broeglin',
  creatorEmail: 'dominique.broeglin@microsoft.com',
  withFrontend: true,
  withBackend: true,
  withGitHub: true,
  gitHubOrg: 'dbroeglin',
  gitHubRepo: `az-ai-scaffolding-l${level}-test`,
  withGitHubPush: '' + push
}
const l300Answers = {
  withPackage: true,
  packageName: 'Az AI Scaffolding Core',
  packageDescription: 'Az AI Scaffolding Test Core Package',
  packageSlug: 'az-ai-scaffolding-core',
}
const answers = level === '100' ? l100Answers : { ...l100Answers, ...l300Answers };

const { default: Environment } = await import('yeoman-environment');
const env = new Environment();
env.lookup();
env.run(['az-ai', dir], answers).then(() => {
  console.log('success')
}, err => {
  console.log(`error ${err}`);
});
