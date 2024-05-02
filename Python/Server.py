from fastapi import FastAPI, Request
from Model import main
import Model.main
from pydantic import BaseModel
from Model.student import Student
import json
from fastapi.responses import JSONResponse

app = FastAPI()

class StudentInfo(BaseModel):
    major: str
    finished_courses: list
    days_of_unavailability: list
    campus: str
    number_of_electives: int
    number_of_major: int

#Define a variable to store student information
student_data = None

#Student Info
@app.post("/studentInfo")
async def receive_student_info(request: Request):
    try:
        #Receive data from the request body
        data = await request.json()

        #Extract student data from the received JSON
        student_data = {
            "major": data["major"],
            "finished_courses": data["finished_courses"],
            "days_of_unavailability": data["days_of_unavailability"],
            "campus": data["campus"],
            "number_of_electives": data["number_of_electives"],
            "number_of_major": data["number_of_major"]
        }

        #Write the data to a file
        with open('studentData.json', 'w') as file:
            json.dump(student_data, file)

        #Send data to Python server
        response = {"message": "Student info received and saved successfully"}

        return response
    except Exception as e:
        print("Error:", str(e))
        return {"error": "Internal server error"}
    

#Get major courses
@app.get("/majorCourses")
async def get_major_courses():
    #get the major courses from main
    majorCourses=main.available_major_crs
    return majorCourses

#Get elective courses
@app.get("/electiveCourses")
async def get_elective_courses():
    #get the elective courses from main
    electiveCourses=Model.main.available_elective_crs
    return electiveCourses

#Get optimized schedule
@app.get("/optimizedSchedule")
async def get_optimized_schedule():
    #get the optimized schedule from main
    optimizedSchedule=Model.main.optimized_schedule
    return optimizedSchedule

# Add a major course
@app.post("/addMajorCourse/{crn}")
async def add_major_course(crn: int):
    updatedSchedule=Model.main.add_major_course(crn=crn)
    return updatedSchedule

# Add an elective course
@app.post("/addElectiveCourse/{crn}")
async def add_elective_course(crn: int):
    updatedSchedule=Model.main.add_elective_course(crn=crn)
    return updatedSchedule

#Delete a course
@app.post("/deleteCourse/{crn}")
async def add_elective_course(crn: int):
    updatedSchedule=Model.main.delete_course(crn=crn)
    return updatedSchedule


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)