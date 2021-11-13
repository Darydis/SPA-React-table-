import React from "react";
import { useParams } from "react-router";
import test_data from './../test_data.json';
import Status from "./Status";

const Page = () => {
  
  const {ID} = useParams();
  let record = test_data.find(record => ID == record.id)
  console.log(record)
  return(
    <div style={{textAlign: 'left', padding: '60px'}}>
      <span><strong>Id:</strong> {ID} </span>
      <br />
      <span><strong>Тип задания: </strong>{record.order_type.name}</span><br />
      <span><strong>Автор: </strong>{record.created_user.surname} {record.created_user.name[0]}.{record.created_user.patronymic[0]}.</span><br />
      <span><strong>Аккаунт: </strong>{record.account.name}</span><br />
      <span><strong>Терминал: </strong>{record.terminal.name}</span><br /><br />
      <Status status = {record.status} />
    </div>
  )
}

export default Page;