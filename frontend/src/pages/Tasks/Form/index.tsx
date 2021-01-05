import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../../services/api';

interface ITask {
  title: string;
  description: string;
}

interface IParamsProps {
  id: string;
}

const Tasks: React.FC = () => {
  const [model, setModel] = useState<ITask>({
    title: '',
    description: ''
  });

  const history = useHistory();

  const { id } = useParams<IParamsProps>();

  useEffect( () => {
    if (id !== undefined) {
      findTask(id)
    }
  }, [id]);

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/tasks/${id}`, model);
    } else {
      const response = await api.post('/tasks', model);
    }
    
    history.push('/tarefas');
  }

  function back() {
    history.goBack();
  }

  async function findTask(id: string) {
    const response = await api.get(`tasks/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description
    })
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        { id !== undefined ? <h3>Editar Tarefa</h3> : <h3>Nova Tarefa</h3> }
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br/>
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>
          <Button variant="dark" type="submit" size="sm">
            Salvar  
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Tasks;