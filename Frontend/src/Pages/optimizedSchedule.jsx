import React, { useState, useEffect } from 'react';

const ScheduleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5500/api/scheduling/optimizedSchedule'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.text(); // Read response as text
      const data = responseData ? JSON.parse(responseData) : {};
      console.log(data);
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); //Empty dependency array ensures this effect runs only once

  const {
    index,
    CRN,
    COURSE,
    COURSETITLE,
    CREDITS,
    SCHEDULETYPE,
    DAY,
    CTIME,
    CAMPUS,
    BLDG,
    ROOM,
    COURSE_ATTRIBUTE,
  } = scheduleData;

  return (
    <div>
      <table
        id="schedule"
        className="table table-hover text-nowrap table-bordered"
      >
        <thead>
          <tr>
            <th>CRN</th>
            <th>Course</th>
            <th>Title</th>
            <th>Section</th>
            <th>Code</th>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">{CRN}</td>
            <td align="center">{COURSE}</td>
            <td>{COURSETITLE}</td>
            <td align="center">{CRN}</td>
            <td align="center">{COURSE_ATTRIBUTE}</td>
            <td align="center">{CTIME}</td>
            <td align="center">{DAY === 'Monday' ? 'X' : ''}</td>
            <td align="center">{DAY === 'Tuesday' ? 'X' : ''}</td>
            <td align="center">{DAY === 'Wednesday' ? 'X' : ''}</td>
            <td align="center">{DAY === 'Thursday' ? 'X' : ''}</td>
            <td align="center">{DAY === 'Friday' ? 'X' : ''}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={fetchData} className="btn btn-primary">
        Refresh Data
      </button>
    </div>
  );
};

export default ScheduleTable;
