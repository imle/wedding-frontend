import the_lowes_hotel from "../photos/the-lowes-hotel.jpg";
import the_lowes_hotel_front from "../photos/the-lowes-hotel-front.jpg";
import hyatt_place_atlanta_buckhead from "../photos/hyatt-place-atlanta-buckhead.webp";


export interface ImageTile {
  img: string;
  title: string;
  cols?: number;
}

export const galleryImages: ImageTile[] = [
  {
    img: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
    title: "Breakfast",
    cols: 2,
  },
  {
    img: "https://material-ui.com/static/images/grid-list/burgers.jpg",
    title: "Tasty burger",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/camera.jpg",
    title: "Camera",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/morning.jpg",
    title: "Morning",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/hats.jpg",
    title: "Hats",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/honey.jpg",
    title: "Honey",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/vegetables.jpg",
    title: "Vegetables",
    cols: 2,
  },
  {
    img: "https://material-ui.com/static/images/grid-list/plant.jpg",
    title: "Water plant",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/mushroom.jpg",
    title: "Mushrooms",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/olive.jpg",
    title: "Olive oil",
  },
  {
    img: "https://material-ui.com/static/images/grid-list/star.jpg",
    title: "Sea star",
    cols: 2,
  },
  {
    img: "https://material-ui.com/static/images/grid-list/bike.jpg",
    title: "Bike",
  },
];

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
    name: "The Lowes Hotel",
    booking_url: "https://www.loewshotels.com/atlanta-hotel",
    img_url: the_lowes_hotel_front,
    phone_number: "855-680-1643",
    address: "1065 Peachtree Street NE, Atlanta, Georgia, 30309",
    google_map_link: "https://goo.gl/maps/Kz3MBWR1ueB41dMTA",
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
