import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todo from './ToDo/screens/Todo';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
