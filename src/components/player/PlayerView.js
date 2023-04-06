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

const PlayerView = ({ player }) => {
    const playerRef = useRef(null);
    const messageRef = useRef(null);
    const spriteRef = useRef(null);
    const [message, setMessage] = useState(player.message);
    const [classCSS, setClassCSS] = useState("bubble");
    let timeoutHidden;

    useEffect(() => {
        animatePlayer(playerRef, spriteRef);
        timeoutHidden = handleMessageHidden(timeoutHidden, setClassCSS);
    }, []);

    TwitchManager.onNewMessage((p, channel, tags, message, self) => {
        if (p.name === player.name) {
            setMessage(message);
            timeoutHidden = handleMessageHidden(timeoutHidden, setClassCSS);
        }
    });

    return (
        <div ref={playerRef} className="player">
            <Title>{player.name}</Title>
            <img ref={spriteRef} className="pokemon" src={player.avatar} />
            <Message ref={messageRef} className={classCSS}>{message}</Message>
        </div>
    )
}

function handleMessageHidden(timeoutHidden, setClassCSS) {
    if (timeoutHidden) {
        clearTimeout(timeoutHidden);
    }
    setClassCSS("bubble");
    timeoutHidden = setTimeout(() => { setClassCSS("bubble hidden"); }, 3000);
    return timeoutHidden;
}

function animatePlayer(playerRef, spriteRef) {
    movePlayer(playerRef, spriteRef);
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



export default PlayerView;

