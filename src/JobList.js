import React, { useState } from "react";

export default function JobList({ jobs, updateJob, deleteJob }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedJob, setEditedJob] = useState({});

  const handleEdit = (index, job) => {
    setEditingIndex(index);
    setEditedJob(job);
  };

  const handleSave = (index) => {
    updateJob(editedJob, index);
    setEditingIndex(null);
  };

  return (
    <div className="job-list">
      {jobs.length === 0 && <p>No jobs yet. Add one above!</p>}
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          {editingIndex === index ? (
            <>
              <input
                value={editedJob.title}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, title: e.target.value })
                }
              />
              <input
                value={editedJob.company}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, company: e.target.value })
                }
              />
              <select
                value={editedJob.status}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, status: e.target.value })
                }
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button onClick={() => handleSave(index)}>Save</button>
            </>
          ) : (
            <>
              <h3>{job.title}</h3>
              <p>🏢 {job.company}</p>
              <p>📅 {job.date}</p>
              <p>Status: {job.status}</p>
              <button onClick={() => handleEdit(index, job)}>Edit</button>
              <button onClick={() => deleteJob(index)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
