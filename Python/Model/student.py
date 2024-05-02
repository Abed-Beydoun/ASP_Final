class Student:
    _instance = None
    
    def __init__(self, major: str = None, finished_courses: list = None, days_of_unavailability: list = None, campus: str = None, number_of_electives: int = None, number_of_major: int = None):
        self.major = major
        self.finished_courses = finished_courses
        self.days_of_unavailability = days_of_unavailability
        self.campus = campus
        self.number_of_electives_crs = number_of_electives
        self.number_of_major_crs = number_of_major

    @classmethod
    def get_instance(cls):
        return cls._instance
    
    # Getters
    def get_major(self):
        return self.major

    def get_finished_courses(self):
        return self.finished_courses

    def get_days_of_unavailability(self):
        return self.days_of_unavailability

    def get_campus(self):
        return self.campus

    def get_number_of_electives(self):
        return self.number_of_electives_crs

    def get_number_of_major(self):
        return self.number_of_major_crs

    # Setters
    def set_major(self, major):
        self.major = major

    def set_finished_courses(self, finished_courses):
        self.finished_courses = finished_courses

    def set_days_of_unavailability(self, days_of_unavailability):
        self.days_of_unavailability = days_of_unavailability

    def set_campus(self, campus):
        self.campus = campus

    def set_number_of_electives(self, number_of_electives):
        self.number_of_electives_crs = number_of_electives

    def set_number_of_major(self, number_of_major):
        self.number_of_major_crs = number_of_major


def create_student_instance(student_info):
    student_instance = Student()
    if student_info.major:
        student_instance.set_major(student_info.major)
    if student_info.finished_courses:
        student_instance.set_finished_courses(student_info.finished_courses)
    if student_info.days_of_unavailability:
        student_instance.set_days_of_unavailability(student_info.days_of_unavailability)
    if student_info.campus:
        student_instance.set_campus(student_info.campus)
    if student_info.number_of_electives:
        student_instance.set_number_of_electives(student_info.number_of_electives)
    if student_info.number_of_major:
        student_instance.set_number_of_major(student_info.number_of_major)
    return student_instance







