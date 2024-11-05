import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { httpClient } from './axios';

// get all
const getAllTodo = () => {
  return httpClient.get(api.getAll);
};

const useGetAllTodo = () => {
  return useQuery({
    queryKey: [api.getAll],
    queryFn: getAllTodo,
    // select: ({ data }) => data.data,
  });
};

// deleteAll
const deleteAllTodo = () => {
  return httpClient.delete(api.deleteAll);
};

const useDeleteAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
    },
  });
};

// create
const createTodo = (data) => {
  return httpClient.post(api.create, data);
};

const useCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
    },
  });
};

// delete by id
const deleteTodo = (id) => {
  return httpClient.delete(api.delete.replace('{id}', `${id}`));
};

const useDeleteToDo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
    },
  });
};

// update
const updateTodo = ({ reqBody }) => {
  return httpClient.put(api.update, reqBody);
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([api.getAll]);
    },
  });
};

export { useDeleteAll, useGetAllTodo, useCreate, useDeleteToDo, useUpdateTodo };
