import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
    const [ref] = usePlane(() => ({ 
        rotation: [-Math.PI / 2, 0, 0], position: [0,-0.5, 0]                    // showing how image is shown in 3d space ( ground effect )
    }));

    // adding new cubes to the ground
    const [addcube] = useStore((state) => [state.addcube]);                      // we call the cube of certain type using selector and add on the ground


    //moved the filter for how to render? to textures.js
    groundTexture.repeat.set(100, 100);                                        // how much to repeat the texture
    

    return (
        <mesh 
        onClick={(e) => {
            e.stopPropagation()
            const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));                     // e.point is the point where we clicked
            addcube(x, y, z)
        }}                                                                      // when we click on the ground, we add a cube on the ground
        ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />         {/*  it is plan it have 2d */}
            <meshStandardMaterial attach='material' map={groundTexture} />      {/*  it is material */}
        </mesh>
    )
}