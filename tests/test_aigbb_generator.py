import re
import pytest
import pexpect
import sys
import os
import shutil as shutils


@pytest.fixture(scope="function")
def solution_dir(tmp_path_factory):
    dir = tmp_path_factory.mktemp("base") / "test-solution"
    os.mkdir(dir)
    yield dir
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

def test_l100(solution_dir):
  child = pexpect.spawn("yo aigbb " + str(solution_dir), timeout=20, encoding="utf-8", codec_errors="replace")
  assert child.isalive()

  expect_prompt(child, "What is the human readable name of your solution?", "Test Solution")
  expect_prompt(child, "What is the level of your solution?", "Use arrow keys")
  expect_prompt(child, "What is the description of your solution?", "Description of Test Solution")
  expect_prompt(child, "What is the slug of your solution? (KebabCase, no spaces)", "test-solution")
  expect_prompt(child, "What is the solution's initial version?", "0.1.0")
  expect_prompt(child, "What is the name of the solution creator?", "[A-Za-z ]+")
  expect_prompt(child, "What is the email of the solution creator?", "[A-Za-z@.]+")
  expect_prompt(child, "Do you want to configure your solution with a backend?", "Y/n")
  expect_prompt(child, "Do you want to configure your solution with a frontend?", "Y/n")
  expect_prompt(child, "Do you want to configure your solution for GitHub?", "Y/n")
  expect_prompt(child, "What GitHub organization do you want to push to?", "[A-Za-z0-9-]+")
  expect_prompt(child, "What is the GitHub repository you want to push to?", "[A-Za-z0-9-]+")
  expect_prompt(child, "Create the remote GitHub repository and push with GitHub CLI?", "y/N")
  assert child.isalive()
  child.expect(pexpect.EOF)
  output = child.after
  child.close()
  assert child.exitstatus == 0


def test_l300(solution_dir):

  child = pexpect.spawn("yo aigbb " + str(solution_dir), timeout=10, encoding="utf-8", codec_errors="replace")
  assert child.isalive()

  expect_prompt(child, "What is the human readable name of your solution?", "Test Solution")
  expect_prompt(child, "What is the level of your solution?", "Use arrow keys", control="k")
  expect_prompt(child, "What is the description of your solution?", "Description of Test Solution")
  expect_prompt(child, "What is the slug of your solution? (KebabCase, no spaces)", "test-solution")
  expect_prompt(child, "What is the solution's initial version?", "0.1.0")
  expect_prompt(child, "What is the name of the solution creator?", "[A-Za-z ]+")
  expect_prompt(child, "What is the email of the solution creator?", "[A-Za-z@.]+")
  expect_prompt(child, "Do you want to configure your solution with a backend?", "Y/n")
  expect_prompt(child, "Do you want to configure your solution with a frontend?", "Y/n")
  expect_prompt(child, "Do you want to configure your solution with a package?", "Y/n")
  expect_prompt(child, "What is your package's name?", "Test Solution Core")
  expect_prompt(child, "What is the description of your package?", "Description of Test Solution Core")
  expect_prompt(child, "What is the slug of your package?", "test-solution-core")
  expect_prompt(child, "Do you want to configure your solution for GitHub?", "Y/n")
  expect_prompt(child, "What GitHub organization do you want to push to?", "[A-Za-z0-9-]+")
  expect_prompt(child, "What is the GitHub repository you want to push to?", "[A-Za-z0-9-]+")
  expect_prompt(child, "Create the remote GitHub repository and push with GitHub CLI?", "y/N")
  assert child.isalive()
  child.expect(pexpect.EOF)
  output = child.after
  child.close()
  assert child.exitstatus == 0


