import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/index';
import { schedulingAxios } from '../lib/axios';

const Home = () => {
  const [courseType, setCourseType] = useState('');
  const [data, setData] = useState([]);

  const handleButtonClick = async (type) => {
    let endpoint;
    if (type === 'Elective') {
      endpoint = '/electiveCourses';
    } else if (type === 'Major') {
      endpoint = '/majorCourses'; // Update the endpoint
    } else if (type === 'Optimized') {
      endpoint = '/optimizedSchedule';
    }

    try {
      console.log('Fetching data from:', endpoint);
      const response = await schedulingAxios({
        method: 'GET',
        url: endpoint,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      // console.log('Data received:', jsonData);
      const parsedData = JSON.parse(jsonData);
      setData(parsedData.data);
      setCourseType(type);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);

  console.log('Rendering Home component');
  const columns = Object.keys(data[0] ?? {});
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Courses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all suggested courses based on your major & data.
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => handleButtonClick('Elective')}
            className="mt-8 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Available Elective Courses
          </button>
          <button
            onClick={() => handleButtonClick('Major')}
            className="mt-8 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Available Major Courses
          </button>
          <button
            onClick={() => handleButtonClick('Optimized')}
            className="mt-8 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Optimized Schedule
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns?.map((column, index) => (
                      <th
                        scope="col"
                        key={index}
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap px-3 text-sm text-gray-500"
                      >
                        <span>{column}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.length === 0 && (
                    <tr>
                      <td
                        colSpan="13"
                        className="text-center py-4 text-sm text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                  {data?.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.index}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.CRN}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.COURSE}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.BLDG}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.CAMPUS}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.COURSE}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.COURSETITLE}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.COURSE_ATTRIBUTE}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.CREDITS}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.CTIME}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.DAY}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.ROOM}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.SCHEDULETYPE}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
