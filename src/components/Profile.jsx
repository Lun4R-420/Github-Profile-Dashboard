import { useEffect, useState } from "react";
import "./Profile.css"
import Repo from "./Repo.jsx"

function Profile({ username }) {
    console.log("Username received:", username);
    const [profile, setProfile] = useState({});
    const [visibleRepos, setVisibleRepos] = useState(4);
    const [repos, setRepos] = useState([]);

    function ShowAllRepos() {
        setVisibleRepos(repos.length);
    }

    useEffect(() => {
        if (username.trim() === "") {
            fetch("https://api.github.com/users/GitHub")
                .then((response) => {
                    console.log("Response:", response);
                    if (!response.ok) {
                        throw new Error("User not found");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Data:", data);
                    setProfile(data);
                })
                .catch((error) => console.log("Error:", error));
        }

        fetch(`https://api.github.com/users/${username.trim()}`)
            .then((response) => {
                console.log("Response:", response);
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data:", data);
                setProfile(data);
            })
            .catch((error) => console.log("Error:", error));

    }, [username]);

    useEffect(() => { 
        if (username.trim() === "") {
            fetch("https://api.github.com/users/GitHub/repos")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Repos not found"); 
                    }
                    return response.json();
                })
                .then((data) => setRepos(data)) 
                .catch((error) => console.log("Fetching the user's repos: ", error)) 
        } 
        fetch(`https://api.github.com/users/${username.trim()}/repos`) 
            .then((response) => { 
                if (!response.ok) { 
                    throw new Error("Repos not found"); 
                } return response.json(); }) 
            .then((data) => setRepos(data)) 
            .catch((error) => console.log("Fetching the user's repos: ", error)) 
    }, [username]);

    useEffect(() => {
        setVisibleRepos(4);
    }, [username]);

    return (
        <div className="profile">
            {profile.login && (
                <>
                    <div className="information">
                        <img src={profile.avatar_url} />
                        <div className="container">
                            <span>Followers</span>
                            <div className="separator"></div>
                            <span>{profile.followers}</span>
                        </div>
                        <div className="container">
                            <span>Following</span>
                            <div className="separator"></div>
                            <span>{profile.following}</span>
                        </div>
                        <div className="container">
                            <span>Location</span>
                            <div className="separator"></div>
                            <span>{profile.location}</span>
                        </div>
                    </div>
                    <div className="name">
                        <h1>{profile.name}</h1>
                        <span>{profile.bio}</span>
                    </div>
                    <div className="repo-grid">
                        {repos
                            .slice(0, visibleRepos)
                            .map(repo => 
                            <Repo key={repo.id}
                                name={repo.name}
                                description={repo.description}
                                forks_count={repo.forks_count}
                                stargazers_count={repo.stargazers_count}
                                pushed_at={repo.pushed_at}
                                html_url={repo.html_url}
                                            />)}
                    </div>

                    {visibleRepos < repos.length && (
                        <button className="view-button" onClick={ShowAllRepos}>
                            View all repositories
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;