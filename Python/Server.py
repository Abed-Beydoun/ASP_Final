from fastapi import FastAPI, Request
from Model import main
import Model.main
from pydantic import BaseModel
from Model.student import Student
import json
from fastapi.responses import JSONResponse

app = FastAPI()


#Get major courses
@app.get("/major-courses")
async def get_major_courses(request: Request):
    #Receive data from the request body
    data = await request.json()
    #get the optimized schedule from main
    majorCourses = Model.main.generate_major_courses(data)
    # parse to json instead of string
    majorCourses = json.loads(majorCourses)
    return majorCourses["data"]

#Get elective courses
@app.get("/elective-courses")
async def get_elective_courses(request: Request):
    #Receive data from the request body
    data = await request.json()
    #get the optimized schedule from main
    electiveCourses=Model.main.generate_elective_courses(data)
    # parse to json instead of string
    electiveCourses = json.loads(electiveCourses)
    return electiveCourses["data"]

#Get optimized schedule
@app.get("/optimized-schedule")
async def get_optimized_schedule(request: Request):
    #Receive data from the request body
    data = await request.json()
    #get the optimized schedule from main
    optimizedSchedule=Model.main.generate_optimized_schedule(data)
    # parse to json instead of string
    optimizedSchedule = json.loads(optimizedSchedule)
    return optimizedSchedule["data"]

# Add a major course
@app.post("/add-major-course/{crn}")
async def add_major_course(crn: int, request: Request):
    data = await request.json()
    updatedSchedule=Model.main.add_major_course(student_data=data,crn=crn)
    updatedSchedule = json.loads(updatedSchedule)
    return updatedSchedule["data"]
    
# Add an elective course
@app.post("/add-elective-course/{crn}")
async def add_course(crn: int,request: Request):
    data = await request.json()
    updatedSchedule=Model.main.add_elective_course(student_data=data,crn=crn)
    updatedSchedule = json.loads(updatedSchedule)
    return updatedSchedule["data"]

#Delete a course
@app.delete("/delete-course/{crn}")
async def delete_course(crn: int,request: Request):
    data = await request.json()
    updatedSchedule=Model.main.drop_major_course(student_data=data,crn=crn)
    updatedSchedule = json.loads(updatedSchedule)
    return updatedSchedule["data"]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)