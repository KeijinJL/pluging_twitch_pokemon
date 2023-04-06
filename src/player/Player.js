import React, { useEffect, useRef } from "react";
import gsap from 'gsap';
import "./Player.css";

const Player = ({ pseudo = "Unknown", message = "Coucou" }) => {
    const playerRef = useRef(null);
    const bubbleRef = useRef(null);

    useEffect(() => {
        animatePlayer(playerRef);
    }, []);

    setInterval(() => {
        if (bubbleRef && bubbleRef.current) {
            bubbleRef.current.style.display = "none";
        }
    }, 3000);

    return (
        <div ref={playerRef} className="player">
            <b>{pseudo}</b>
            <img className="pokemon" src="https://i.gifer.com/4tym.gif" />
            <div className="bubble" ref={bubbleRef}>
                <img src="https://www.transparentpng.com/thumb/speech-bubble/speech-bubble-transparent-png-0.png" />
                <div>{message}</div>
            </div>
        </div>
    )
}

function animatePlayer(playerRef) {
    gsap.to(playerRef.current, {
        duration: 2,
        x: () => Math.random() * (window.innerWidth - 70),
        y: () => Math.random() * (window.innerHeight - 70),
        ease: 'power2.out',
    });
    setInterval(() => {
        gsap.to(playerRef.current, {
            duration: 2,
            x: () => Math.random() * (window.innerWidth - 70),
            y: () => Math.random() * (window.innerHeight - 70),
            ease: 'power2.out',
        });
    }, 3000);
}



export default Player;

