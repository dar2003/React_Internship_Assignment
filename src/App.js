import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [attendingWithGuest, setAttendingWithGuest] = useState('no');
  const [guestName, setGuestName] = useState('');
  const [summary, setSummary] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Email must be a valid email format';
    if (!age) newErrors.age = 'Age is required';
    else if (age <= 0) newErrors.age = 'Age must be a number greater than 0';
    if (attendingWithGuest === 'yes' && !guestName) newErrors.guestName = 'Guest Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      name,
      email,
      age,
      attendingWithGuest,
      guestName: attendingWithGuest === 'yes' ? guestName : '',
    };

    setErrors({});
    setSummary(formData);
  };

  return (
    <div className="App">
      <h1>Form Example</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <br /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <br /><br />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
        <br /><br />

        <label htmlFor="attendingWithGuest">Are you attending with a guest?</label>
        <select
          id="attendingWithGuest"
          value={attendingWithGuest}
          onChange={(e) => setAttendingWithGuest(e.target.value)}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <br /><br />

        {attendingWithGuest === 'yes' && (
          <div>
            <label htmlFor="guestName">Guest Name:</label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
            {errors.guestName && <p style={{ color: 'red' }}>{errors.guestName}</p>}
          </div>
        )}

        <input type="submit" value="Submit" />
      </form>

      {summary && (
        <div className="summary">
          <h2>Summary</h2>
          <p>Name: {summary.name}</p>
          <p>Email: {summary.email}</p>
          <p>Age: {summary.age}</p>
          <p>Attending with guest: {summary.attendingWithGuest === 'yes' ? 'Yes' : 'No'}</p>
          {summary.attendingWithGuest === 'yes' && <p>Guest Name: {summary.guestName}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
