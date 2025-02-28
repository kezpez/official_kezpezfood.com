import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Adjust the path if necessary


export default function ResultsPage(){
    const [searchParams] = useSearchParams();
    const cuisine = searchParams.get("cuisine");
    const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
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
  return (
    <div>
      <h1>Restaurants for {cuisine}</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}