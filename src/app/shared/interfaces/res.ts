import { UserDefinition } from './user';
import { BookDefinition } from './book';

export interface ResDefinition {
  code: number;
  message: string;
  content?: unknown;
}

export interface ResUserDefinition extends ResDefinition {
  content: {
    token: {
      accessToken: string;
      refreshToken: string;
    },
    user: UserDefinition
  }
}

export interface ResBooksDefinition extends ResDefinition {
  content: BookDefinition[];
}

export interface ResBookDefinition extends ResDefinition {
  content: BookDefinition;
}



// export interface ResEventPageDefinition extends ResDefinition {
//         content: EventsAllDefinition;
// }

// export interface ResUserDefinition extends ResDefinition {
//         content: UserDefinition;
// }

// export interface ResUserEventsDefinition extends ResDefinition {
//         content: {
//                 createdEvents: [];
//                 eventsToVisit: [];
//         };
// }
