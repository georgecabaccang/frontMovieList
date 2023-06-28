import "./index.css";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/ui/Navigation";
import AllMovies from "./components/AllMovies";
import AddMovie from "./components/AddMovie";
import { MovieProvider } from "./store/MovieContext";
import Home from "./components/Home";
import DetailsPage from "./components/DetailsPage";

function App() {
    return (
        <div className="min-w-[100vw] min-h-[100vh] bg-black app-main-div">
            <Navigation />
            <MovieProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<AllMovies />} />
                    <Route path="/add-movie" element={<AddMovie />} />
                    <Route path="/movies/:movie_title/:movie_id" element={<DetailsPage />} />
                </Routes>
            </MovieProvider>
        </div>
    );
}

export default App;
