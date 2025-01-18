import pytest
import json

from dev_container import DevContainer

@pytest.mark.level(100)
@pytest.mark.dependency()
class TestAzAIGeneratorL100Fast(DevContainer):
    def test_docker_backend_build(self, solution):
        solution.run_in("docker build -t backend-pytest-l100-test .", path="src/backend")

    def test_docker_frontend_build(self, solution):
        solution.run_in("docker build -t frontend-pytest-l100-test .", path="src/frontend")

