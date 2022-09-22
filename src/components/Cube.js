import { useBox } from "@react-three/cannon"
import * as textures from "../images/textures"
import { useStore } from "../hooks/useStore"
import { useState } from "react"


export const Cube = ({ position, texture }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))


    // adding new cubes on the cube
    const [addcube, removeCube] = useStore(state => [state.addcube, state.removeCube]);   


    const activeTexture = textures[texture + 'Texture']
    //console.log('activeTexture', activeTexture)

    return (
        <mesh 
        onPointerMove={(e) => {
            e.stopPropagation()
            setIsHovered(true)
        }}
        onPointerOut={(e) => {
            e.stopPropagation()
            setIsHovered(false)
        }}
        
        onClick={(e) => {
            e.stopPropagation();
            const clickedFace = Math.floor(e.faceIndex/2)             // logic to click face and add cube on that face
            //console.log('clickedFace', clickedFace)
            const [x, y, z] = ref.current.position
            if(e.altKey) {
                removeCube(x, y, z)
                return
            }
            else if(clickedFace === 0) {
                addcube(x + 1, y, z)
                return
            } else if(clickedFace === 1) {
                addcube(x - 1, y, z)
                return
            } else if(clickedFace === 2) {
                addcube(x, y + 1, z)
                return
            } else if(clickedFace === 3) {
                addcube(x, y - 1, z)
                return
            } else if(clickedFace === 4) {
                addcube(x, y, z + 1)
                return
            } else if(clickedFace === 5) {                            // logic to click face and add cube on that face
                addcube(x, y, z - 1)
                return
            }
        }}
        ref={ref}>
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial 
                color={isHovered ? 'grey' : 'white'}
				map={activeTexture}
				transparent={true}
				opacity={texture === 'glass' ? 0.6 : 1}
				attach="material" />
        </mesh>
    )
}