import pytest

@pytest.mark.level(300)
@pytest.mark.dependency()
class TestAigbbGeneratorL300:
    def test_docker_backend_build(self, solution):
        solution.run_in("uv sync", path="src/backend")
        solution.run_in(
            "docker build -f Dockerfile -t backend-pytest-l100-test ../..",
            path="src/backend",
        )

    def test_docker_frontend_build(self, solution):
        solution.run_in("uv sync", path="src/frontend")
        solution.run_in(
            "docker build -f Dockerfile -t frontend-pytest-l100-test  ../..",
            path="src/frontend",
        )

    def test_pytest_package(self, solution):
        solution.run_in("uv run pytest -s", path="src/aigbb-scaffolding-core")

    def test_build_package(self, solution):
        solution.run_in("uv build", path="src/aigbb-scaffolding-core")
