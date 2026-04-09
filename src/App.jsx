import React, { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const[found,set_found] = useState(false)
   let userId = localStorage.getItem("userId");
   const [loading, setLoading] = useState(false);
  if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("userId", userId);
  }
   const fetchTasks = async () => {
   try {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API}/tasks?userId=${userId}`);
    const data = await res.json();
         set_found(data.length === 0);
        setTasks(data);
    } catch (err) {
    console.log(err);
  }finally {
  setLoading(false);
}
  };
  useEffect(() => {
    fetchTasks();
  }, [userId]);

  // ADD / UPDATE TASK
  const handleSubmit = async () => {
    if (!title.trim()) return;
    if (editId) {
       await fetch(`${import.meta.env.VITE_API}/tasks/${editId}/update`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title,userId }),
});
      setEditId(null);
    } 
    else {
       await fetch(`${import.meta.env.VITE_API}/create_tasks`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title,userId})
        });
    }
    setTitle("");
    fetchTasks();
  };


  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`${import.meta.env.VITE_API}/tasks/${id}/delete`,{ method: "DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({userId})
    });
    fetchTasks();
  };

  //EDIT TASK
  const editTask = (item) => {

    setTitle(item.task);
    setEditId(item.id);
  };

  //  COMPLETE (CHECKBOX)
  const toggleComplete = async (task) => {
  try {
    await fetch(`${import.meta.env.VITE_API}/tasks/${task.id}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    fetchTasks();
  } catch (err) {
    return err;
  }
};

  return(
     <>
        <h1>Task Manager</h1>
      <div className="main_div"> 
        <div className="task3"> 
      <div className="input_div"> 
        <div className="input_field"><input className="input_text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task"/></div>
       <div className="Add" onClick={handleSubmit}>{editId ? "Update" : "Add"}</div>
      </div>
     {found && <div style={{textAlign:'center',marginTop:'50px'}}>not found</div>}
     {loading && <div style={{textAlign:'center',marginTop:'50px'}}>loading</div>}
     <div className="task_list"> 
        {tasks.length>0 && tasks.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <div className="task"> 
          <input type="checkbox"checked={t.complete}onChange={()=>toggleComplete(t)} />
          <div className="text" style={{ marginLeft:"10px",textDecoration: t.complete ? "line-through" : "none"}}>{t.task}</div>
          <div className="btn_box"> 
          <div className="btn" onClick={() => editTask(t)}>Edit</div>
          <div className="btn" onClick={() => deleteTask(t.id)}>Delete</div>
          </div>
        </div>
        </div>
      ))}
      </div>
      </div>
            </div>

    </>
  );
}
export default App;