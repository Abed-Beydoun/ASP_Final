import json
import pandas as pd
from io import StringIO
import Model.aimodel as aimodel
from Model.student import Student

def add_elective_course(student_data, crn):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    optimized_schedule =  aimodel.generate_final_schedule(major_course_offering=aimodel.df, electives_course_offering=aimodel.electives, s=studentInstance)
    available_elective_crs = aimodel.visualize_available_elective_crs(electives_course_offering=aimodel.electives, s=studentInstance)
    return aimodel.add_course_manually(schedule=optimized_schedule, crn=crn, available=available_elective_crs)
    
def add_major_course(student_data, crn):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    optimized_schedule =  aimodel.generate_final_schedule(major_course_offering=aimodel.df, electives_course_offering=aimodel.electives, s=studentInstance)
    available_major_crs =  aimodel.visualize_available_major_crs(major_course_offering=aimodel.df, s=studentInstance)
    return aimodel.add_course_manually(schedule=optimized_schedule, crn=crn, available=available_major_crs)
    
def drop_major_course(student_data, crn):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    optimized_schedule =  aimodel.generate_final_schedule(major_course_offering=aimodel.df, electives_course_offering=aimodel.electives, s=studentInstance)
    return aimodel.drop_course_manually(schedule=optimized_schedule, crn=crn)
    
def generate_optimized_schedule(student_data):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    return aimodel.generate_final_schedule(major_course_offering=aimodel.df, electives_course_offering=aimodel.electives, s=studentInstance)
def generate_elective_courses(student_data):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    return aimodel.visualize_available_elective_crs(electives_course_offering=aimodel.electives, s=studentInstance)
def generate_major_courses(student_data):
    studentInstance =  Student(major=student_data['major'], finished_courses=student_data['finished_courses'], days_of_unavailability=student_data['days_of_unavailability'], campus=student_data['campus'], number_of_major=student_data['number_of_major'], number_of_electives=student_data['number_of_electives'])
    return aimodel.visualize_available_major_crs(major_course_offering=aimodel.df, s=studentInstance)
