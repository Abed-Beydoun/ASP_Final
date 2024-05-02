import json
import pandas as pd 
import numpy as np
from io import StringIO
import Model.student as student

df = pd.read_csv('../Python/Data/CourseOfferring.csv')
electives = pd.read_excel('../Python/Data/Electives.xlsx')

def general_cleaning(av):
   cleaned = av.drop(av[av['FACULTY']=='Health Sciences'].index)
   cleaned.drop(cleaned[cleaned['COURSE_LEVEL']=='Graduate Masters'].index, inplace = True)
   cleaned.drop(cleaned[cleaned['COURSE_LEVEL']=='Graduate PhD'].index, inplace = True)
   cleaned.drop(columns =['FAC_CODE','CRNTITLE','SECTION','INSTNAME','COLL_REST', 'MAJOR_REST',
       'COURSE_LEVEL','ATTRIBUTE_CODE','SECTION_CAMPUS', 'CAPACITY', 'STATUS', 'FACULTY'], axis =1, inplace = True)
   cleaned=cleaned.drop_duplicates(subset= ['CRN',	'COURSE',	'COURSETITLE',	'CREDITS',	'SCHEDULETYPE',	'DAY',	'CTIME',	'CAMPUS'])
   cleaned = cleaned[cleaned['CRN'] != 11299]
   return cleaned

Biochemistry = pd.DataFrame(columns = ['CourseNo', 'PreReq', 'Score'])
Biochemistry.loc[0] = ['BIOL231', 'NULL', 250]
Biochemistry.loc[1] = ['CHEM241', 'NULL', 150]
Biochemistry.loc[2] = ['PHYS231', 'NULL', 50]
Biochemistry.loc[3] = ['MATH242', 'NULL', 50]
Biochemistry.loc[4] = ['BCHM331', 'CHEM234', 250]
Biochemistry.loc[5] = ['BCHM336', 'BCHM331', 200]
Biochemistry.loc[6] = ['BCHM432', 'BCHM336', 50]
Biochemistry.loc[7] = ['BCHM433', 'BCHM336', 50]
Biochemistry.loc[8] = ['BCHM434', 'BIOL334', 50]
Biochemistry.loc[9] = ['BCHM437', 'BCHM331', 50]
Biochemistry.loc[10] = ['BCHM444', 'BCHM336', 200]
Biochemistry.loc[11] = ['BIOL236', 'BIOL231', 50]
Biochemistry.loc[12] = ['BIOL333', 'BIOL231', 50]
Biochemistry.loc[13] = ['BIOL334', 'BIOL231', 100]
Biochemistry.loc[14] = ['CHEM234', 'NULL', 0]
Biochemistry.loc[15] = ['CHEM242', 'CHEM241', 50]
Biochemistry.loc[16] = ['CHEM333', 'CHEM241', 50]



Chemistry = pd.DataFrame(columns = ['CourseNo', 'PreReq', 'Score'])

Chemistry.loc[0] = ['CHEM241', 'NULL', 300]
Chemistry.loc[1] = ['PHYS241', 'NULL', 100]
Chemistry.loc[2] = ['MATH241', 'NULL', 100]
Chemistry.loc[3] = ['CMPS241', 'NULL', 100]
Chemistry.loc[4] = ['MATH242', 'NULL', 100]
Chemistry.loc[5] = ['CHEM242', 'CHEM241', 150]
Chemistry.loc[6] = ['CHEM244', 'NULL', 250]
Chemistry.loc[7] = ['CHEM246', 'CHEM241', 150]
Chemistry.loc[8] = ['CHEM341', 'CHEM244', 200]
Chemistry.loc[9] = ['CHEM342', 'CHEM242', 100]
Chemistry.loc[10] = ['CHEM345', 'CHEM241', 150]
Chemistry.loc[11] = ['CHEM346', 'CHEM341', 100]
Chemistry.loc[12] = ['CHEM348', 'CHEM345', 100]
Chemistry.loc[13] = ['CHEM349', 'CHEM246', 100]
Chemistry.loc[14] = ['CHEM411', 'NULL', 100]
Chemistry.loc[15] = ['CHEM442', 'CHEM341', 100]
Chemistry.loc[16] = ['CHEM444', 'CHEM341', 200]

Biology = pd.DataFrame(columns = ['CourseNo', 'PreReq', 'Score'])
Biology.loc[0]= ['BIOL231', 'NULL', 300]
Biology.loc[1]= ['CHEM241', 'NULL', 100]
Biology.loc[2]= ['PHYS231', 'NULL', 50]
Biology.loc[3]= ['MATH242', 'NULL', 50]
Biology.loc[4]= ['BCHM331', 'CHEM234', 100]
Biology.loc[5]= ['BCHM437', 'BCHM331', 50]
Biology.loc[6]= ['BIOL232', 'BIOL231', 250]
Biology.loc[7]= ['BIOL236', 'BIOL232', 100]
Biology.loc[8]= ['BIOL333', 'BIOL231', 100]
Biology.loc[9]= ['BIOL334', 'BIOL231', 100]
Biology.loc[10]= ['BIOL336', 'BIOL232', 100]
Biology.loc[11]= ['BIOL337', 'BIOL231', 150]
Biology.loc[12]= ['BIOL338', 'BIOL231', 100]
Biology.loc[13]= ['BIOL432', 'BIOL232', 100]
Biology.loc[14]= ['BIOL433', 'BIOL232', 100]
Biology.loc[15]= ['BIOL435', 'NULL', 100]
Biology.loc[16]= ['BIOL444', 'BIOL337', 350]
Biology.loc[17]= ['CHEM234', 'CHEM241', 100]

Mathematics = pd.DataFrame(columns = ["CourseNo", "PreReq", "Score"])
Mathematics.loc[0]=['CHEM241', 'NULL', 50]
Mathematics.loc[1]=['PHYS241', 'NULL', 50]
Mathematics.loc[2]=['MATH241', 'NULL', 300]
Mathematics.loc[3]=['CMPS241', 'NULL', 50]
Mathematics.loc[4]=['MATH242', 'NULL', 100]
Mathematics.loc[5]=['MATH244', 'MATH241', 100]
Mathematics.loc[6]=['MATH246', 'MATH241', 200]
Mathematics.loc[7]=['MATH341', 'NULL', 100]
Mathematics.loc[8]=['MATH342', 'MATH241', 100]
Mathematics.loc[9]=['MATH343', 'MATH244', 100]
Mathematics.loc[10]=['MATH344', 'MATH246', 150]
Mathematics.loc[11]=['MATH345', 'NULL', 150]
Mathematics.loc[12]=['MATH346', 'MATH345', 150]
Mathematics.loc[13]=['MATH348', 'MATH241', 100]
Mathematics.loc[14]=['MATH441', 'MATH241', 100]
Mathematics.loc[15]=['MATH442', 'MATH346', 100]
Mathematics.loc[16]=['MATH443', 'MATH246', 100]
Mathematics.loc[17]=['MATH444', 'MATH344', 350]
Mathematics.loc[18]=['MATH446', 'MATH246', 100]

Attributes = ['CourseNo', 'PreReq']
Physics = pd.DataFrame(columns = ['CourseNo', 'PreReq', 'Score'])
Physics.loc[0] = ['CHEM241', 'NULL', 50 ]
Physics.loc[1] = ['PHYS241', 'NULL', 200]
Physics.loc[2] = ['MATH241', 'NULL', 100]
Physics.loc[3] = ['CMPS241', 'NULL', 50]
Physics.loc[4] = ['MATH244', 'MATH241', 50]
Physics.loc[5] = ['PHYS242', 'NULL', 100]
Physics.loc[6] = ['PHYS244', 'NULL', 50]
Physics.loc[7] = ['PHYS341', 'NULL', 200]
Physics.loc[8] = ['PHYS342', 'PHYS341', 200]
Physics.loc[9] = ['PHYS343', 'PHYS241', 100]
Physics.loc[10] = ['PHYS344', 'PHYS341', 50]
Physics.loc[11] = ['PHYS345', 'MATH241', 50]
Physics.loc[12] = ['PHYS441', 'PHYS343', 50]
Physics.loc[13] = ['PHYS442', 'PHYS342', 50]
Physics.loc[14] = ['PHYS443', 'PHYS342', 50]
Physics.loc[15] = ['PHYS444', 'PHYS342', 250]
Physics.loc[16] = ['PHYS446', 'PHYS242', 50]
Physics.loc[17] = ['PHYS448', 'PHYS241', 50]
Physics.loc[18] = ['MATH242', 'NULL', 50]

Computer = pd.DataFrame(columns = ['CourseNo', 'PreReq', 'Score'])
Computer.loc[0] = ['CHEM241', 'NULL', 100]
Computer.loc[1] = ['PHYS243', 'NULL', 100]
Computer.loc[2] = ['MATH241', 'NULL', 150]
Computer.loc[3] = ['CMPS241', 'NULL', 300]
Computer.loc[4] = ['MATH242', 'NULL', 100]
Computer.loc[5] = ['CMPS242', 'CMPS241', 300]
Computer.loc[6] = ['CMPS244', 'NULL', 250]
Computer.loc[7] = ['CMPS246', 'CMPS241', 100]
Computer.loc[8] = ['CMPS248', 'CMPS241', 200]
Computer.loc[9] = ['MATH341', 'NULL', 100]
Computer.loc[10] = ['CMPS347', 'CMPS242', 250]
Computer.loc[11] = ['CMPS343', 'CMPS244', 100]
Computer.loc[12] = ['CMPS345', 'CMPS248', 100]
Computer.loc[13] = ['CMPS342', 'CMPS242', 100]
Computer.loc[14] = ['CMPS344', 'CMPS242', 150]
Computer.loc[15] = ['CMPS346', 'CMPS248', 100]
Computer.loc[16] = ['MATH348', 'MATH241', 100]
Computer.loc[17] = ['CMPS441', 'CMPS347', 100]
Computer.loc[18] = ['CMPS445', 'CMPS347', 100]
Computer.loc[19] = ['CMPS447', 'CMPS347', 150]
Computer.loc[20] = ['CMPS443', 'CMPS344', 300]
Computer.loc[21] = ['CMPS442', 'CMPS347', 100]
Computer.loc[22] = ['CMPS455', 'CMPS447', 100]
Computer.loc[23] = ['CMPS444', 'CMPS443', 250]

def obtain_available_crs(major, campus, finished_courses, av, days_of_unavailability ):
  if major.lower() == 'Computer'.lower():
    plan = Computer
  elif major.lower() == "Physics".lower():
    plan = Physics
  elif major.lower()=='biochemistry':
    plan = Biochemistry
  elif major.lower()=='mathematics':
    plan = Mathematics
  elif major.lower()=='biology':
    plan = Biology
  elif major.lower()=='chemistry':
    plan = Chemistry
  available = av.copy()
  for index, row in available.iterrows():
    if (row['COURSE_ATTRIBUTE'].split(' ')[0].lower() != major.lower() and row['COURSE_ATTRIBUTE'].split(' ')[0] != 'General') or (row['COURSE'] in finished_courses) or row['CAMPUS'].lower()!=campus.lower():
       available.drop(index, inplace = True)
  for index, row in available.iterrows():
    preq =plan.loc[plan['CourseNo'] == row['COURSE'], 'PreReq'].values
    if preq.any()!= 'NULL' and preq.any()!=False:
      if preq.any() not in finished_courses:
        available = available.drop(index)

  for index, row in available.iterrows():
    if row['DAY'].lower() in days_of_unavailability:
      available = available[available['CRN']!= row['CRN']]


  return available

def obtain_available_crs_electives(campus, finished_courses, av, days_of_unavailability ):
  available = av.copy()

  available.drop(columns =['CRNTITLE','SECTION','INSTNAME','COLL_REST', 'MAJOR_REST',
       'COURSE_LEVEL','SECTION_CAMPUS', 'CAPACITY', 'STATUS', 'TITLE'], axis =1, inplace = True)
  available=available.drop_duplicates(subset= ['CRN',	'COURSE',	'COURSETITLE',	'CREDITS',	'SCHEDULETYPE',	'DAY',	'CTIME',	'CAMPUS'])
  for index, row in available.iterrows():
    if row['COURSE'] in finished_courses or row['CAMPUS'].lower()!=campus.lower():
       available.drop(index, inplace = True)

  for index, row in available.iterrows():
    if row['DAY'].lower() in days_of_unavailability:
      available = available[available['CRN']!= row['CRN']]


  return available

def check_time_conflict(crn, schedule, av)-> bool:
  course1 = av.groupby('CRN').get_group(int(crn))
  for row, index in course1.iterrows():
    if index['DAY'] in schedule['DAY'].values:
      day_schedule = schedule.groupby('DAY').get_group(index['DAY'])
      for row1, index1 in day_schedule.iterrows():
        if(int(index['CTIME'].split(' ')[0])>=int(index1['CTIME'].split(' ')[0]) and int(index['CTIME'].split(' ')[0])<= int(index1['CTIME'].split(' ')[2])) or (int(index['CTIME'].split(' ')[2])>=int(index1['CTIME'].split(' ')[0]) and int(index['CTIME'].split(' ')[2])<= int(index1['CTIME'].split(' ')[2])):
          return False
  return True

def add_course(crn, schedule, av):
  course1 = av.groupby('CRN').get_group(int(crn))
  if check_time_conflict(crn, schedule, av) and course1['COURSE'].unique()[0] not in schedule['COURSE'].values:
    for row, index in course1.iterrows():
      schedule = pd.concat([schedule, index.to_frame().T] , ignore_index=True)

  return schedule

def fitness(schedule, major):
  if major.lower()=='computer':
    plan = Computer
  elif major.lower()=='physics':
    plan = Physics
  elif major.lower()=='biochemistry':
    plan = Biochemistry
  elif major.lower()=='mathematics':
    plan = Mathematics
  elif major.lower()=='biology':
    plan = Biology
  elif major.lower()=='chemistry':
    plan = Chemistry
  score = 0
  for row, index in schedule.iterrows():
    if index['COURSE'] in plan['CourseNo'].values:
        score += plan.loc[plan['CourseNo'] == index['COURSE'], 'Score'].values[0]
    else:
      score+=50
  return int(score)

def generate_schedules(available, number, major):
  if len(available)==0:
    return available
  all_schedules=[]
  start_index = len(available)-1
  if start_index == len(available)-1:
    end_index=0
  else:
    end_index = start_index-1

  for i in range(len(available)):
    schedule10=pd.DataFrame(columns = available.columns.tolist())
    schedule10 = schedule10.iloc[0:0]

    new_order = list(range(start_index, len(available))) + list(range(0, end_index+1))
    for i in new_order:
      if len(schedule10['COURSE'].unique()) >= number:
        continue
      schedule10 = add_course(available.loc[i]['CRN'], schedule10, available)
    all_schedules.append((schedule10, fitness(schedule10, major)))
    start_index = start_index-1
    end_index = end_index-1

  all_schedules = sorted(all_schedules, key=lambda x: x[1],reverse = True )
  max_tuple = max(all_schedules, key = lambda x: x[1])
  optimized_schedule = max_tuple[0]
  return optimized_schedule

def fitness2(schedule):
  sums=[]
  for i in schedule['DAY'].unique():
    day_s=schedule.groupby('DAY').get_group(i)
    day_s2=day_s.sort_values(by='CTIME', ignore_index=True)
    sumi=sum([int(day_s2['CTIME'][j+1].split(' ')[0]) -int(day_s2['CTIME'][j].split(' ')[2]) for j in range(len(day_s2['CTIME'])-1)])
    sums.append(sumi)
  return sum(sums) - (len(schedule['DAY'].unique())*1000)

def generate_schedules_with_electives(available, number, schedule):

  max_number = len(schedule['COURSE'].unique()) + number
  if len(available)==0 or number==0:
    return schedule
  all_schedules=[]
  start_index = len(available)-1
  if start_index == len(available)-1:
    end_index=0
  else:
    end_index = start_index-1

  for i in range(len(available)):
    schedule10=schedule.copy()

    new_order = list(range(start_index, len(available))) + list(range(0, end_index+1))
    for i in new_order:
      if len(schedule10['COURSE'].unique()) >= max_number:
        continue
      schedule10 = add_course(available.loc[i]['CRN'], schedule10, available)
    all_schedules.append((schedule10, fitness2(schedule10)))
    start_index = start_index-1
    end_index = end_index-1

  all_schedules = sorted(all_schedules, key=lambda x: x[1],reverse = True )
  max_tuple = min(all_schedules, key = lambda x: x[1])
  optimized_schedule = max_tuple[0]
  return optimized_schedule

def visualize_available_major_crs(major_course_offering:pd.DataFrame, s:student.Student)->str:
  major_data_cleaning = general_cleaning(major_course_offering)

  major_data_cleaning = major_data_cleaning.sort_values(by='COURSE_ATTRIBUTE', ignore_index=True)

  available_major = obtain_available_crs(major = s.major, campus = s.campus,finished_courses=s.finished_courses,
                                         av = major_data_cleaning, days_of_unavailability=s.days_of_unavailability)
  available_major = available_major.sort_values(by = "CRN", ignore_index=True)
  return available_major.to_json(orient = "table")


def visualize_available_elective_crs(electives_course_offering:pd.DataFrame, s:student.Student)->str:

  available_electives = obtain_available_crs_electives(campus = s.campus, finished_courses=s.finished_courses,
                                                       av=electives_course_offering, days_of_unavailability=s.days_of_unavailability)
  available_electives=available_electives.sort_values(by = 'CRN', ignore_index = True)
  return available_electives.to_json(orient = "table")

def add_course_manually(schedule:str, crn:int, available:str)->str:

  schedule1 = pd.read_json(StringIO(schedule), orient = "table")
  available1 = pd.read_json(StringIO(available), orient="table")
  available1= available1.reset_index()
  if crn not in available1['CRN'].astype(int).unique():
    return schedule
  course1 = available1.groupby('CRN').get_group(int(crn))
  if check_time_conflict(crn, schedule1, available1) and course1['COURSE'].unique()[0] not in schedule1['COURSE'].values:
    for row, index in course1.iterrows():
      schedule1 = pd.concat([schedule1, index.to_frame().T] , ignore_index=True)
  schedule1 = schedule1.reset_index()
  return schedule1.to_json(orient = "table")

def drop_course_manually(schedule:str, crn:int)->str:
  schedule1= pd.read_json(StringIO(schedule),orient="table")
  if crn not in schedule1['CRN'].unique():
    return schedule1.to_json(orient="table")

  schedule1 = schedule1[schedule1['CRN'] != crn]
  return schedule1.to_json(orient="table")


def generate_final_schedule(major_course_offering:pd.DataFrame, electives_course_offering:pd.DataFrame, s:student.Student)->str:
  major_data_cleaning = general_cleaning(major_course_offering)

  major_data_cleaning = major_data_cleaning.sort_values(by='COURSE_ATTRIBUTE', ignore_index=True)

  available_major = obtain_available_crs(major = s.major, campus = s.campus,finished_courses=s.finished_courses,
                                         av = major_data_cleaning, days_of_unavailability=s.days_of_unavailability)

  available_major = available_major.sort_values(by='COURSE_ATTRIBUTE', ignore_index=True)

  major_schedule = generate_schedules(available = available_major, number = s.number_of_major_crs, major = s.major)
  major_schedule = major_schedule.sort_values(by = 'DAY', ignore_index = True)

  available_electives = obtain_available_crs_electives(campus = s.campus, finished_courses=s.finished_courses,
                                                       av=electives_course_offering, days_of_unavailability=s.days_of_unavailability)
  available_electives=available_electives.sort_values(by = 'COURSE_ATTRIBUTE', ignore_index = True)

  final_schedule = generate_schedules_with_electives(available = available_electives, number=s.number_of_electives_crs, schedule=major_schedule)
  final_schedule = final_schedule.sort_values(by = ['COURSE_ATTRIBUTE', 'CRN'], ignore_index = True)
  return final_schedule.to_json(orient = 'table')

