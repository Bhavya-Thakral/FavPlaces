const GOOGLE_MAPS_API_KEY = 'AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw'

export const getMapPreview = (lat,lng) => {
const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
 return mapPreviewUrl
}

export async function getAddress(lat,lng){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Failed to fetch addess. Please try again later');
    }

    const data= await response.json();
    if(data.error_message){
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;
    return address;      
}