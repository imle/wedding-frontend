export type Party = {
  id: number;
  name: string;
  code: string;
  edges: PartyEdges;
}

export type PartyEdges = {
  Invitees: Invitee[] | null;
}

export type Invitee = {
  id: number;
  name: string;
  is_child: boolean;
  has_plus_one: boolean;
  plus_one_name?: string;
  phone?: string;
  email?: string;
  address_line_1?: string;
  address_line_2?: string;
  address_city?: string;
  address_state?: string;
  address_postal_code?: string;
  address_country?: string;
  rsvp_response: boolean;
  edges: InviteeEdges;
}

export type InviteeEdges = {
  Party: Party | null;
}
