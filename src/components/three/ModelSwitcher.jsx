import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacBookModel16 from "../models/Macbook-16";
import MacBookModel14 from "../models/Macbook-14";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes= (group, opacity) =>{
    if(!group) return;
    group.traverse((child)=>{
        if(child.isMesh){
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
        }
    })
} //traverse goes through all the children of the group and applies the function to each child
//the function checks if the child is a mesh(has a mesh), and if so, sets its material to transparent
//and animates it to the given opacity over the duration

const moveGroup = (group, x) => { 
    if(!group) return;
    gsap.to(group.position, {x, duration: ANIMATION_DURATION});
}


const ModelSwitcher = ({scale, isMobile}) => {
    const smallMacbookRef= useRef();
    const largeMacbookRef= useRef();

    const showLargeMacbook = scale === 0.08 || scale === 0.05;
    
    const controlsConfig ={
        snap: true,
        speed:1,
        zoom:1,
        polar:[-Math.PI, Math.PI],
        azimuth:[-Infinity, Infinity],
        config:{mass:1, tension:0, friction:26}, //realworldphysics
    }

    useGSAP(() => {
        if(showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale])

    return(
        <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef}>
                <MacBookModel16 scale ={isMobile ? 0.05 : 0.08} />
            </group>
        </PresentationControls>
        <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
                <MacBookModel14 scale ={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
        </>
    )
}
export default ModelSwitcher;