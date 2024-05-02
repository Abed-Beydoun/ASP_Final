import json
import pandas as pd
from io import StringIO
import Model.aimodel as aimodel
from Model.student import Student

with open('studentData.json', 'r') as file:
    student_data = json.load(file)


crn1=21890
student_data1=pd.DataFrame([student_data])
student_data1['number_of_electives'] = student_data1['number_of_electives'].astype(int)
student_data1['number_of_major'] = student_data1['number_of_major'].astype(int)
student1 = Student(major=student_data1['major'][0], finished_courses=student_data1['finished_courses'][0], days_of_unavailability=student_data1['days_of_unavailability'][0], campus=student_data1['campus'][0], number_of_major=student_data1['number_of_major'][0], number_of_electives=student_data1['number_of_electives'][0])

available_major_crs = aimodel.visualize_available_major_crs(major_course_offering=aimodel.df, s=student1)
available_elective_crs = aimodel.visualize_available_elective_crs(electives_course_offering=aimodel.electives, s=student1)
optimized_schedule = aimodel.generate_final_schedule(major_course_offering=aimodel.df, electives_course_offering=aimodel.electives, s=student1)
add_elective_course = aimodel.add_course_manually(schedule=optimized_schedule, crn=crn1, available=available_elective_crs)
add_major_course = aimodel.add_course_manually(schedule=optimized_schedule, crn=crn1, available=available_major_crs)
delete_course = aimodel.drop_course_manually(schedule=optimized_schedule, crn=crn1)


