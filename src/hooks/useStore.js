import create from 'zustand'
import { nanoid } from 'nanoid'

// storing data locally
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

// creating cube
export const useStore = create((set) => ({
    texture:'dirt',

    cubes: getLocalStorage('cubes') || [],
    
    //cubes: [
    //     {
    //     key: nanoid(),
    //     pos: [0, .5, 0],
    //     texture: 'dirt'
    //  }
    //],
    

    // adding cube
    addcube: (x, y, z) => {
        set((prev) => ({ 
            cubes: [
                ...prev.cubes, {
                        key: nanoid(),
                        pos: [x, y, z],
                        texture: prev.texture
                }
            ] 
        }))
    },


   // removing cube
    removeCube: (x, y, z) => {
        //console.log('remove', x, y, z) 
        set((prev) => ({
			cubes: prev.cubes.filter(cube => {
				const [X, Y, Z] = cube.pos
				return X !== x || Y !== y || Z !== z
			})
		}))
	},


    // setting texture to cube
    setTexture: (texture) => {
        set(() => ({ 
            texture 
        }))
    },


    // saving data locally
    saveWorld: () => {
		set((prev) => {
			setLocalStorage('cubes', prev.cubes)
		})
	},
    

    // resting the world
    resetWorld: () => {
        set(() => ({ 
            cubes: []
        }))
    },
}))
