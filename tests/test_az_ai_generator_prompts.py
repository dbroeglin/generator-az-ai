import re
import pytest
import pexpect
import sys
import os
import shutil as shutils

l100_testdata = [
  (True, True, True),
  (True, True, False),
  (True, False, True),
  (True, False, False),
  (False, True, True),
  (False, True, False),
  (False, False, True),
  (False, False, False),
]

l300_testdata = [
  (True, True, True, True),
  (True, True, True, False),
  (True, True, False, True),
  (True, True, False, False),
  (True, False, True, True),
  (True, False, True, False),
  (True, False, False, True),
  (True, False, False, False),
  (False, True, True, True),
  (False, True, True, False),
  (False, True, False, True),
  (False, True, False, False),
  (False, False, True, True),
  (False, False, True, False),
  (False, False, False, True),
  (False, False, False, False),
]

@pytest.fixture(scope="function")
def solution_dir(tmp_path_factory):
    dir = tmp_path_factory.mktemp("base") / "test-solution"
    yield dir.resolve()
    shutils.rmtree(dir)

def expect_prompt(child, prompt, default, control=None, answer=None):
  child.expect(re.escape(prompt)+".*\\([^\\)]+\\)")
  assert re.match(".*\\("+default+"\\).*", child.after, re.DOTALL)

  if control:
    child.sendcontrol(control)
  if answer:
    child.sendline(answer)
  else:
    child.sendline()

def expect_l100(child, frontend=True, backend=True, github=True):
  expect_prompt(child, "What is the human readable name of your solution?", "Test Solution")
  expect_prompt(child, "What is the level of your solution?", "Use arrow keys")
  expect_prompt(child, "What is the description of your solution?", "Description of Test Solution")
  expect_prompt(child, "What is the slug of your solution? (KebabCase, no spaces)", "test-solution")
  expect_prompt(child, "What is the solution's initial version?", "0.1.0")
  expect_prompt(child, "What is the name of the solution creator?", "[A-Za-z ]+")
  expect_prompt(child, "What is the email of the solution creator?", "[A-Za-z@.]+")
  expect_prompt(child, "Do you want to configure your solution with a backend?", "Y/n", answer="n" if not backend else None)
  expect_prompt(child, "Do you want to configure your solution with a frontend?", "Y/n", answer="n" if not frontend else None)
  expect_prompt(child, "Do you want to configure your solution for GitHub?", "Y/n", answer="n" if not github else None)
  if github:
    expect_prompt(child, "What GitHub organization do you want to push to?", "[A-Za-z0-9-]+")
    expect_prompt(child, "What is the GitHub repository you want to push to?", "[A-Za-z0-9-]+")
    expect_prompt(child, "Create the remote GitHub repository and push with GitHub CLI?", "y/N")

def expect_l300(child, frontend=True, backend=True, package=True, github=True, ):
  expect_prompt(child, "What is the human readable name of your solution?", "Test Solution")
  expect_prompt(child, "What is the level of your solution?", "Use arrow keys", control="k")
  expect_prompt(child, "What is the description of your solution?", "Description of Test Solution")
  expect_prompt(child, "What is the slug of your solution? (KebabCase, no spaces)", "test-solution")
  expect_prompt(child, "What is the solution's initial version?", "0.1.0")
  expect_prompt(child, "What is the name of the solution creator?", "[A-Za-z ]+")
  expect_prompt(child, "What is the email of the solution creator?", "[A-Za-z@.]+")
  expect_prompt(child, "Do you want to configure your solution with a backend?", "Y/n", answer="n" if not backend else None)
  expect_prompt(child, "Do you want to configure your solution with a frontend?", "Y/n", answer="n" if not frontend else None)
  expect_prompt(child, "Do you want to configure your solution with a package?", "Y/n", answer="n" if not package else None)
  if package:
    expect_prompt(child, "What is your package's name?", "Test Solution Core")
    expect_prompt(child, "What is the description of your package?", "Description of Test Solution Core")
    expect_prompt(child, "What is the slug of your package?", "test-solution-core")
  expect_prompt(child, "Do you want to configure your solution for GitHub?", "Y/n", answer="n" if not github else None)
  if github:
    expect_prompt(child, "What GitHub organization do you want to push to?", "[A-Za-z0-9-]+")
    expect_prompt(child, "What is the GitHub repository you want to push to?", "[A-Za-z0-9-]+")
    expect_prompt(child, "Create the remote GitHub repository and push with GitHub CLI?", "y/N")


@pytest.mark.parametrize("frontend,backend,github", l100_testdata)
def test_prompts_l100(solution_dir, frontend, backend, github):
  child = pexpect.spawn(f"yo az-ai '{solution_dir}'", timeout=20, encoding="utf-8", codec_errors="replace")
  assert child.isalive()

  expect_l100(child, frontend=frontend, backend=backend, github=github)
  child.expect("Test Solution' has been successfully scaffolded in")
  child.expect("Git repository initialized")
  child.expect(pexpect.EOF)
  output = child.after
  child.close()
  assert child.exitstatus == 0


@pytest.mark.parametrize("frontend,backend,package,github", l300_testdata)
def test_prompts_l300(solution_dir, frontend, backend, package, github):
  child = pexpect.spawn(f"yo az-ai '{solution_dir}'", timeout=20, encoding="utf-8", codec_errors="replace")
  assert child.isalive()

  expect_l300(child, frontend=frontend, backend=backend, package=package, github=github)
  child.expect("Test Solution' has been successfully scaffolded in")
  child.expect("Git repository initialized")
  child.expect(pexpect.EOF)
  output = child.after
  child.close()
  assert child.exitstatus == 0

