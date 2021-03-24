import {Party} from "./invitee";
import {BackroomUser} from "./backroom-user";

export interface ErrorResponse {
  error: string;
}

export interface InviteeSearchResponse {
  matches: Party[];
}

export interface RsvpCodeResponse {
  party: Party;
}

export interface LoginResponse {
  user: BackroomUser;
  timeout: number;
}

export interface AllInviteesResponse {
  parties: Party[];
}
