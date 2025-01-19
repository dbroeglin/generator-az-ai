import pytest

from dev_container import DevContainer

@pytest.mark.level(300)
@pytest.mark.dependency()
class TestAZAiGeneratorL300Fast(DevContainer):
    def test_docker_backend_build(self, solution):
        solution.run_in(
            "docker build -f Dockerfile -t backend-pytest-l300-test ../..",
            path="src/backend",
        )

    def test_docker_frontend_build(self, solution):
        solution.run_in(
            "docker build -f Dockerfile -t frontend-pytest-l300-test  ../..",
            path="src/frontend",
        )

    def test_pytest_package(self, solution):
        solution.run_in("uv run pytest -s", path="src/az-ai-scaffolding-core")

    def test_build_package(self, solution):
        solution.run_in("uv build", path="src/az-ai-scaffolding-core")
