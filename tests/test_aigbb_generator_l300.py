import os
import shutil
import pytest
import subprocess
from test_aigbb_generator_l100 import TestAigbbGeneratorL100


@pytest.fixture(scope="class")
def solution_dir(tmp_path_factory):
    dir = tmp_path_factory.mktemp("base") / "test-solution"
    # execute a multi-line shell command
    subprocess.run(
        f"aigbb-generator-test '{dir.resolve()}' 300", shell=True, check=True
    )
    yield dir.resolve()
    shutil.rmtree(dir)


class TestAigbbGeneratorL300(TestAigbbGeneratorL100):
    def test_docker_uv(self, solution_dir):
        self.run_in(
            solution_dir,
            "",
            "uv sync",
        )

    def test_test_package(self, solution_dir):
        self.run_in(
            solution_dir,
            "src/aigbb-scaffolding-core",
            "uv run pytest -s",
        )

    def test_build_package(self, solution_dir):
        self.run_in(
            solution_dir,
            "src/aigbb-scaffolding-core",
            "uv build",
        )
