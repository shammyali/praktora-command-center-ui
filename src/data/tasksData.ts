
import { tasksData } from './tasksMockData';
import { clients } from './clientData';
import { users } from './userData';
import { workflows } from './workflowsData';
import { documentsData, savedSearches, documentAnalytics } from './documentsData';
import { TaskType } from '../types/taskTypes';
import { Document, SavedSearch } from '../types/documentTypes';

export { 
  tasksData, 
  clients, 
  users, 
  workflows, 
  documentsData, 
  savedSearches, 
  documentAnalytics 
};

export type { TaskType, Document, SavedSearch };
