import React , {useState , useEffect} from 'react';
import fireDb from"../firebase";
import { Link } from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";


const Home = () => {

  const[data , setData] = useState({});

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
  },[]);

  const  onDelete = (id)=> {
    if(window.confirm("are you sure to delete this contact ?")){
      fireDb.child(`contacts/${id}`).remove((err) => {
        if(err) {
          toast.error(err)
        } else{
          toast.success("Contact Deleted Successfully")
        }
      })
    }
  }
  return (
    <div className='homeDiv'>
      <table className='styledTable'>
        <thead>
          <tr className='theadTr'>
            <th>Index</th>
            <th>Name</th>
            <th>email</th>
            <th>Number</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id , index) => {
            return(
              <tr key={id} className='tbodyTr'>
                <th scope='row'>{index+1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn updt_btn'>Update</button>
                  </Link>
                  <Link to={`/View/${id}`}>
                    <button className='btn view_btn'>View</button>
                  </Link>
                  <button className='btn dlt_btn' onClick={()=>onDelete(id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home