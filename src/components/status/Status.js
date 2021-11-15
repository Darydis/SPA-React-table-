import React from 'react';
import './Status.scss';

const Status = ({ status }) => {
	return (
		<div className="status">
			{status === 'completed' && <div className="completed">Выполнено</div>}
			{status === 'assigned_to' && <div className="assigned_to">Назначено</div>}
			{status === 'new' && <div className="new">Новое</div>}
			{status === 'started' && <div className="started">Начато</div>}
			{status === 'declined' && <div className="declined">Отменено</div>}
		</div>
	);
};

export default Status;
