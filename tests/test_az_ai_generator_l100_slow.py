import pytest
import re

from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage

from azure.identity import DefaultAzureCredential
from azure.core.credentials import AzureKeyCredential

@pytest.mark.level(100)
@pytest.mark.dependency()
class TestAZAiGeneratorL100Slow:

    @pytest.mark.slow
    @pytest.mark.usefixtures("depend_on_fast", "azd_env")
    def test_inference(self, solution, azd_env):
        solution.run_in("azd provision --no-prompt")
        endpoint = solution.run_in("azd env get-value AZURE_OPENAI_ENDPOINT", capture=True).strip().decode('utf-8')
        assert endpoint is not None

        client = ChatCompletionsClient(
            endpoint=f"{endpoint}/openai/deployments/gpt-4o",
            credential_scopes=["https://cognitiveservices.azure.com/.default"],
            credential=DefaultAzureCredential(exclude_interactive_browser_credential=False),
        )
        response = client.complete(
            model="gpt-4o",
            messages=[
                SystemMessage(content="You are a helpful assistant."),
                UserMessage(content="How many feet are in a mile?"),
            ]
        )
        assert re.search(r'5,?280', response.choices[0].message.content)

    @pytest.mark.slow
    @pytest.mark.usefixtures("depend_on_fast", "azd_env")
    def test_deployment(self, solution):
        solution.run_in("azd up --no-prompt")

        with open(f"{solution}/src/frontend/app.py", "a") as f:
            f.write("st.write('Changed!')\n")
        with open(f"{solution}/src/backend/app.py", "a") as f:
            f.write("# simple comment\n")
        solution.run_in("azd deploy --no-prompt")
