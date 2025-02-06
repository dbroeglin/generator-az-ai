import json
import logging
import os
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from patterns.debate import DebateOrchestrator
from patterns.reasoner import ReasonerOrchestrator
from utils.util import load_dotenv_from_azd, set_up_tracing, set_up_metrics, set_up_logging

load_dotenv_from_azd()
set_up_tracing()
set_up_metrics()
set_up_logging()

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:   %(name)s   %(message)s',
)
logger = logging.getLogger(__name__)
logging.getLogger('azure.core.pipeline.policies.http_logging_policy').setLevel(logging.WARNING)
logging.getLogger('azure.monitor.opentelemetry.exporter.export').setLevel(logging.WARNING)

# Choose pattern to use
# orchestrator = DebateOrchestrator()
# Requires o1 or o3-mini
orchestrator = ReasonerOrchestrator()

app = FastAPI()

logger.info("Diagnostics: %s", os.getenv('SEMANTICKERNEL_EXPERIMENTAL_GENAI_ENABLE_OTEL_DIAGNOSTICS'))

@app.post("/blog")
async def http_blog(request_body: dict = Body(...)):
    logger.info('API request received with body %s', request_body)

    topic = request_body.get('topic', 'Starwars')
    user_id = request_body.get('user_id', 'default_user')
    content = f"Write a blog post about {topic}."

    conversation_messages = []
    conversation_messages.append({'role': 'user', 'name': 'user', 'content': content})

    async def process_conversation():
        async for i in orchestrator.process_conversation(user_id, conversation_messages):
            yield i + '\n'

    return StreamingResponse(process_conversation(), media_type="application/json")
