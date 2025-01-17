import os
import logging
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from orchestrator import SemanticOrchestrator
import util

util.load_dotenv_from_azd()
util.set_up_tracing()
util.set_up_metrics()
util.set_up_logging()

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s:   %(name)s   %(message)s',
)
logger = logging.getLogger(__name__)
logging.getLogger('azure.core.pipeline.policies.http_logging_policy').setLevel(logging.WARNING)
logging.getLogger('azure.monitor.opentelemetry.exporter.export').setLevel(logging.WARNING)

orchestrator = SemanticOrchestrator()
app = FastAPI()

logger.info("Diagnostics: %s", os.getenv('SEMANTICKERNEL_EXPERIMENTAL_GENAI_ENABLE_OTEL_DIAGNOSTICS'))

@app.post("/blog")
async def http_blog(request_body: dict = Body(...)):
    logger.info('API request received with body %s', request_body)

    topic = request_body.get('topic', 'Tesla')
    user_id = request_body.get('user_id', 'default_user')
    content = f"Write a blog post about {topic}."

    conversation_messages = []
    conversation_messages.append({'role': 'user', 'name': 'user', 'content': content})

    reply = await orchestrator.process_conversation(user_id, conversation_messages)

    conversation_messages.append(reply)

    return JSONResponse(
        content=reply,
        status_code=200
    )

# Not used. Keeping for demonstration purposes.
@app.post("/echo")
async def http_echo(request_body: dict = Body(...)):
    logger.info('API request received with body %s', request_body)

    return JSONResponse(
        content=request_body,
        status_code=200
    )
