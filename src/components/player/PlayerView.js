import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import "./PlayerView.css";
import styled from "styled-components";
import TwitchManager from "../../common/twitch-manager/TwitchManager";

const Title = styled.span`
    display: inline-block;
    position: absolute;
    bottom: -2em;
    text-align: center;
    color: white;
    text-shadow: black 0px 0px 5px;
    width: 5em;
    font-style: bold;
`;

const Message = styled.div`
    width:10em;
    height:2em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    top: -1em;
    left:-2em;
    text-align: center;
    color:white;
    font-size: 0.8em;
`

const PlayerView = ({ name = "Unknown" }) => {
    const playerRef = useRef(null);
    const messageRef = useRef(null);
    const spriteRef = useRef(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        animatePlayer(playerRef, messageRef, spriteRef);
    }, []);

    TwitchManager.onNewMessage((player, channel, tags, message, self) => {
        if (player.name === name) {
            setMessage(message);
            messageRef.current.style.opacity = 1;
            fadeText(messageRef);
        }
    });

    return (
        <div ref={playerRef} className="player">
            <Title>{name}</Title>
            <img ref={spriteRef} className="pokemon" src={getRandomImageUrl()} />
            <Message ref={messageRef} className="bubble">{message}</Message>
        </div>
    )
}

function animatePlayer(playerRef, messageRef, spriteRef) {
    movePlayer(playerRef, spriteRef);
    fadeText(messageRef);
    setInterval(() => {
        movePlayer(playerRef, spriteRef);
    }, 10000);
}

function movePlayer(playerRef, spriteRef) {
    const x = Math.random() * (window.innerWidth - 70);
    const y = Math.random() * (window.innerHeight - 70);

    const playerPosition = spriteRef.current.getBoundingClientRect();

    if (playerPosition.left > x) {
        spriteRef.current.style.transform = "scaleX(-1)";
    } else {
        spriteRef.current.style.transform = "scaleX(1)";
    }

    gsap.to(playerRef.current, {
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


export default PlayerView;

