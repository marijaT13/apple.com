import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef= useRef();
    useEffect(()=>{
        if(videoRef.current) videoRef.current.playbackRate = 3.5; //plays at a faster speed
    },[]);
    return (
        <section id="hero">
            <div>
                <h1>MacBook Pro</h1>
                <img src="/photos/title.png" alt="MacBook title"/>
            </div>
            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline/> {/*autoplay muted and playsInline means without buttons showing*/}
            

            <button type="button" onClick={() => { /* Navigate to purchase page */ }}>
                Buy
            </button>
            <p>From $1599 or $133/mo for 12 months</p>        </section>
    )
}

export default Hero;