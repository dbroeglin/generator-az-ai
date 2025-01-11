import json
from subprocess import run, PIPE

class DevContainer:
    def test_devcontainer(self, solution):
        result = run("devcontainer up --workspace-folder .", stdout=PIPE, shell=True, text=True)
        answer = json.loads(result.stdout)
        assert answer["outcome"] == "success"
        solution.run_in(f"docker rm -f {answer["containerId"]}")
