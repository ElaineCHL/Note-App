import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/notes");
        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.log("Error fetching notes", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      {isRateLimited && <RateLimitedUI />}
    </div>
  )
}

export default HomePage
