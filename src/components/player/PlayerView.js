import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import "./PlayerView.css";
import styled from "styled-components";
import TwitchManager from "../../common/twitch-manager/TwitchManager";

let lastTime = 0, timeToMovePlayer = 0, timeToHidePlayer = 20000, timeToHideMessage = 0;

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

    const animatePlayerAndMessage = (now) => {
        let elapsedTime = now - lastTime;
        lastTime = now;

        timeToMovePlayer -= elapsedTime;
        if (timeToMovePlayer <= 0) {
            movePlayer(playerRef, spriteRef);
            timeToMovePlayer = 5000;
        }

        timeToHideMessage -= elapsedTime;
        if (timeToHideMessage <= 0) {
            hideMessage();
        }

        timeToHidePlayer -= elapsedTime;
        if (timeToHidePlayer <= 0) {
            hidePlayer();
        } else {
            // don't know why i need to do this, but it works
            playerRef.current.style.opacity = 1;
        }

        requestAnimationFrame(animatePlayerAndMessage);
    }

    useEffect(() => {
        animatePlayerAndMessage(0);
    }, []);

    TwitchManager.onNewMessage((p, channel, tags, message, self) => {
        if (p.name === player.name) {
            displayPlayer();
            displayMessage(message);
        }
    });

    const hideMessage = () => {
        setClassCSS("bubble hidden");
    }

    function displayMessage(message) {
        timeToHideMessage = 5000;
        setClassCSS("bubble");
        setMessage(message);
    }

    const hidePlayer = () => {
        if (playerRef && playerRef.current) {
            playerRef.current.style.opacity = 0;
        }
    }

    const displayPlayer = () => {
        timeToHidePlayer = 20000;
        if (playerRef && playerRef.current) {
            playerRef.current.style.opacity = 1;
        }
    }

    return (
        <div ref={playerRef} className="player">
            <Title>{player.name}</Title>
            <img ref={spriteRef} className="pokemon" src={player.avatar} />
            <Message ref={messageRef} className={classCSS}>{message}</Message>
        </div>
    )
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
        duration: 5,
        x,
        y,
        ease: 'power2.out',
    });
}




export default PlayerView;

