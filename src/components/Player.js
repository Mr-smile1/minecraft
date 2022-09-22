
import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'


export const Player = () => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard()
    //console.log('actions', Object.entries(actions.filter(([k, v]) => v)))       // to check if the key is pressed or not

    const { camera } = useThree()
    const [ ref, api] = useSphere(() => ({ 
        mass: 1, 
        type: 'Dynamic',
        position: [0, 1, 0]                                              // initial position of player
    }))    

    const pos = useRef([0, 0, 0])                                        // gluing pos to ref
    useEffect(() => {                                                    // use this effect when ever api position changes
        api.position.subscribe((p) => (pos.current = p))                 // subscribe to the position of the player & p take 3 values as it is a triplet
    }, [api.position])


    const vel = useRef([0, 0, 0])                                        // gluing vel to ref
    useEffect(() => {                                                    // use this effect when ever api velocity changes
        api.velocity.subscribe((v) => (v.current = v))                   // subscribe to the velocity of the player & v take 3 values as it is a triplet
    }, [api.velocity])


    useFrame(() => {
        // console.log('frame')
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2])) 
        
        //api.velocity.set(0,1,0) // set the velocity of the player


        // movement logic
        const direction = new Vector3()                     // direction of player
                                                        
        const frontVector = new Vector3(                    // front movement of player
            0, 
            0, 
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)                         // if moveBackward is true then 1 else 0, if moveForward is true then 1 else 0, if both are press then they cancel out each other
        )  

        const sideVector = new Vector3(                      // side movement of player
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0, 
            0,
        )     


        // calculate direction
        direction                                        // normalize to make it a unit vector, multiplyScalar to make it a vector of length 5, applyEuler to rotate the vector according to the camera rotation
            .subVectors(frontVector, sideVector)         // originate from these vectors
            .normalize()                                 // normalize to make it a unit vector
            .multiplyScalar(4)                           // multiplyScalar to make it a vector of length 5
            .applyEuler(camera.rotation)                 // applyEuler to rotate the vector according to the camera rotation


        //applying directions to player(sphere)    
        api.velocity.set(direction.x, vel.current[1], direction.z)        // set the velocity of the player, y vector is not set as these controls only control x and z movement and not the jump of sphere


        // jump logic
        if (jump && ( Math.abs(vel.current[1]) < 0.05 )) {
			api.velocity.set(vel.current[0], 3, vel.current[2])
		}
    })

    return (
        <mesh ref = {ref}></mesh>
    )
}
