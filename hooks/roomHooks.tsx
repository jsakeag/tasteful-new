import { Restaurant } from "@/types/type";

import { database } from '../firebaseConfig';
import { ref, set, get } from "firebase/database";

  // TO DO: Move these into a hooks folder and make separate file for generating roomId
const roomId = 'ABCD';
const addRestaurantToRoom = (newRoom : Restaurant) => {
  const roomRef = ref(database, 'rooms/' + roomId);
  // Get existing data and update it
  get(roomRef).then((snapshot) => {
  if (snapshot.exists()) {
    // If room exists, append new restaurant to existing restaurants
    const existingData = snapshot.val();
    const updatedRestaurants = existingData.restaurants || [];
    updatedRestaurants.push(newRoom);
    
    set(roomRef, {
      ...existingData,
      restaurants: updatedRestaurants
    });
  } else {
    // If room doesn't exist yet, create it with first restaurant
    set(roomRef, {
      restaurants: [newRoom]
    });
  }});
}

const removeRestaurantFromRoom = (restaurant: Restaurant) => {
const roomRef = ref(database, 'rooms/' + roomId);
get(roomRef).then((snapshot) => {
  if (snapshot.exists()) {
    const existingData = snapshot.val();
    const updatedRestaurants = existingData.restaurants.filter(
      (r: Restaurant) => r.id !== restaurant.id
    );
    
    set(roomRef, {
      ...existingData,
      restaurants: updatedRestaurants
    });
  }});
}

const toggleRestaurantInRoom = (restaurant: Restaurant) => {
  const roomRef = ref(database, 'rooms/' + roomId);
  get(roomRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const restaurants = existingData.restaurants || [];
      const isRestaurantInRoom = restaurants.some((r: Restaurant) => r.id === restaurant.id);

      if (isRestaurantInRoom) {
        // Remove restaurant
        const updatedRestaurants = restaurants.filter(
          (r: Restaurant) => r.id !== restaurant.id
        );
        set(roomRef, {
          ...existingData,
          restaurants: updatedRestaurants
        });
      } else {
        // Add restaurant
        restaurants.push(restaurant);
        set(roomRef, {
          ...existingData,
          restaurants: restaurants
        });
      }
    } else {
      // If room doesn't exist, create it with first restaurant
      set(roomRef, {
        restaurants: [restaurant]
      });
    }
  });
}

const clearRoomRestaurants = () => {
  const roomRef = ref(database, 'rooms/' + roomId);
  get(roomRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      // Keep the room but clear its restaurants
      set(roomRef, {
        ...existingData,
        restaurants: []
      });
    }
  });
}

export { toggleRestaurantInRoom, clearRoomRestaurants };