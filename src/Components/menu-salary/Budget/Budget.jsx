import React, { Component } from 'react'
import { Badge } from '@mantine/core';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from '@mantine/core';
import ModaladdBudget from './ModaladdBudget';
import { API } from '../../Config/ConfigApi';
import axios from "axios";
import ModaleditBudget from './ModaleditBudget';

export default class Budget extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      data:[],
    
    };
    this.getshowBudget = this.getshowBudget.bind(this);
  
}

getshowBudget() { 
  axios.get(API+"/index/showBudget")
  .then(res => {
      console.log(res);
        this.setState({ data: res.data })
    

  })
}

componentDidMount() { 
  this.getshowBudget()
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
          {
            label: 'จัดการ',
            field: 'levelbudget1',
            width: 200,
          },
        ],
       
        rows: [...this.state.data.map((data, i) => (
          {
             name: <>{i+1}</>,
             namebudget: data.namebudget,
             levelbudget: data.levelbudget,
             levelbudget1: <><ModaleditBudget idbudget={data.idbudget} namebudget={data.namebudget} levelbudget={data.levelbudget} getshowBudget={this.getshowBudget} /></>,
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
