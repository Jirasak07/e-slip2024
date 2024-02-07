import React, { Component } from 'react'
import { Badge } from '@mantine/core';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from '@mantine/core';
import ModaladdBudget from './ModaladdBudget';
import { API } from '../Config/ConfigApi';
import axios from "axios";

export default class Budget extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    
    };
  
  
}


componentDidMount() { 
  axios.get(API+"/index/showBudget")
  .then(res => {
      console.log(res);
        this.setState({ data: res.data })
    

  })
}

      
    
  render() {

    const ddd = ({
        columns: [
          {
            label: 'ลำดับ',
            field: 'name',
            width: 150,
          },
          {
            label: 'ชื่องบประมาณ',
            field: 'namebudget',
            width: 200,
          },
          {
            label: 'level',
            field: 'levelbudget',
            width: 200,
          },
        ],
       
        rows: [...this.state.data.map((data, i) => (
          {
             name: <>{i+1}</>,
             namebudget: <>{data.namebudget}</>,
             levelbudget: <>{data.levelbudget}</>,
          }
         )
         )]

      });


    return (
      <div>
        <Badge color="var(--primary)" size='lg'  variant='light'>จัดการงบประมาณ</Badge>
       
        <p className='text-right'> <ModaladdBudget/></p>
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={ddd} searchTop searchBottom={false}  className='mt-2' />
      
      </div>
    )
  }
}
