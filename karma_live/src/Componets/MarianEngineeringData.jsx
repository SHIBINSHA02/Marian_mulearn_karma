import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Alert } from '@mui/material';
import './MarianEngineeringData.css'; // Import the CSS file
import studentIcon from './education.png'; // Import the icon
import score from './speedometer.png'
const MarianEngineeringData = () => {
  const [marianData, setMarianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mulearn.org/api/v1/leaderboard/college/');
        
        if (response.data && response.data.response) {
          const marianCollege = response.data.response.find(college => college.code === "MCE");
          setMarianData(marianCollege);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container className="container"><CircularProgress /></Container>;
  if (error) return <Container><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container className="container">
      {marianData ? (
        <div className="card">
          <div className="title">{marianData.title}</div>
          <div className="text">
            <img src={studentIcon} alt="Total Students Icon" className="icon" /> 
            Total Students: {marianData.total_students}
          </div>
          <div className="text">
          <img src={score} alt="Score Icon" className="icon" /> 
            Total Karma: {marianData.total_karma}</div>
          
        </div>
      ) : (
        <div>No data available for Marian Engineering College</div>
      )}
    </Container>
  );
};

export default MarianEngineeringData;
