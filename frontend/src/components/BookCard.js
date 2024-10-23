import React ,{useState}from 'react'
import { Container,Card,Button } from 'react-bootstrap'

export default function BookCard({Books}) {
  return (
    <Container className='d-flex flex-wrap justify-content-center'>

     {Books.map((i,idx)=>{
        return (
            <Card key={idx} className='mx-3 my-3' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={i['Image-URL-M']} style={{height:'20rem'}}/>
            <Card.Body>

              <Card.Title>{i['Book-title']}</Card.Title>
              <Card.Text>
                <p>{i['Book-author']}</p>
                <p>{`${Number(i['avg_rating']).toFixed(2)}/10`}</p>
                <p>{`${i['num_ratings']} ratings`}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        )
     })} 
    </Container>
  )
}
