import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { request, gql, GraphQLClient } from "graphql-request";
import { endpoint } from "../constants/Endpoints";
import { Task } from "../constants/Types";

const graphQLClient = new GraphQLClient(`${endpoint}/tasks`);

const queryAllTasks = gql`
  query {
    tasks {
      id
      checked
      description
      content
      priority
      updated
      shared
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
    $shared: Boolean!
  ) {
    editTask(
      id: $id
      content: $content
      priority: $priority
      description: $description
      shared: $shared
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

const mutateCheckTask = gql`
  mutation EditTask($id: ID!, $checked: Boolean!, $shared: Boolean!) {
    editTask(id: $id, checked: $checked, shared: $shared) {
      id
    }
  }
`;

const mutateShareTask = gql`
  mutation EditTask($id: ID!, $todoistLink: Boolean!) {
    editTask(id: $id, todoistLink: $todoistLink) {
      id
    }
  }
`;

export const GetAllTasks = () => {
  const response = useQuery({
    queryKey: [`GetAllTasks`],
    queryFn: async () => request(`${endpoint}/tasks`, queryAllTasks),
  });
  return response as UseQueryResult<{ tasks: Task[] }, Error>;
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
  return response as UseMutationResult<{ addTask: { id: string } }, Error>;
};

export const EditTask = (
  id: string,
  content: string,
  priority: number,
  description: string,
  shared: boolean
) => {
  const response = useMutation({
    mutationKey: [`EditTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateEditTask, {
        id: id,
        content: content,
        priority: priority,
        description: description,
        shared: shared,
      }),
  });
  return response as UseMutationResult<{ editTask: { id: string } }, Error>;
};

export const DeleteTask = (id: string) => {
  const response = useMutation({
    mutationKey: [`DeleteTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateDeleteTask, {
        id: id,
      }),
  });
  return response as UseMutationResult<{ deleteTask: { id: string } }, Error>;
};

export const CheckTask = (id: string, checked: boolean, shared: boolean) => {
  const response = useMutation({
    mutationKey: [`CheckTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateCheckTask, {
        id: id,
        checked: checked,
        shared: shared,
      }),
  });
  return response as UseMutationResult<{ editTask: { id: string } }, Error>;
};

export const ShareTask = (id: string, share: boolean) => {
  const response = useMutation({
    mutationKey: [`ShareTask`],
    mutationFn: async () =>
      graphQLClient.request(mutateShareTask, {
        id: id,
        todoistLink: share,
      }),
  });
  return response as UseMutationResult<{ editTask: { id: string } }, Error>;
};
