import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./styles/QueueForm.css"; // ✅ Import the CSS file

const QueueForm = () => {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateTicketNumber = async (prefix) => {
    const snapshot = await getDocs(collection(db, "queue"));
    const count = snapshot.size + 1;
    return `${prefix}${String(count).padStart(3, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const prefix = userType === "student" ? "S" : "N";
      const ticketNum = await generateTicketNumber(prefix);

      await addDoc(collection(db, "queue"), {
        ...formData,
        type: userType,
        ticket: ticketNum,
        status: "waiting",
        createdAt: serverTimestamp(),
      });

      navigate("/ticket", {
        state: {
          ticket: ticketNum,
          type: userType,
          ...formData,
        },
      });
    } catch (error) {
      console.error("Failed to get ticket:", error);
      alert("Error creating ticket: " + error.message);
    }
  };

  // ✅ Step 1: Select Type
  if (!userType) {
    return (
      <div className="queueform-container">
        <div className="queueform-select-box">
          <h2 className="queueform-title">Select Type</h2>
          <button
            onClick={() => setUserType("student")}
            className="queueform-button student"
          >
            Student
          </button>
          <button
            onClick={() => setUserType("non-student")}
            className="queueform-button non-student"
          >
            Non-Student
          </button>
        </div>

        {/* ✅ Footer for school details */}
        <footer className="queueform-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
    );
  }

  // ✅ Step 2: Form (Student / Non-Student)
  return (
    <div className="queueform-form">
      <div className="queueform-box">
        {/* ✅ Home button to go back */}
        <button
          onClick={() => setUserType(null)}
          className="queueform-home"
        >
          ← Back
        </button>

        <h2 className="queueform-title">
          {userType === "student" ? "Student Form" : "Non-Student Form"}
        </h2>

        <form onSubmit={handleSubmit}>
          {userType === "student" ? (
            <>
              <input
                type="text"
                name="studentId"
                placeholder="Student ID Number"
                onChange={handleChange}
                className="queueform-input"
                required
              />
              <input
                type="text"
                name="schoolYear"
                placeholder="Year & Section"
                onChange={handleChange}
                className="queueform-input"
                required
              />
              <input
                type="text"
                name="course"
                placeholder="Course (if College)"
                onChange={handleChange}
                className="queueform-input"
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="queueform-input"
                required
              />
              <input
                type="text"
                name="purpose"
                placeholder="Purpose"
                onChange={handleChange}
                className="queueform-input"
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="queueform-input"
                required
              />
              <input
                type="text"
                name="relation"
                placeholder="Relation / Status (Alumni, Parent, Applicant, Visitor)"
                onChange={handleChange}
                className="queueform-input"
                required
              />
              <input
                type="text"
                name="purpose"
                placeholder="Purpose"
                onChange={handleChange}
                className="queueform-input"
                required
              />
            </>
          )}

          <button type="submit" className="queueform-submit">
            Get Ticket
          </button>
        </form>
      </div>

      {/* ✅ Footer for school details */}
      <footer className="queueform-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default QueueForm;
