import React from 'react';
import { useRouter } from 'next/router';

interface Course {
  title: string;
  level: string;
  description: string;
  instructor: string;
  role: string;
  duration: string;
  icon: string;
  image: string;
  alt: string;
}

const courses: Course[] = [
  {
    title: "Introduction to SQL",
    level: "Beginner",
    description: "Learn how to create and query relational databases using SQL in just two hours.",
    instructor: "Izzy Weber",
    role: "Data Coach at IQ-Sphere",
    duration: "2h",
    icon: "fas fa-database",
    image: "https://placehold.co/50x50",
    alt: "Instructor Izzy Weber"
  },
  // ... other courses
];

const BrowseResources: React.FC = () => {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="bg-blue-900 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-semibold">
          Courses <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm ml-2">Hands-on learning</span>
        </h1>
        <p className="mt-2">
          Don't waste your Summer and Winter breaks. It's time to roll up your sleeves—we learn best by doing. All of our courses are interactive, combining short videos with hands-on exercises.
        </p>
        <button
          className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg"
          onClick={() => router.push('/create-course')}
        >
          Create a Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Python", "SQL", "R", "Power BI", "Tableau", "Alteryx", "Excel", "Google Sheets", "ChatGPT", "OpenAI", "PyTorch", "AWS", "Azure", "Snowflake", "Databricks", "Git", "Docker", "Shell", "Airflow", "Spark", "Dbt", "BigQuery", "Redshift", "Scala", "Julia", "MLFlow", "Theory", "DVC"].map(tag => (
          <button key={tag} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">{tag}</button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700">452 Courses</p>
        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Topic</option>
          </select>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">More filters</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.title} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-semibold">COURSE</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">{course.level}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="flex items-center mb-4">
              <img src={course.image} alt={course.alt} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="text-gray-900 font-semibold">{course.instructor}</p>
                <p className="text-gray-500 text-sm">{course.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <i className={`${course.icon} mr-2`}></i>
                <span>{course.duration}</span>
              </div>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Start</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseResources;
