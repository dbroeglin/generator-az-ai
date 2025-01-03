import pytest
import shutil
import subprocess

def pytest_addoption(parser):
    parser.addoption(
        "--runslow", action="store_true", default=False, help="run slow tests"
    )

def pytest_configure(config):
    config.addinivalue_line("markers", "slow: mark test as slow to run")
    config.addinivalue_line("markers", "level(level): mark test with level")

def pytest_collection_modifyitems(config, items):
    if config.getoption("--runslow"):
        # --runslow given in cli: do not skip slow tests
        return
    skip_slow = pytest.mark.skip(reason="need --runslow option to run")
    for item in items:
        if "slow" in item.keywords:
            item.add_marker(skip_slow)

class Solution:
    def __init__(self, directory):
        self.directory = directory

    def run_in(self, cmd, path=""):
        subprocess.run(f"cd {self.directory}/{path} && {cmd}", shell=True, check=True)

    def __str__(self):
        return str(self.directory)

@pytest.fixture(scope="class")
def solution(request, tmp_path_factory):
    level = request.node.get_closest_marker("level").args[0]
    for mark in request.node.iter_markers():
        # We iterate because we want the mark on the subclass
        if mark.name == "level":
            level = mark.args[0]
    dir = tmp_path_factory.mktemp("base") / "test-solution"
    # execute a multi-line shell command
    subprocess.run(
        f"aigbb-generator-test '{dir.resolve()}' {level}", shell=True, check=True
    )
    yield Solution(dir.resolve())
    shutil.rmtree(dir)


@pytest.fixture(scope="class")
def azd_env(solution):
    env_name = "pyt-003"
    location = "francecentral"
    resource_group_name = f"rg-{env_name}"
    solution.run_in(f"az group create --location {location} --name {resource_group_name}")
    solution.run_in(f"azd env new {env_name}")
    solution.run_in(f"azd env set AZURE_RESOURCE_GROUP {resource_group_name}")
    solution.run_in(f"azd env set AZURE_LOCATION {location}")

    yield env_name

    solution.run_in("azd down --purge --force --no-prompt || true")
