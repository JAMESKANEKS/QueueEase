import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Ticket.css"; // keep your stylesheet

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state;

  if (!ticketData) {
    return (
      <div className="ticket-container">
        <h2 className="ticket-notfound">No Ticket Found</h2>
        <button onClick={() => navigate("/")} className="ticket-btn blue">
          Get a Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="ticket-container">
      <h2 className="ticket-title">🎟️ Your Ticket</h2>

      <div className="ticket-box">
        <p>
          <b>Ticket:</b> {ticketData.ticket}
        </p>
        <p>
          <b>Name:</b> {ticketData.fullName}
        </p>
        <p>
          <b>Type:</b> {ticketData.type}
        </p>

        {/* show student-specific info when available */}
        {ticketData.type === "student" && (
          <>
            {ticketData.studentId && (
              <p>
                <b>Student ID:</b> {ticketData.studentId}
              </p>
            )}
            {ticketData.schoolYear && (
              <p>
                <b>Year & Section:</b> {ticketData.schoolYear}
              </p>
            )}
            {ticketData.course && (
              <p>
                <b>Course:</b> {ticketData.course}
              </p>
            )}
          </>
        )}

        {/* show relation for non-students if provided */}
        {ticketData.type !== "student" && ticketData.relation && (
          <p>
            <b>Relation:</b> {ticketData.relation}
          </p>
        )}

        <p>
          <b>Purpose:</b> {ticketData.purpose}
        </p>
      </div>

      <div className="ticket-actions">
        <button onClick={() => navigate("/")} className="ticket-btn green">
          Get Another Ticket
        </button>
      </div>
      <footer className="queueform-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Ticket;
