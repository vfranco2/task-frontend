export interface Task {
  added: Date;
  checked: boolean;
  order: number;
  completed_at: null;
  content: string;
  description: string;
  //   due: null;
  id: string;
  external_id: string;
  priority: number;
  external_project_id: string;
  updated: Date;
  shared: boolean;
}
