import React,{useEffect, useState} from 'react'
import MainNavbar from '../components/Navbar'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import axios from 'axios'
import websiteBannerTest from './homepage-bookstore-2022.jpg'
import './Home.css'
import {api_address} from '../config/pythonAPI.js'
import BookCard from '../components/BookCard'
import {motion} from 'framer-motion'

export default function Home() {
  const [BookNames,setBookNames] = useState([])//for search feature
  const [data,setData]=useState({status:1,books:[]})
  let flag=0;
  const [BookName,setBookName]=useState("")//for reccomended books
  const fetchReccomendations = async (e,name)=>{
    e.preventDefault();

    let config = {
       method:'post',            
       maxBodyLength: Infinity,
       url: api_address+'/reccomendations_api',
       headers:{ 
        'Content-Type': 'application/json'
       },
       data: {name:name}, 
    };

    const res = await axios.request(config)
    
    setData(res.data)
    setBookName("")
  }
  const fetchBookNames = async ()=>{
      let config = {
        method : 'get',       
        maxBodyLength: Infinity,
        url : api_address+'/book_names',
        header:{}
      };

      const res = await axios.request(config);
      setBookNames(res.data.BookNames)    

  }
  
  useEffect(()=>{
    fetchBookNames()
    return ()=>{}
  },[])
  
  const NoBooksHandler=()=>{
    if(data.status==1 && data.books.length==0){
      return(
        <Row className='my-5 mb-5 text-center '>
          <motion.h5 initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.5}}>Enter a Book name to get Machine Learning powered book reccomendation. </motion.h5>
        </Row>
      )
    }
    if (data.status==0){
    return (
        <Row className='d-flex text-center my-5'>
          <p className='h4'>No Books with that name exsists <br /> <br />Try another Book Name</p>
        </Row>
      )
    }
    else{
      return(
      <h1>Reccomendations:</h1>
      )
    }
  }


  return (
    <>
    <MainNavbar/>
    <div className='hero'>
      <motion.div className='herotext' initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}} transition={{duration:0.5}}>
        <h1 id="title"><strong>Welcome to SmartReadsML</strong></h1>
        <h4>
          Welcome to SmartReadsML, where personalized reading experiences meet cutting-edge technology. <br />This project is built on collaborative filtering, a powerful recommendation system that analyzes user preferences to suggest content tailored just for you.
        </h4>
        <motion.div className="mt-4" initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{duration:1}}>
        <h1><strong>How does it work? </strong></h1>
            <h4 className='points'>Takes user input using React.js for frontend</h4>
            <h4 className='points'>A combination of CSS and Bootstrap is used to style the website</h4>
            <h4 className='points'>The react.js website is deployed on vercel</h4>
            <h4 className="points">A PythonAnywhere Flask server hosts the reccomeder system</h4>
            <h4 className="points">The model used in this project collaborative filtering recommender system </h4>
        </motion.div>
      </motion.div>
      <img src={websiteBannerTest} className='heroimg'></img>
    </div>
    <Container>
      <Row className='mt-5'>
        <Col xs={0} sm={0}></Col>
        <Col xs={8} sm={8} lg={6} xl={6}>
        <form onSubmit={(e)=>fetchReccomendations(e,BookName)}>
        <div className='dropdown' style={{border:'solid',borderWidth:'0.1rem',borderRadius:'6px'}} >
            
            <input
              type="text"
              placeholder=" enter a book name"
              className="me-2"
              aria-label="Search"
              value={BookName}
              onChange={(e)=>setBookName(e.target.value)}
              style={{width:'100%',borderRadius:'5px',boxShadow:'none'}}
              onSubmit={(e)=>{alert('hi');fetchReccomendations(e,BookName)}}
            />
          {BookNames.filter((name)=>{
            if(BookName.length==0){
              return false
            }
            for(let i=0;i<BookName.length;i++){
              if(i>=name.length){
                return false;
              }
              if(BookName[i].toLowerCase()!=name[i].toLowerCase()){
                return false;
              }
            }
            return true;

          }).map((name)=>{
            return (
              <p onClick={(e)=>{
                setBookName(name);
                fetchReccomendations(e,name)  
              }}
              > 
                {name}
              </p>
            )
          })}
          </div>
          </form>
        </Col>
        <Col >
        <Button variant="outline-success" onClick={(e)=>fetchReccomendations(e,BookName)}>Search</Button>
        </Col>
        <Col xs={0} sm={0}></Col>
      </Row>
      {NoBooksHandler()}

      <Row>
        <BookCard Books={data.books}></BookCard>
      </Row>
    </Container>
    </>
  )
}
