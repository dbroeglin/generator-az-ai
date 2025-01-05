import pytest

@pytest.mark.level(100)
@pytest.mark.dependency()
class TestAigbbGeneratorL100:
    def test_docker_backend_build(self, solution):
        solution.run_in("uv sync", path="src/backend")
        solution.run_in("docker build -t backend-pytest-l100-test .", path="src/backend")

    def test_docker_frontend_build(self, solution):
        solution.run_in("uv sync", path="src/frontend")
        solution.run_in("docker build -t frontend-pytest-l100-test .", path="src/frontend")
