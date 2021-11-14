import React from "react";
import {useTable, usePagination} from 'react-table';
import test_data from '../../test_data.json';
import "./MainPage.scss";
import Status from "../Status/Status";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  
  const navigate = useNavigate();
  const data = React.useMemo(
    () => test_data,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Номер/дата',
        accessor: 'col1', 
        Cell: ({ row }) => (
          <>
            <div  
              className="data1"
              dangerouslySetInnerHTML={{__html: `№${row&&row.original&&row.original.id}`}}
              
              />
            <div
              className="data2"
              dangerouslySetInnerHTML={{__html: `№${row&&row.original&&row.original.created_date}`}}
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
              dangerouslySetInnerHTML={{__html: `${row&&row.original&&row.original.order_type.name}`}}
              />
            <div
              className="data2"
              dangerouslySetInnerHTML={{__html: `${row&&row.original&&row.original.created_user.surname} ${row.original.created_user.name[0]}. ${row.original.created_user.patronymic[0]}.`}}
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
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
      initialState: {pageIndex: 0},
    },
    usePagination
  )

  return(
    <>
     
    <table {...getTableProps()}>
     <thead>
       {
       headerGroups.map(headerGroup => (
        <div className='thead'>
           <tr {...headerGroup.getHeaderGroupProps()}>
           {
           headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()}>
               {
               column.render('Header')}
             </th>
           ))}
         </tr>
        </div>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {
       page.map((row,i) => {
         prepareRow(row)
         return (
           <div>
             <tr className='row' style={{cursor: 'pointer'}}  onClick={() => {
              
              navigate(`/id/${row.original.id}`);
            }} {...row.getRowProps()}>
             {
             row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()}>
                   {
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