import instance from "./index.js"


export const getAllCategories = async () =>{
const response = await instance.get('https://react-native-food-delivery-be.eapi.joincoded.com/api/category');
return response.data;
}

export const getAllResturants = async () => {
  try {
    const response = await instance.get('https://react-native-food-delivery-be.eapi.joincoded.com/api/resturant');
    console.log('Restaurant data:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};



export const getResturantByID = async (id) => {
const response = await instance.get(`https://react-native-food-delivery-be.eapi.joincoded.com/api/resturant/${id}`);
return response.data;
}      

export const getResturantItems = async (id) =>{
    const response = await instance.get(`https://react-native-food-delivery-be.eapi.joincoded.com/api/resturant/${id}/items`);
    return response.data;
    }

    export const getItemDetails = async (id) =>{
        const response = await instance.get(`https://react-native-food-delivery-be.eapi.joincoded.com/api/item/${id}`);
        return response.data;
        }






