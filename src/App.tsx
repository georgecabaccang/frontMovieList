import "./index.css";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/ui/Navigation";
import AllMovies from "./components/AllMovies";
import AddMovie from "./components/AddMovie";
import { MovieProvider } from "./store/MovieContext";
import MovieDetails from "./components/MovieDetails";

function App() {
    return (
        <div className="w-[100%]">
            <Navigation />
            <MovieProvider>
                <Routes>
                    <Route path="/" element={<AllMovies />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/movie/:id" element={<MovieDetails />}/>
                </Routes>
            </MovieProvider>
        </div>
    );
}

export default App;
