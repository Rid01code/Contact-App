import React, {useState , useEffect} from 'react';
import fireDb from "../firebase";
import { useParams , Link } from 'react-router-dom';

import "./View.css"

const View = () => {

  const [user , setUser] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    fireDb.child(`contacts/${id}`).get().then((snapshot)=>{
      if(snapshot.exists()){
        setUser({...snapshot.val()});
      }else{
        setUser({})
      }
    })
  }, [id]);


  return (
    <div className='mainDiv'>
      <div className='container'>

        <header>Contact Details</header>

        <strong>ID: </strong>
        <span>{id}</span>

        <br/>
        <br/>


        <strong>Name: </strong>
        <span>{user.name}</span>

        <br/>
        <br/>

        <strong>Email: </strong>
        <span>{user.email}</span>

        <br/>
        <br/>

        <strong>Contact: </strong>
        <span>{user.contact}</span>

        <br/>
        <br/>

        <Link to="/">
          <button className='back_btn'>Go Back</button>
        </Link>

      </div>
    </div>
  )
}

export default View