import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import "./EmoteView.css";
import styled from "styled-components";
import TwitchManager from "../../common/twitch-manager/TwitchManager";

const EmoteView = ({ id = "Unknown" }) => {
    const emoteRef = useRef(null);
    const spriteRef = useRef(null);

    useEffect(() => {
        animateEmote(emoteRef, spriteRef);
    }, []);

    return (
        <div ref={emoteRef} className="emote">
            <img ref={spriteRef} className="pokemon" src={getEmoteUrl(id)} />
        </div>
    )
}

function animateEmote(emoteRef, spriteRef) {
    moveEmote(emoteRef, spriteRef);
    setInterval(() => {
        moveEmote(emoteRef, spriteRef);
    }, 10000);
}

function moveEmote(emoteRef, spriteRef) {
    const x = Math.random() * (window.innerWidth - 70);
    const y = Math.random() * (window.innerHeight - 70);

    const emotePosition = spriteRef.current.getBoundingClientRect();

    if (emotePosition.left > x) {
        spriteRef.current.style.transform = "scaleX(1)";
    } else {
        spriteRef.current.style.transform = "scaleX(1)";
    }

    gsap.to(emoteRef.current, {
        duration: 10,
        x,
        y,
        ease: 'power2.out',
    });
}

function fadeText(bubbleRef) {
    gsap.set(bubbleRef.current, { opacity: 1 });
    gsap.delayedCall(3, () => {
        gsap.to(bubbleRef.current, {
            duration: 3,
            opacity: 0
        })
    });
}

function getEmoteUrl(id) {
    //animated ou static
    const debutUrlEmote = "https://static-cdn.jtvnw.net/emoticons/v2/"+ id;
    const finUrlAnime = "/animated/dark/1.0";
    const finUrlStatic = "/static/dark/1.0";

    if (fetch(debutUrlEmote + finUrlAnime).ok) {
        return debutUrlEmote + finUrlAnime;
    } else {
        return debutUrlEmote + finUrlStatic;
    }
}

export default EmoteView;

