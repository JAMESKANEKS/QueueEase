import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css"; // ✅ import separate CSS

const Admin = ({ setAuth }) => {
  const [queue, setQueue] = useState([]);
  const [serving, setServing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "queue"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueue(data);
      setServing(data.find((item) => item.status === "serving") || null);
    });

    return () => unsubscribe();
  }, []);

  const callNext = async () => {
    try {
      const next = queue.find((item) => item.status === "waiting");
      if (!next) return alert("⚠️ No one in the queue.");

      if (serving) {
        await updateDoc(doc(db, "queue", serving.id), { status: "done" });
      }

      await updateDoc(doc(db, "queue", next.id), { status: "serving" });
    } catch (error) {
      console.error("Failed to call next:", error);
    }
  };

  const skipCurrent = async () => {
    try {
      if (!serving) return alert("⚠️ No ticket is currently being served.");

      const reason = window.prompt("Enter reason for skipping this ticket:");
      if (!reason) return alert("⚠️ A reason is required to skip.");

      await updateDoc(doc(db, "queue", serving.id), {
        status: "skipped",
        skipReason: reason,
      });

      const next = queue.find((item) => item.status === "waiting");
      if (next) {
        await updateDoc(doc(db, "queue", next.id), { status: "serving" });
      }
    } catch (error) {
      console.error("Failed to skip:", error);
    }
  };

  const requeue = async (id) => {
    try {
      await updateDoc(doc(db, "queue", id), {
        status: "waiting",
        skipReason: null,
      });
    } catch (error) {
      console.error("Failed to requeue:", error);
    }
  };

  const resetQueue = async () => {
    if (!window.confirm("⚠️ Are you sure you want to reset the queue?")) return;
    for (const item of queue) {
      await deleteDoc(doc(db, "queue", item.id));
    }
  };

  const handleLogout = () => {
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Registrar Console</h2>

      <div className="admin-buttons">
        <button onClick={callNext} className="btn btn-blue">Call Next</button>
        <button onClick={skipCurrent} className="btn btn-yellow">Skip</button>
        <button onClick={resetQueue} className="btn btn-red">Reset Queue</button>
        <button onClick={handleLogout} className="btn btn-outline">Logout</button>
      </div>

      {serving ? (
        <div className="serving-box">
          <h3 className="serving-header"><img className="icon1" src="/ticon.png" alt="icon" /> Now Serving</h3>
          <p><b>Ticket:</b> {serving.ticket}</p>
          <p><b>Name:</b> {serving.fullName}</p>
          {serving.type === "student" ? (
            <>
              <p><b>Student ID:</b> {serving.studentId}</p>
              <p><b>School Year:</b> {serving.schoolYear}</p>
              {serving.course && <p><b>Course:</b> {serving.course}</p>}
            </>
          ) : (
            <p><b>Relation:</b> {serving.relation}</p>
          )}
          <p><b>Purpose:</b> {serving.purpose}</p>
        </div>
      ) : (
        <p className="no-serving">No one is currently being served.</p>
      )}

      <h3 className="queue-title">📋 Queue List</h3>
      <ul className="queue-list">
        {queue.map((item) => (
          <li
            key={item.id}
            className={`queue-item ${item.status}`}
          >
            <span>
              <b>{item.ticket}</b> - {item.fullName} ({item.status})
              {item.status === "skipped" && item.skipReason && (
                <span className="skip-reason">Reason: {item.skipReason}</span>
              )}
            </span>

            {item.status === "skipped" && (
              <button
                onClick={() => requeue(item.id)}
                className="btn btn-purple small"
              >
                Requeue
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* ✅ Footer for school details */}
      <footer className="admin-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Admin;
