import grand_hyatt_buckhead from "../photos/grand-hyatt-buckhead-2.jpg";
import courtyard_marriott from "../photos/courtyard-marriott.jpg";
import hyatt_place_atlanta_buckhead from "../photos/hyatt-place-atlanta-buckhead.webp";

export interface Accommodation {
  name: string;
  img_url: string;
  block_code?: string;
  booking_url?: string;
  phone_number?: string;
  address: string;
  google_map_link: string;
}

export const accommodations: Accommodation[] = [
  {
    name: "The Grand Hyatt Atlanta Buckhead",
    booking_url: "https://www.hyatt.com/en-US/group-booking/ATLGH/G-SMIM",
    img_url: grand_hyatt_buckhead,
    phone_number: "404-237-1234",
    block_code: "G-SMIM",
    address: "3300 Peachtree Rd NE, Atlanta, GA 30305",
    google_map_link: "https://goo.gl/maps/GMes85Qy5F754zVJ7",
  },
  {
    name: "Courtyard by Marriott Atlanta Buckhead",
    booking_url: "https://www.marriott.com/hotels/travel/atlcb-courtyard-atlanta-buckhead/",
    img_url: courtyard_marriott,
    phone_number: "404-869-0818",
    address: "3332 Peachtree Rd NE, Atlanta, GA 30326",
    google_map_link: "https://goo.gl/maps/dwBSEzh1PnsDzFXy5",
  },
  {
    name: "Hyatt Place Atlanta/Buckhead",
    booking_url: "https://www.hyatt.com/en-US/hotel/georgia/hyatt-place-atlanta-buckhead/atlzb",
    img_url: hyatt_place_atlanta_buckhead,
    phone_number: "404-869-6161",
    address: "3242 Peachtree Rd NE, Atlanta, GA 30305",
    google_map_link: "https://goo.gl/maps/b8ug6yURusPy5Nmx8",
  },
];
