#!/bin/bash

# Run React app
cd ./Frontend
npm start

# Run Node.js app
cd ../Backend
npm run dev

# Run Python app
cd ../Python
python -m uvicorn Server:app --reload
