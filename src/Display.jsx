import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./styles/Display.css"; // import the separate CSS file

const Display = () => {
  const [queue, setQueue] = useState([]);
  const [serving, setServing] = useState(null);

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

  return (
    <div className="display-container">
      <h2 className="display-title">
        <img className="icon1" src="/ticon.png" alt="icon" /> Queue Display
      </h2>

      {serving ? (
        <div className="serving-box">
          <h3 className="serving-title">Now Serving</h3>
          <p>
            <b>Ticket:</b> {serving.ticket}
          </p>
          <p>
            <b>Name:</b> {serving.fullName}
          </p>
        </div>
      ) : (
        <p className="no-serving">No one is currently being served.</p>
      )}

      <h3 className="queue-list-title">📋 Queue List</h3>
      <ul className="queue-list">
        {queue.map((item) => (
          <li key={item.id} className="queue-item">
            {item.ticket} - {item.fullName} ({item.status})
            {item.status === "skipped" && item.skipReason && (
              <span className="skip-reason"> — Reason: {item.skipReason}</span>
            )}
          </li>
        ))}
      </ul>

      {/* ✅ Footer for school details */}
      <footer className="queueform-footer">
        <p><b>Consolatrix College of Toledo City</b></p>
        <p>Contact: (032) 466-87771 466-1690 | Email: consolatrixcollegeoftoldeo2005@gmail.com</p>
        <p>© {new Date().getFullYear()} Consolatrix College - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Display;
