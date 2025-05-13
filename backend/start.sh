#!/bin/bash
# Read PORT from Render's environment
uvicorn api.main:app --host 0.0.0.0 --port $PORT
