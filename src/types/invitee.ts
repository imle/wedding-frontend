export interface Party {
  id: number;
  name: string;
  code: string;
  edges: PartyEdges;
}

export interface PartyEdges {
  Invitees: Invitee[];
}

export interface Invitee {
  id: number;
  name: string;
  edges: InviteeEdges;
}

export interface InviteeEdges {
  Party: Party;
}
