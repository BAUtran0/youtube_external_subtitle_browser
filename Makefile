SHELL := /bin/bash

clean:
	rm -rf node_modules
	rm -rf backend/venv
	rm -rf dist

node_modules:
	npm install

backend/venv:
	python -m venv backend/venv
	backend/venv/bin/pip install backend/.

setup_frontend: node_modules
	npm run build

setup_backend: backend/venv

start_frontend_dev: RUN_ENV=development
start_frontend_dev:
	npm run start

start_backend_dev: setup_backend
	cd backend && venv/bin/flask --app base run

start_production: RUN_ENV=production
start_production: setup_backend setup_frontend
	set -a && source .env ; cd backend && venv/bin/gunicorn base:api
