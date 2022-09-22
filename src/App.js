
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
import { Menu } from './components/Menu';

function App() {
  return (
    <>
    {/* <div> Outside Canvas </div> */}
    <Canvas>
      <Sky sunPosition={[100, 100, 20]} />
      <ambientLight intensity={0.5} />
      <FPV />
      <Physics>
        <Player />               {/* so physics works on Player */}
        <Cubes />                {/* so physics works on Cubes */}
        <Ground />               {/* so physics works on Ground */}
      </Physics>
    </Canvas>
    <div className='absolute centered cursor'>+</div>
    <TextureSelector />
    <Menu />
    </>
  );
}

export default App;
