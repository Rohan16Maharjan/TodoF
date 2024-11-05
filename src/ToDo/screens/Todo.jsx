import { useForm } from 'react-hook-form';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {
  useCreate,
  useDeleteAll,
  useDeleteToDo,
  useGetAllTodo,
  useUpdateTodo,
} from '../services';
import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const Todo = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useGetAllTodo();
  const { mutate: del } = useDeleteAll();
  const { mutate: add } = useCreate();
  const { mutate: del1 } = useDeleteToDo();
  const { mutate: upda } = useUpdateTodo();

  const [taskId, setTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      const taskToEdit = data?.data.find((item) => item.id === taskId);
      if (taskToEdit) {
        setValue('title', taskToEdit.title);
      } else {
        setValue('title', '');
      }
    } else {
      reset();
    }
  }, [taskId, data, setValue, reset]);

  const onSubmit = (eg) => {
    if (taskId) {
      upda({
        reqBody: {
          id: taskId,
          title: eg.title,
        },
      });
    } else {
      add(eg);
    }
    setTaskId(null);
    reset();
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete All?')) {
      try {
        await del();
      } catch (err) {
        console.error('Error deleting the data', err);
      }
    }
  };

  const handleDelete = (id) => {
    alert('Are you sure you want to delete it ?');
    del1(id);
  };

  const handleEdit = (data) => {
    setTaskId(data?.id);
  };

  const handleTask = (data) => {
    setSelectedTask(data);
    onOpen();
  };

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title', { required: 'This field is required' })}
          style={{ border: '1px solid black' }}
        />
        {errors.title && (
          <span style={{ color: 'red' }}>This field is required</span>
        )}

        <button type="submit">{taskId ? 'Edit' : 'Add'}</button>
        <button onClick={() => handleDeleteAll()}>Clear All</button>
      </form>
      <ul>
        {data?.data.map((item) => (
          <li key={item.id}>
            {item?.title}
            <Flex alignItems={'center'}>
              <button
                style={{ border: 'none', marginRight: '1rem' }}
                type="button"
                onClick={() => handleEdit(item)}
              >
                <FaEdit style={{ cursor: 'pointer' }} />
              </button>

              <MdDelete
                onClick={() => handleDelete(item?.id)}
                style={{ cursor: 'pointer' }}
              />

              <Button mt={4} onClick={() => handleTask(item)}>
                <FaEye style={{ cursor: 'pointer' }} />
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {selectedTask ? (
                      <div>
                        <h2>Title: {selectedTask?.title}</h2>
                      </div>
                    ) : (
                      <p>No task selected.</p>
                    )}{' '}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
