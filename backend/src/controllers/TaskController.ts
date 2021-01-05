import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Tasks } from '../entities/Tasks';

export const listTasks = async (request: Request, response: Response) => {
  const result = await getRepository(Tasks).find();

  return response.json(result);
}

export const createTask = async (request: Request, response: Response) => {
  const task = await getRepository(Tasks).save(request.body);
    
  return response.json(task);
}

export const listTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getRepository(Tasks).findOne(id);

  return response.json(task);
}

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { title, description } = request.body;

  const task = await getRepository(Tasks).update(id, {
    title,
    description
  });

  if (task.affected > 0) {
    const updatedTask = await getRepository(Tasks).findOne(id);

    return response.json(updatedTask);
  }

  return response.status(404).json({ message: 'Task not found'});
}

export const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const result = await getRepository(Tasks).delete(id);

  if (result.affected > 0) {
    const tasks = await getRepository(Tasks).find();
    return response.json(tasks);
  }

  return response.json({ Error: "Task not deleted"});
}

export const updateOne = async (request: Request, response: Response) => {
  const { id } = request.params;
 
  const task = await getRepository(Tasks).update(id, {
    finished: true
  });

  if (task.affected > 0) {
    const updatedTask = await getRepository(Tasks).findOne(id);

    return response.json(updatedTask);
  }

  return response.json({ Error: 'Task not found'});
}

