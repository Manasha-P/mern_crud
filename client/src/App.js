
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL||"http://localhost:4000";

function App() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    const res = await axios.get(API);
    setPeople(res.data);
  };

  const addPerson = async () => {
    const res = await axios.post(API, form);
    setPeople([...people, res.data]);
    setForm({ name: "", age: "" });
  };

  const updatePerson = async () => {
    const res = await axios.put(`${API}/${editId}`, form);
    setPeople(people.map(p => (p.id === editId ? res.data : p)));
    setEditId(null);
    setForm({ name: "", age: "" });
  };

  const deletePerson = async (id) => {
    await axios.delete(`${API}/${id}`);
    setPeople(people.filter(p => p.id !== id));
  };

  return (
    <div>
      <h3>MERN CRUD</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={e => setForm({ ...form, age: e.target.value })}
      />

      {editId ? (
        <button onClick={updatePerson}>Update</button>
      ) : (
        <button onClick={addPerson}>Add</button>
      )}

      <hr />

      {people.map(p => (
        <div key={p.id}>
          <b>{p.name}</b> — {p.age}
          <button onClick={() => {
            setEditId(p.id);
            setForm({ name: p.name, age: p.age });
          }}>Edit</button>
          <button onClick={() => deletePerson(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;