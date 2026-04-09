import React, { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
    let userId = localStorage.getItem("userId");
   const [loading, setLoading] = useState(false);
   const[filter,set_filter] = useState("All")
    if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("userId", userId);
  }
   const fetchTasks = async () => {
   try {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API}/tasks?userId=${userId}`);
    const data = await res.json();
         setTasks(data);
    } catch (err) {
       alert("Network error ❌ Check your internet");
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
const filter_by = ["All","Pending","Completed"]

const filter_task = tasks.filter((item) => {
  if (filter === "All") return true;
  if (filter === "Completed") return item.complete;
  if (filter === "Pending") return !item.complete;
});
console.log("all",filter_task)
  return(
     <>
        <h1>Task Manager</h1>
      <div className="main_div"> 
        <div className="task3"> 
          <div className="filter_item">
            {
              filter_by.map((item)=>{
                return <>
                <div onClick={()=>set_filter(item)}>{item}</div>
                </>
              })
            }
          </div>

      <div className="input_div"> 
        <div className="input_field"><input className="input_text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task"/></div>
       <div className="Add" onClick={handleSubmit}>{editId ? "Update" : "Add"}</div>
      </div>
     {loading && <div style={{textAlign:'center',marginTop:'50px'}}>loading</div>}
     <div className="task_list"> 
        {filter_task.length>0 ? filter_task.map((t) => (
        <div key={t.id} style={{ marginBottom: "10px" }}>
          <div className="task"> 
          <input type="checkbox"checked={t.complete}onChange={()=>toggleComplete(t)} />
          <div className="text" style={{ marginLeft:"10px",textDecoration: t.complete ? "line-through" : "none"}}>{t.task}</div>
          <div className="btn_box"> 
          <div className="btn" onClick={() => editTask(t)}>Edit</div>
          <div className="btn" onClick={() => deleteTask(t.id)}>Delete</div>
          </div>
                  <div style={{fontSize:'10px'}}>{new Date(t.created_at).toLocaleString()}</div>
        </div>
         </div>
      )):<><div style={{textAlign:"center"}}>OOPS NOT FOUND</div></>}
      </div>
      </div>
            </div>

    </>
  )
}
export default App;
