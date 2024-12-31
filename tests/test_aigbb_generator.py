import re
import pytest
import pexpect
import sys

def test_l100():
  child = pexpect.spawnu("yo aigbb /tmp/test-solution", timeout=5)
  assert child.isalive()
  child.expect(".*name of your solution.*")
  child.sendline("\n")

  child.expect(".*level of your solution.*")
  child.sendline("\n")

  child.expect(".*description of your solution.*")
  child.sendline("\n")

  child.expect(".*slug.*")
  child.sendline("\n")


  child.expect(".*initial version.*")
  child.sendline("\n")

  child.expect(".*name of the solution creator.*")
  child.sendline("\n")

  child.expect(".*email of the solution creator.*")
  child.sendline("\n")

  child.expect(".*backend.*")
  child.sendline("\n")

  child.expect(".*frontend.*")
  child.sendline("\n")

  child.expect(".*GitHub.*")
  child.sendline("\n")

  child.expect(".*organization.*push to.*")
  child.sendline("\n")

  child.expect(".*repository.*push to.*")
  child.sendline("\n")

  child.expect(".*create the remote.*")
  child.sendline("\n")

  child.sendline("a")

  child.expect("Git repository initialized")
  assert child.isalive()
