import courtyard_marriott from "../photos/courtyard-marriott.jpg";
import hyatt_place_atlanta_buckhead from "../photos/hyatt-place-atlanta-buckhead.webp";
import intercontinental_buckhead_atlanta from "../photos/intercontinental-buckhead-atlanta.jpg";
import the_lowes_hotel_front from "../photos/the-lowes-hotel-front.jpg";

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
    name: "InterContinental Buckhead Atlanta",
    booking_url: "https://www.intercontinentalatlanta.com/",
    img_url: intercontinental_buckhead_atlanta,
    phone_number: "404-946-9000",
    address: "3315 Peachtree Rd NE, Atlanta, GA 30326",
    google_map_link: "https://goo.gl/maps/xoMDhJkDC8q9aCTW9",
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
  {
    name: "The Lowes Hotel",
    booking_url: "https://www.loewshotels.com/atlanta-hotel",
    img_url: the_lowes_hotel_front,
    phone_number: "855-680-1643",
    address: "1065 Peachtree St NE, Atlanta, GA 30309",
    google_map_link: "https://goo.gl/maps/Kz3MBWR1ueB41dMTA",
  },
];
