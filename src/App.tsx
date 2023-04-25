import "./index.css";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/ui/Navigation";
import AllMovies from "./components/AllMovies";
import AddMovie from "./components/AddMovie";
import { MovieProvider } from "./store/MovieContext";
import MovieDetails from "./components/MovieDetails";

function App() {
    return (
        <div className="min-w-[100vw] min-h-[100vh] bg-black app-main-div">
            <Navigation />
            <MovieProvider>
                <Routes>
                    <Route path="/" element={<AllMovies />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MovieProvider>
        </div>
    );
}

export default App;
