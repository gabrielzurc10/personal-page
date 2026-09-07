#!/bin/bash
# Lambda entrypoint for the AWS Lambda Web Adapter (the function's "handler").
# The adapter starts this script once per execution environment, waits for the
# readiness check (GET /health) to pass, then proxies each invocation to uvicorn
# over HTTP so FastAPI can stream responses. Not used for local development.
PATH="$PATH:$LAMBDA_TASK_ROOT/bin" \
  PYTHONPATH="$PYTHONPATH:$LAMBDA_TASK_ROOT:/opt/python:$LAMBDA_RUNTIME_DIR" \
  exec python -m uvicorn --host 127.0.0.1 --port "${PORT:-8080}" main:app
