import React,{useState , useEffect} from 'react';
import {useNavigate , useParams} from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import {toast} from "react-toastify";



const initialState = {
  name : "",
  email : "",
  contact: ""
}
const AddEdit = () => {
  const [state , setState] = useState(initialState);
  const [data , setData] = useState({});
  const {name , email , contact} = state ;
    const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value" , (snapshot)=>{
      if(snapshot.val() !== null){
        setData({...snapshot.val()})
      }else{
        setData({});
      }
    });
    return ()=>{
      setData({})
    }
  },[id]);

  useEffect(()=>{
    if(id) {
      setState({...data[id]})
    } else{
      setState({...initialState})
    };

    return()=>{
      setState({...initialState})
    };
  },[id , data]);



  const handleInputChange = (e) => {const{name , value} = e.target;
setState({...state , [name] : value})};

  const handleSubmit = (e) =>{e.preventDefault();
  if(!name || !email || !contact ){
    toast.error("Pleas provide a value in each input field")
  } else{
      if(!id){
        fireDb.child("contacts").push(state , (err) => {
          if(err){
            toast.error(err)
          } else{
            toast.success("Contact added successfully")
          }
        })
      } else{
        fireDb.child(`contacts/${id}`).set(state , (err) => {
          if(err){
            toast.error(err)
          } else{
            toast.success("Contact Updated successfully")
          }
        })
      }
      setTimeout(()=> navigate("/") , 500)
    }
  };


  return (
    <div className='mainDiv'>
      <form action="" className="form" onSubmit={handleSubmit}>

        <div> 
          <label htmlFor="name" className="form__label">Name</label>
          <input type="text" name='name' value={name || ""} placeholder="Name" className="name_input" onChange={handleInputChange}/>
        </div>

        <div>
          <label htmlFor="email" className="form__label">Email</label>
          <input type="email" name='email' value={email || ""} placeholder="Email" className="email_input" onChange={handleInputChange}/>
        </div>

        <div>
          <label htmlFor="contact" className="form__label">Contact</label>
          <input type="number" name='contact' value={contact || ""} placeholder="Number" className="contact_input" onChange={handleInputChange}/>
        </div>

        <div>
          <input type='submit' value={id ? "update" : "save"}/>
        </div>
      
    </form>
    </div>

  )
}

export default AddEdit