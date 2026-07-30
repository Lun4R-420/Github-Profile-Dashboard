import { useState } from "react";
import "./Page.css";
import Profile from "./Profile.jsx";
import Search from "../assets/Search.svg";

function Page() {
    const [inputUsername, setInputUsername] = useState("");
    const [username, setUsername] = useState("");

    const handleChange = (u) => {
        setUsername(u.target.value);
    }
    
    return (
        <>
            <header>
                <div className="search-bar"> 
                    <img src={Search} />
                    <input 
                        type="text"
                        value={inputUsername}
                        placeholder="username"
                        onChange={(e) => setInputUsername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setUsername(inputUsername);
                            }
                        }}
                    />
                </div>
            </header>
            <main>
                <div>
                    <Profile username={username}/>
                </div>
            </main>
        </>
    );
}

export default Page;