import logging
import os
import streamlit as st
import requests
<% if (solutionLevel > 100) { -%>
from azure.identity import DefaultAzureCredential
<% } -%>
from dotenv import load_dotenv
from io import StringIO
from subprocess import run, PIPE

def load_dotenv_from_azd():
    result = run("azd env get-values", stdout=PIPE, stderr=PIPE, shell=True, text=True)
    if result.returncode == 0:
        logging.info(f"Found AZD environment. Loading...")
        load_dotenv(stream=StringIO(result.stdout))
    else:
        logging.info(f"AZD environment not found. Trying to load from .env file...")
        load_dotenv()

def call_backend(backend_endpoint, <%- solutionLevel > 100 ? "app_id, " : "" %>payload):
    """
    Call the backend API with the given payload. Raises and exception if HTTP response code is not 200.
    """
    url = f'{backend_endpoint}/echo'
    headers = {}
<% if (solutionLevel > 100) { -%>
    if not (url.startswith('http://localhost') or url.startswith('http://127.0.0.1')):
        token = DefaultAzureCredential().get_token(f'api://{app_id}/.default')
        headers['Authorization'] = f"Bearer {token.token}"
<% } -%>
    response = requests.get(url, json=payload, headers=headers)
    response.raise_for_status()
    return response

def get_principal_name():
    result = st.context.headers.get('x-ms-client-principal-name')
    if result:
        return result
    else:
        return "Anonymous"

load_dotenv_from_azd()

st.write(get_principal_name())
st.markdown('<a href="/.auth/logout" target = "_self">Sign Out</a>', unsafe_allow_html=True)

<% if (withBackend) { -%>
st.write("Calling backend API...")
st.write(call_backend(os.getenv('BACKEND_ENDPOINT', 'http://localhost:8000'), <%- solutionLevel > 100 ? "os.getenv('AZURE_CLIENT_APP_ID'), " : "" %>{"hello": "world"}).json())
<% } -%>
