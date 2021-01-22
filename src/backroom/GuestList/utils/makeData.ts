import faker from 'faker';
import {Invitee, Party} from "../../../types/invitee";

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

let idParty = 0;

const families: Party[] = (new Array(10)).fill(0).map(() => ({
  id: idParty++,
  name: faker.name.lastName(),
  code: faker.random.alphaNumeric(10).toUpperCase(),
  edges: {
    Invitees: null,
  },
}));

let idInvitee = 0;

const newPerson = (): Invitee => {
  const statusChance = Math.random()
  const hasPlusOne =  Math.random() > 0.70;
  const party = families[Math.floor(Math.random() * families.length)];

  return {
    id: idInvitee++,
    name: `${faker.name.firstName()} ${party.name}`,
    is_child: false,
    has_plus_one: hasPlusOne,
    plus_one_name: hasPlusOne ? `${faker.name.firstName()} ${faker.name.lastName()}` : "",
    phone: faker.phone.phoneNumberFormat(0),
    email: faker.internet.email(),
    address_line_1: faker.address.streetAddress(),
    address_line_2: faker.address.secondaryAddress(),
    address_city: faker.address.city(),
    address_state: faker.address.state(),
    address_postal_code: faker.address.zipCode(),
    address_country: faker.address.countryCode(),
    rsvp_response: Math.random() > 0.30,
    edges: {
      Party: party,
    },
  }
}

export function makeData(len: number): Promise<Invitee[]> {
  return new Promise<Invitee[]>((resolve) => {
    setTimeout(() => {
      let data = range(len).map(() => ({
        ...newPerson(),
      }));

      resolve(data);
    }, 1000);
  });
}
