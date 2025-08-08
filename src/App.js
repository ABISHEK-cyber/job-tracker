import React, { useState, useEffect } from "react";
import JobForm from "./JobForm";
import JobList from "./JobList";
import "./App.css";

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const updateJob = (updatedJob, index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = updatedJob;
    setJobs(updatedJobs);
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📌 Job Application Tracker</h1>
      <JobForm addJob={addJob} />
      <input
        className="search"
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <JobList jobs={filteredJobs} updateJob={updateJob} deleteJob={deleteJob} />
    </div>
  );
}
