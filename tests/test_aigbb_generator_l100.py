import pytest
import shutil
import subprocess


@pytest.fixture(scope="class")
def solution_dir(tmp_path_factory):
    dir = tmp_path_factory.mktemp("base") / "test-solution"
    # execute a multi-line shell command
    subprocess.run(
        f"aigbb-generator-test '{dir.resolve()}' 100", shell=True, check=True
    )
    yield dir.resolve()
    shutil.rmtree(dir)


class TestAigbbGeneratorL100:
    def test_docker_backend_build(self, solution_dir):
        self.run_in(
            solution_dir,
            "src/backend",
            "docker build -t backend-pytest-l100-test .",
        )

    def test_docker_frontend_built(self, solution_dir):
        self.run_in(
            solution_dir,
            "src/frontend",
            "docker build -t frontend-pytest-l100-test .",
        )

    def run_in(self, solution_dir, path, cmd):
        subprocess.run(f"cd {solution_dir}/{path} && {cmd}", shell=True, check=True)
