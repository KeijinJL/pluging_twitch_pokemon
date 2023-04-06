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
    let gsapMessage;

    const handleMessageTransparency = (gsapMessage, messageRef) => {
        if (gsapMessage) {
            gsapMessage.kill();
        }
        fadeIn(messageRef, 0, 1);
        gsapMessage = fadeOut(messageRef);
    }

    useEffect(() => {
        animatePlayer(playerRef, spriteRef);
        handleMessageTransparency(gsapMessage, messageRef);
    }, []);

    TwitchManager.onNewMessage((p, channel, tags, message, self) => {
        if (p.name === player.name) {
            setMessage(message);
            handleMessageTransparency(gsapMessage, messageRef);
        }
    });

    return (
        <div ref={playerRef} className="player">
            <Title>{player.name}</Title>
            <img ref={spriteRef} className="pokemon" src={player.avatar} />
            <Message ref={messageRef} className="bubble">{message}</Message>
        </div>
    )
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

function fadeOut(ref, delay = 3, duration = 3) {
    gsap.set(ref.current, { opacity: 1 });
    return gsap.delayedCall(delay, () => {
        gsap.to(ref.current, {
            duration,
            opacity: 0
        })
    });
}
function fadeIn(ref, delay = 0, duration = 2) {
    return gsap.delayedCall(delay, () => {
        gsap.to(ref.current, {
            duration,
            opacity: 1
        })
    });
}



export default PlayerView;

