// import { EventsAllDefinition } from './events';
import { TokenDefinition } from './token';
import { UserDefinition } from './user';

export interface ResDefinition {
        code: number;
        message: string;
        content?: unknown;
}

export interface ResUserDefinition extends ResDefinition {
        content: {
          token: TokenDefinition;
          user: UserDefinition
        }
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
