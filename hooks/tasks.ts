import { useMutation, useQuery } from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";
import { endpoint } from "../constants/Endpoints";

const graphQLClient = new GraphQLClient(`${endpoint}/tasks`);

const queryAllTasks = gql`
  query {
    tasks {
      id
      checked
      description
      content
      priority
    }
  }
`;

const mutateAddTask = gql`
  mutation AddTask($content: String!, $priority: Int!, $description: String!) {
    addTask(content: $content, priority: $priority, description: $description) {
      id
    }
  }
`;

const mutateEditTask = gql`
  mutation EditTask(
    $id: ID!
    $content: String!
    $priority: Int!
    $description: String!
  ) {
    editTask(
      id: $id
      content: $content
      priority: $priority
      description: $description
    ) {
      id
    }
  }
`;

const mutateDeleteTask = gql`
  mutation EditTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const GetAllTasks = () => {
  const response = useQuery({
    queryKey: [`GetAllTasks`],
    queryFn: async () => request(`${endpoint}/tasks`, queryAllTasks),
  });
  return response;
};

export const AddTask = (
  content: string,
  priority: number,
  description: string
) => {
  const response = useMutation({
    mutationKey: [`AddTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateAddTask, {
        content: content,
        priority: priority,
        description: description,
      }),
  });
  return response;
};

export const EditTask = (
  id: string,
  content: string,
  priority: number,
  description: string
) => {
  const response = useMutation({
    mutationKey: [`EditTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateEditTask, {
        id: id,
        content: content,
        priority: priority,
        description: description,
      }),
  });
  return response;
};

export const DeleteTask = (id: string) => {
  const response = useMutation({
    mutationKey: [`DeleteTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateDeleteTask, {
        id: id,
      }),
  });
  return response;
};
