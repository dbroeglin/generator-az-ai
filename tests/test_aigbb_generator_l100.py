import pytest
from aiggb_generator_base import AigbbGeneratorBase

@pytest.mark.level(100)
class TestAigbbGeneratorL100(AigbbGeneratorBase):
    def test_docker_backend_build(self, solution):
        solution.run_in("uv sync", path="src/backend")
        solution.run_in("docker build -t backend-pytest-l100-test .", path="src/backend")

    def test_docker_frontend_built(self, solution):
        solution.run_in("uv sync", path="src/frontend")
        solution.run_in("docker build -t frontend-pytest-l100-test .", path="src/frontend")
