import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust the path if necessary


export default function ResultsPage(){
    const [searchParams] = useSearchParams();
    const cuisine = searchParams.get("cuisine");
    const [restaurants, setRestaurants] = useState([]);
    // const cuisine = "Korean";

  useEffect(() => {
    const fetchRestaurants = async () => {
      console.log(cuisine);
      const query = supabase.from("restaurants").select("*").eq("cuisine", cuisine);
      const { data, error } = await query; // Use the declared query


      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Supabase Data:", data); // Log the fetched data
        setRestaurants(data);
      }
    };
    if (cuisine) {
      fetchRestaurants();
    }
  }, [cuisine]);
  // [cuisine] dependency array only running if there is a change to cuisine
  return (
    <div>
      <div className="h1-black">Restaurants for {cuisine}</div>
      {restaurants.length === 0 ? (
        <div className="p1-black">No restaurants found.</div>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id}>
              <div className="p1-black">{restaurant.restaurant}</div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}  