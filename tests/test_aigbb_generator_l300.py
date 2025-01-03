import os
from test_aigbb_generator_l100 import TestAigbbGeneratorL100

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
