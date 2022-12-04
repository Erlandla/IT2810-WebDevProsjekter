import "./App.css";
import { Route, Routes } from "react-router-dom"
import {  ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home"
import Watchlist from "./pages/Watchlist"
import Navbar from "./components/navbar/Navbar";

const client = new ApolloClient({
    uri: "http://it2810-36.idi.ntnu.no:4000/",
    cache: new InMemoryCache()
})


function App() {
  return (
    <>
        <ApolloProvider client={client}>
          <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/watchlist" element={<Watchlist/>}/>
            </Routes>
        </ApolloProvider>
    </>
  );
}
export default App;
