import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import api from '../../../services/api';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date
  updated_at: Date;
}

interface IParamsProps {
  id: string
}

const Detail: React.FC = () => {
  const { id }  = useParams<IParamsProps>();
  const history = useHistory();

  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask(id)
  }, [id]);

  function back() {
    history.goBack();
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  async function findTask(id: string) {
    const response = await api.get<ITask>(`/tasks/${id}`);

    setTask(response.data);
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h3>Detalhes</h3>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br/>

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          
          <Card.Text>
            { task?.description }
            <br/>
            <strong>Status: </strong>
            <Badge variant={ task?.finished ? "success" : "warning" }>
              { task?.finished ? "FINALIZADO" : "PENDENTE" }
            </Badge>

            <br/>
            
            <strong>Data de cadastro: </strong>
            <Badge variant="info">
              { formateDate(task?.created_at) }
            </Badge>
            <br/>
            <strong>Data de Atualização: {}</strong>
            <Badge variant="info">
              { formateDate(task?.updated_at) }
            </Badge>
          </Card.Text>

          
        </Card.Body>
      </Card>
      
    </div>
  );
}

export default Detail;