import { useRef } from "react";
import { performanceImages, performanceImgPositions } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";

const Performance =() =>{
    const isMobile = useMediaQuery({query:"(max-width: 1024px)"});
    const sectionRef = useRef(null);

    useGSAP(() => {
        const sectionEl =  sectionRef.current;
        if(!sectionEl) return;
        //image animation
        gsap.fromTo(
            ".content p",
            {opacity:0, y:10},
            {
                opacity:1,
                y:0,
                duration:0.8,
                ease:"power2.out",
                scrollTrigger:{
                    trigger:".content p",
                    start:"top bottom",
                    end:"top center",
                    scrub:true,
                    invalidateOnRefresh:true,
                },
            }
        );
        if(isMobile) return;

        const tl = gsap.timeline({
            defaults:{
                duration:2,
                ease:"power1.out",
                overwrite:"auto",
            },
            scrollTrigger:{
                trigger:sectionRef.current,
                start:"top bottom",
                end:"center center",
                scrub:1,
                invalidateOnRefresh:true,
            },
        });
        //images and animations to their final positions from constants at time 0
        performanceImgPositions.forEach((item) => {
            //image p5 is the laptop image and should not be animated, the screens around it animate
            if (item.id === "p5") return;

            const selector = `.${item.id}`;
            const vars= {};

            if (typeof item.left === "number") vars.left = `${item.left}%`;
            if (typeof item.right === "number") vars.right = `${item.right}%`;
            if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

            if (item.transform) vars.transform = item.transform;

            tl.to(selector, vars, 0);
        });
    }, 
    {scope: sectionRef, dependencies:[isMobile]}
);

    return(
        <section id="performance" ref={sectionRef}> 
            <h2>Next-level graphics performance. Game on.</h2>
            <div className="wrapper">
                {performanceImages.map((item, index)=>(
                    <img 
                    key={index} 
                    src={item.src} 
                    className={item.id}
                    alt={item.alt || `Performance Image #${index + 1}`} />
                ))}
            </div>
            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness 
                    that keeps up with your imagination. The M4 family of 
                    chips features a GPU with a second-generation hardware-accelerated 
                    ray tracing engine that renders images faster, so <br/>
                    <span className="text-white">
                    gaming feels more immersive and realistic than ever.
                    </span><br/>
                    <br/>
                    And Dynamic Caching optimizes fast on-chip memory 
                    to dramatically increase average GPU utilization — 
                    driving a huge performance boost for the most demanding 
                    pro apps and games.
                </p>
            </div>
        </section>
    )
}
export default Performance;