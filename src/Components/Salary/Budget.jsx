import React, { Component } from 'react'
import { Badge } from '@mantine/core';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from '@mantine/core';
import ModaladdBudget from './ModaladdBudget';


export default class Budget extends Component {
    


      
    
  render() {

    const ddd = ({
        columns: [
          {
            label: 'Name',
            field: 'name',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            },
          },
          {
            label: 'Position',
            field: 'position',
            width: 270,
          },
          {
            label: 'Office',
            field: 'office',
            width: 200,
          },
          {
            label: 'Age',
            field: 'age',
            sort: 'asc',
            width: 100,
          },
          {
            label: 'Start date',
            field: 'date',
            sort: 'disabled',
            width: 150,
          },
          {
            label: 'Salary',
            field: 'salary',
            sort: 'disabled',
            width: 100,
          },
        ],
        rows: [
          {
            name: 'Tiger Nixon',
            position: 'System Architect',
            office: 'Edinburgh',
            age: '61',
            date: '2011/04/25',
            salary: '$320',
          },
          {
            name: 'Garrett Winters',
            position: 'Accountant',
            office: 'Tokyo',
            age: '63',
            date: '2011/07/25',
            salary: '$170',
          },
          {
            name: 'Ashton Cox',
            position: 'Junior Technical Author',
            office: 'San Francisco',
            age: '66',
            date: '2009/01/12',
            salary: '$86',
          },
          {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433',
          },
          {
            name: 'Airi Satou',
            position: 'Accountant',
            office: 'Tokyo',
            age: '33',
            date: '2008/11/28',
            salary: '$162',
          },
          {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433',
          },
          {
            name: 'Airi Satou',
            position: 'Accountant',
            office: 'Tokyo',
            age: '33',
            date: '2008/11/28',
            salary: '$162',
          },
          {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433',
          },
          {
            name: 'Airi Satou',
            position: 'Accountant',
            office: 'Tokyo',
            age: '33',
            date: '2008/11/28',
            salary: '$162',
          },
          {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433',
          },
          {
            name: 'Airi Satou',
            position: 'Accountant',
            office: 'Tokyo',
            age: '33',
            date: '2008/11/28',
            salary: '$162',
          },
         
        ],
      });


    return (
      <div>
        <Badge color="var(--primary)" size='lg'  variant='light'>จัดการงบประมาณ</Badge>
       
        <p className='text-right'> <ModaladdBudget/></p>
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={ddd} searchTop searchBottom={false} className='mt-2' />
      
      </div>
    )
  }
}
