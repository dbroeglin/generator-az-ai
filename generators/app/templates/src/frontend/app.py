import logging
import os
import streamlit as st
import requests
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv
from io import StringIO
from subprocess import run, PIPE

def load_dotenv_from_azd():
    result = run("azd env get-values", stdout=PIPE, stderr=PIPE, shell=True, text=True)
    if result.returncode == 0:
        logging.info(f"Found AZD environment. Loading...")
        load_dotenv(stream=StringIO(result.stdout))
    else:
        logging.info(f"AZD environment not found. Loading from .env file...")
        load_dotenv()

def call_backend(backend_endpoint, app_id, payload):
    """
    Call the backend API with the given payload. Raises and exception if HTTP response code is not 200.
    """
    url = f'{backend_endpoint}/echo'
    headers = {}

    if not (url.startswith('http://localhost') or url.startswith('http://127.0.0.1')):
        token = DefaultAzureCredential().get_token(f'api://{app_id}/.default')
        headers['Authorization'] = f"Bearer {token.token}"

    response = requests.get(url, json=payload, headers=headers)
    response.raise_for_status()
    return response

load_dotenv_from_azd()

st.write("Hello world")
<% if (withBackend) { -%>
st.write("Calling backend API...")
st.write(call_backend(os.getenv('BACKEND_ENDPOINT'), os.getenv('AZURE_CLIENT_APP_ID'), {"hello": "world"}).json())
<% } -%>
