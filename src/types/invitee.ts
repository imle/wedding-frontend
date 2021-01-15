export interface Party {
  id: number;
  name: string;
  edges: PartyEdges;
}

export interface PartyEdges {
  Invitees: Invitee[];
}

export interface Invitee {
  id: number;
  name: string;
  code: string;
  edges: InviteeEdges;
}

export interface InviteeEdges {
  Party: Party;
}

// Responses

export interface ErrorResponse {
  error: string;
}

export interface InviteeSearchResponse {
  matches: Invitee[];
}

export interface InviteeRsvpCodeResponse {
  invitee: Invitee;
}
