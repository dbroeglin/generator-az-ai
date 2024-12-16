import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from io import StringIO
from subprocess import run, PIPE

logging.basicConfig(level=logging.INFO)

def load_dotenv_from_azd():
    result = run("azd env get-values", stdout=PIPE, stderr=PIPE, shell=True, text=True)
    if result.returncode == 0:
        logging.info(f"Found AZD environment. Loading...")
        load_dotenv(stream=StringIO(result.stdout))
    else:
        logging.info(f"AZD environment not found. Loading from .env file...")
        load_dotenv()

load_dotenv_from_azd()

app = FastAPI()

@app.get("/echo")
async def http_trigger(request_body: dict = Body(...)):
    logging.info('API request received with body %s', request_body)

    return JSONResponse(
        content=request_body,
        status_code=200
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
