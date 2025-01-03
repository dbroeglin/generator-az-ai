import pytest

class AigbbGeneratorBase:
    @pytest.mark.slow
    def test_deployment(self, solution, azd_env):
        solution.run_in("azd up --no-prompt")

        with open(f"{solution}/src/frontend/app.py", "a") as f:
            f.write("st.write('Changed!')\n")
        with open(f"{solution}/src/backend/app.py", "a") as f:
            f.write("# simple comment\n")

        solution.run_in("azd deploy --no-prompt")
