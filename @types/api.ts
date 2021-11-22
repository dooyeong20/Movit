import { QueryFunctionContext } from 'react-query';

export type Tfetcher = (context: QueryFunctionContext) => Promise<Response>;
