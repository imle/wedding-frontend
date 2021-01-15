import {Party} from "./invitee";

export interface ErrorResponse {
  error: string;
}

export interface InviteeSearchResponse {
  matches: Party[];
}

export interface RsvpCodeResponse {
  party: Party;
}
