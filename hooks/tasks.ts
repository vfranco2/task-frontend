import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { endpoint } from "../constants/Endpoints";

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

export const GetAllTasks = () => {
  const response = useQuery({
    queryKey: [`GetAllTasks`],
    queryFn: async () => request(`${endpoint}/tasks`, queryAllTasks),
  });
  return response;
};
