export class Place {
    constructor(title,imageUri,location){
        console.log("place constructor",location);
        this.title=title;
        this.imageUri=imageUri;
        this.address=location.address;
        this.location={lat:location.lat,lng:location.lng}; // {lat: 12.34, lng: 12.34}
        this.id=new Date().toString()+Math.random().toString();
    }
}