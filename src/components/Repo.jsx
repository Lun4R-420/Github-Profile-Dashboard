import "./Repo.css";
import Star from "../assets/Star.svg";
import Nesting from "../assets/Nesting.svg";

function getTimeAgo(date) {
    const now = new Date();
    const updated = new Date(date);

    const seconds = Math.floor((now - updated) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const interval in intervals) {
        const count = Math.floor(seconds / intervals[interval]);

        if (count >= 1) {
            return `${count} ${interval}${count !== 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

function Repo({ name, description, forks_count, stargazers_count, pushed_at, html_url }) {


    return (
        <a 
            className="repo-container"  
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2>{name}</h2>
            <span className="desc">{description}</span>
            <div className="emotes">
                <img src={Nesting} />
                <h3>{forks_count}</h3>
                <img src={Star} />
                <h3>{stargazers_count}</h3>
                <p>Updated {getTimeAgo(pushed_at)}</p>
            </div>
        </a>
    );
}

export default Repo;