import { useCallback, useEffect, useState } from 'react'

function actionByKey(key){               // helper function to tell what action to take by putting all actions in a map
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
    }
    return keyActionMap[key]
}

export const useKeyboard = () => {                     // initially all keys are false and player do not move waitng for key press
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt : false,
        grass : false,
        glass : false,
        wood : false,
        log : false,
    })

    const handleKeyDown = useCallback((event) => {           // when key is pressed
        const action = actionByKey(event.code)
        if(action){
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    }, [])

    const handleKeyUp = useCallback((event) => {             // when key is released
        const action = actionByKey(event.code)
        if(action){
            setActions((prev) => {
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])

    useEffect(() => {                                         // first if the button is pushed down, then it will be true and when it will be released, it will be false, so we have to take 2 events listeners
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
    }, [handleKeyDown, handleKeyUp])

    return actions
}
