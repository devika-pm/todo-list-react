import React, { useState, useRef, useEffect } from 'react'
import './Todos.css'

function Todos() {

const [inputstate ,setInputState] = useState("")
const [inputsubmit, setInputSubmit] = useState([]);
const [inputedit, setInputEdit] = useState(null);//used to store the index of edited one
const [editinputvalue, setEditInputValue] = useState("");//used to store the value of edited one




  const handleInput = (e)=>{
    setInputState(e.target.value);
  }
  //console.log(inputstate);
  const handleEdit = (index) => {
    setInputEdit(index);
    setEditInputValue(inputsubmit[index]);
  };

  const handleSave = (index) => {
    const updatedItems = inputsubmit.map((item, i) =>
      i === index ? editinputvalue : item
    );
    setInputSubmit(updatedItems);
    setInputEdit(null);
    setEditInputValue("");
  };

  const handleDelete = (index) => {
    const updatedItems = inputsubmit.filter((_, i) => i !== index);
    setInputSubmit(updatedItems);
  };

  const handleAllDelete = () => {
    setInputSubmit([]);
  };


  const iref = useRef();
  const editref = useRef();

  useEffect(() => {
    iref.current.focus();
  }, []);

  useEffect(() => {
    if (editref.current && inputedit !== null) {
      editref.current.focus();
    }
  }, [inputedit]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(inputstate.trim() !==""){
      setInputSubmit([...inputsubmit,inputstate]);
      setInputState("");


    }

  };
 

  return (
    <div style={{marginTop:'100px'}} className="d-flex flex-column align-items-center">
        <div className="heading border rounded-pill mb-3 p-2 bg-light text-dark">
        <h2>Todo List</h2>
      </div>
      <form className='d-flex justify-content-center align-items center mt-4 border rounded-pill'>
        <div className='border-0 rounded-pill textBox border bg-white rounded-pill d-flex justify-content-between align-items-center p-2'>
            <input     className="p-2 rounded-pill border-0"
            style={{ width: "900px" }}
             type='text'
             ref={iref}
              placeholder='Enter Your Todo...!' onChange={(e)=>handleInput(e)}/>
            <button className="btn btn-primary rounded-pill ml-2" onClick={handleSubmit}>
            <i className="fa-solid fa-plus" ></i>

            </button>
         
        </div>

      </form>

      <div>
        <ul className=' list-unstyled'>
     {inputsubmit.length > 0 ?(
           <>
           <div className='d-flex justify-content-center align-items-center p-2 mt-2  rounded-pill'
           >
           <p
                   className="fw-bolder mt-4 rounded-pill p-1 ms-5 "
                   style={{
                     color: "black",
                     marginRight: "20px",
                     borderRadius: "4px",
                     backgroundColor: " #33ccff",
                     width: "200px",
                     height:"70px",
                     textAlign: "center",
                     fontSize:"30px"
                   }}
                 >
                 Tasks :
                 </p>
                 <i
                   onClick={handleAllDelete}
                   className="fa-solid fa-trash fa-2xl me-5 mt-3"
                   style={{ color: "#dc3545", cursor: "pointer" }}
                 ></i>
           </div>{inputsubmit.map((item,index)=>(
           <li className="rounded-pill p-2 d-flex justify-content-between align-items-center me-5"
           key={index}
           style={{
             padding: "30px",
             marginRight: "490px",
             marginTop: "40px",
             backgroundColor: "#f8f9fa",
             borderRadius: "5px",
             minWidth: "300px",
             height: "60px",
           }}>
             {inputedit !== index ?(
              item
              ) : (
              <input  type='text'  ref={editref} onChange={(e) => setEditInputValue(e.target.value)}
              value={editinputvalue} className="p-1 rounded-pill border-0 mt-1 mb-1" 
              style={{width:"500px",height:'60px'}}/>
              )}
             <div>
             <i 
              onClick={() =>
                inputedit === index
                  ? handleSave(index)
                  : handleEdit(index)
              }
              className={`fa-solid ${
                inputedit === index ? "fa-square-check" : "fa-check"
              } fa-beat ms-3 me-3`}
              style={{ color: "green" ,cursor:"pointer"}}></i>
                    
             <i onClick={() => handleDelete(index)}
                       
                       className="fa-solid fa-trash  me-2  size-8"
                       style={{ color: "red",cursor:"pointer" }}
                     ></i>
                     
             </div>
           </li>))}
           </>):(
            <p
              className="fw-bolder mt-4 p-1 "
              style={{
                color: "yellow",
                
              }}
            >
  No tasks have been added. Feel free to start adding tasks above!
            </p>
          )
     }

        </ul>
       
      </div>

    </div>
  );
}

export default Todos