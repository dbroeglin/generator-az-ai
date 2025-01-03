import subprocess
import pytest

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

    @pytest.mark.slow
    def test_deployment(self, solution_dir):
        self.run_in(
            solution_dir,
            "",
            "azd up --no-prompt",
        )
        with open(f"{solution_dir}/src/frontend/app.py", "a") as f:
            f.write("st.write('Changed!')\n")
        with open(f"{solution_dir}/src/backend/app.py", "a") as f:
            f.write("# simple comment\n")
        self.run_in(
            solution_dir,
            "",
            "azd deploy --no-prompt",
        )


    def run_in(self, solution_dir, path, cmd):
        subprocess.run(f"cd {solution_dir}/{path} && {cmd}", shell=True, check=True)
