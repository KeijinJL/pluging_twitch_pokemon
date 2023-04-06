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
        spriteRef.current.style.transform = "scaleX(-1)";
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

function getRandomImageUrl() {
    const urls = [
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3d8211da-5332-472f-8236-77760a37b5d2/d74eqjd-c375362d-e8ec-4e49-a89c-42b9f5368fd6.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNkODIxMWRhLTUzMzItNDcyZi04MjM2LTc3NzYwYTM3YjVkMlwvZDc0ZXFqZC1jMzc1MzYyZC1lOGVjLTRlNDktYTg5Yy00MmI5ZjUzNjhmZDYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Nz9wOG1ZlMoastpBrsF6D72p3QrRO5VfBA2JOw6c-hw",
        "https://fc06.deviantart.net/fs71/f/2014/031/d/a/jinx_lol_pixel_by_kajinman-d732j63.gif"
    ];
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}

function getEmoteUrl(id) {
    const urlEmote = "https://static-cdn.jtvnw.net/emoticons/v2/"+ id +"/animated/dark/1.0";
    return urlEmote;
}


export default EmoteView;

