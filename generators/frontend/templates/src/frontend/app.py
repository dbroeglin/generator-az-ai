import base64
import json
import logging
import os
import requests
import streamlit as st
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
    url = f'{backend_endpoint}/blog'
    headers = {}
<% if (solutionLevel > 100) { -%>
    if not (url.startswith('http://localhost') or url.startswith('http://127.0.0.1')):
        token = DefaultAzureCredential().get_token(f'api://{app_id}/.default')
        headers['Authorization'] = f"Bearer {token.token}"
<% } -%>
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response

def get_principal_name():
    result = st.context.headers.get('x-ms-client-principal-name')
    if result:
        return result
    else:
        return "Anonymous"

def get_principal_id():
    result = st.context.headers.get('x-ms-client-principal-id')
    if result:
        return result
    else:
        return "default_user_id"

def get_principal_display_name():
    default_user_name = "Default User"
    principal = st.context.headers.get('x-ms-client-principal')
    if principal:
        principal = json.loads(base64.b64decode(principal).decode('utf-8'))
        claims = principal.get("claims", [])
        return next((claim["val"] for claim in claims if claim["typ"] == "name"), default_user_name)
    else:
        return default_user_name

load_dotenv_from_azd()

st.write(f"Welcome {get_principal_display_name()}!")
st.markdown('<a href="/.auth/logout" target = "_self">Sign Out</a>', unsafe_allow_html=True)

<% if (withBackend) { -%>
st.write("Calling backend API...")
st.write(call_backend(os.getenv('BACKEND_ENDPOINT', 'http://localhost:8000'), <%- solutionLevel > 100 ? "os.getenv('AZURE_CLIENT_APP_ID'), " : "" %>{"topic": "cookies", "user_id": get_principal_id()}).json())
<% } -%>
