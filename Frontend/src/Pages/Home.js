import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, FormBtn } from '../components/index';
import './Home.css';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const Home = () => {
  const [courseType, setCourseType] = useState('');
  const [data, setData] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prevVisible) => !prevVisible);
  };

  const handleButtonClick = async (type) => {
    let endpoint;
    if (type === 'Elective') {
      endpoint = 'http://localhost:5500/api/scheduling/electiveCourses';
    } else if (type === 'Major') {
      endpoint = 'http://localhost:5500/api/scheduling/majorCourses'; // Update the endpoint
    } else if (type === 'Optimized') {
      endpoint = 'http://localhost:5500/api/scheduling/optimizedSchedule';
    }

    try {
      console.log('Fetching data from:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log('Data received:', jsonData);
      setData(jsonData.data);
      setCourseType(type);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);

  console.log('Rendering Home component');

  return (
    <>
      <Navbar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />

      <div className="container">
        <div className="buttons">
          <button className='formBtn' onClick={() => handleButtonClick('Elective')}>Available Elective Courses</button>
          <button className='formBtn' onClick={() => handleButtonClick('Major')}>Available Major Courses</button>
          <button className='formBtn' onClick={() => handleButtonClick('Optimized')}>Optimized Schedule</button>
        </div>

        <div className="table">
          <Table data={data} />
        </div>
      </div>
    </>
  );
};
export default Home;