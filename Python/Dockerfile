#Base image
FROM python:3.9-slim

#Working directory
WORKDIR /app

#Copy requirements file 
COPY requirements.txt .

#Create virtual environment & install dependencies 
RUN python -m venv /app/env && /app/env/bin/pip install --no-cache-dir -r requirements.txt

#Copy the rest of the code
COPY . .

#Expose the port that the app runs on
EXPOSE 8000

#Command to run the app
CMD [ "/app/env/bin/uvicorn", "Server:app", "--reload" ]