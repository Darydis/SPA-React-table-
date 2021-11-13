import React, { useState } from "react";
import {useTable, usePagination} from 'react-table';
import test_data from './../test_data.json';
import "./../styles/MainPage.scss";
import Status from "./../components/Status";
import { useNavigate } from "react-router-dom";
import Page from "./Page";

const MainPage = () => {
  
  const navigate = useNavigate();
  const [id, setId] = useState();
  const data = React.useMemo(
    () => test_data,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Номер/дата',
        accessor: 'col1', // accessor is the "key" in the data
        Cell: ({ row }) => (
          <>
            <div style={{cursor: 'pointer'}} onClick={(id) => {
              setId(row.original.id)
              navigate(`/id/${row.original.id}`);
              
            }} 
              className="data1"
              dangerouslySetInnerHTML={{__html: `№${row.original.id}`}}
              
              />
            <div
              className="data2"
              dangerouslySetInnerHTML={{__html: `№${row.original.created_date}`}}
            />
          </>
        )
      },
      {
        Header: 'Тип задания/Автор',
        accessor: 'col2',
        Cell: ({ row }) => (
          <>
            <div 
              className="data1"
              dangerouslySetInnerHTML={{__html: `${row.original.order_type.name}`}}
              />
            <div
              className="data2"
              dangerouslySetInnerHTML={{__html: `${row.original.created_user.surname} ${row.original.created_user.name[0]}. ${row.original.created_user.patronymic[0]}.`}}
            />
          </>
        )
      },
      {
        Header: 'Аккаунт/Терминал',
        accessor: 'col3',
        Cell: ({ row }) => (
          <>
            <div 
              className="data1"
              dangerouslySetInnerHTML={{__html: `${row.original.account.name}`}}
              />
            <div
              className="data2"
              dangerouslySetInnerHTML={{__html: `${row.original.terminal.name}`}}
            />
          </>
        )
      },
      {
        Header: 'Статус',
        accessor: 'col4',
        Cell: ({ row }) => (
          <>
            <Status status={row.original.status} />
            
          </>
        )
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data })
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 2},
    },
    usePagination
  )

  return(
    <>
     
    <table {...getTableProps()}>
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
        <div className='thead'>
           <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
        </div>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       page.map((row,i) => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <div>
             <tr className='row' {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
           </div>
         )
       })}
     </tbody>
   </table>
   <div className='pagination'>
    <span className='first'>
      записи {' '}
        {pageIndex + 1} of {pageOptions.length}
      {' '}
    </span>
    <div className='buttons'>
    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    <div className='double'>
      <div className='prev'></div>
      <div className='prev'></div>
    </div>
    </button>{' '}
    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
      <div className='prev'></div>
    </button>{' '}
    <span className='pageIndex'>{pageIndex+1}</span>
    <button onClick={() => nextPage()} disabled={!canNextPage}>
      <div className='next'></div>
    </button>{' '}
    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
      <div className='double'>
        <div className='next'></div>
        <div className='next'></div>
      </div>
    </button>{' '}
    </div>
   {/* <span>
     | Go to page:{' '}
     <input
       type="number"
       defaultValue={pageIndex + 1}
       onChange={e => {
         const page = e.target.value ? Number(e.target.value) - 1 : 0
         gotoPage(page)
       }}
       style={{ width: '100px' }}
     />
   </span>{' '} */}
   <div className='third'>
   <span> по </span>
   <select className='pageSize'
     value={pageSize}
     onChange={e => {
       setPageSize(Number(e.target.value))
     }}
   >
     
     {[5, 10, 25, 50].map(pageSize => (
       <option key={pageSize} value={pageSize}>
        {pageSize}
       </option>
     ))}
   </select>
   <span> записей </span>
   </div>
 </div>
 </>
  )
}

export default MainPage;