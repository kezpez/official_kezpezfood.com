import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust the path if necessary
import la from "../assets/Images/la.jpg";
import "../App.css";



export default function ResultsPage(){
    const [searchParams] = useSearchParams();
      // Get the filter values from the search parameters
  const cuisine = searchParams.get("cuisine");
  const district = searchParams.get("district");
  const city = searchParams.get("city");
  const price = searchParams.get("price");
    const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      console.log(cuisine, district, city, price);
      const query = supabase.from("restaurants").select("*").eq("cuisine", cuisine).eq("district", district).eq("city",city).eq("price",price);
      const { data, error } = await query; // Use the declared query


      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Supabase Data:", data); // Log the fetched data
        setRestaurants(data);
      }
    };
    if (cuisine || city || price) {
      fetchRestaurants();
    }
  }, [cuisine, city, price]);
  // [cuisine] dependency array only running if there is a change to cuisine
  return (
    <div className="section-results">
      <div className="container-results">
      <div className="h1-black">Restaurants for {cuisine} Food</div>
      <div className="container-guide-cards">
      {restaurants.length === 0 ? (
        <div className="p1-black">No restaurants found.</div>
      ) : (
            restaurants.map((restaurant) => (
              <div className="rest-card" key={restaurant.id}>
                <div className="rest-card-content">
                <img className="rest-card-image" src= {la} alt="restaurant image" /> 
                <div className="p1-black">{restaurant.restaurant}</div>
                {/* <div className="p2-black">{restaurant.restaurant}</div> */}
                <div className="rest-card-info">
                <span>📍 {restaurant.district}, {restaurant.city}</span> <span>🍽️ {restaurant.cuisine}</span>
              </div>
              <div className="rest-card-tags">
                <span>🌊 Casual</span> <span>{restaurant.price}</span>
              </div>
            </div>
          </div>
        ))
    )}
  </div>
  </div>
  
  </div>
)
};




