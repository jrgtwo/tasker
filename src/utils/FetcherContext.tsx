import { createContext } from 'react';
import { ENDPOINTS } from '../constants/endpoints';
import { Fetcher } from '../utils/fetcher';

const fetcher = new Fetcher({ BASE_URL: ENDPOINTS.TASKS.BASE_URL})
export const FetcherContext = createContext(fetcher);