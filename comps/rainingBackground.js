import { useEffect, useState } from 'react';
import styles from '@/styles/raining.module.css'


const RainingBackground = () => {
  const [rainDrops, setRainDrops] = useState([]);

  useEffect(() => {
    let increment = 0;
    let drops = [];
  
    const createRainDrop = () => {
        const randoHundo = Math.floor(Math.random() * 100); // use simpler randomization
        const randoFiver = Math.floor(Math.random() * 5) + 2;
        const increment = Math.floor(Math.random() * 100); // use random starting position
      
        const rainDrop = (
          <div
            key={increment}
            className={styles.drop}
            style={{
              left: `${increment}%`,
              bottom: `${randoFiver + 100}%`,
              animationDelay: `0.${randoHundo}s`,
              animationDuration: `0.5${randoHundo}s`
            }}
          >
            <div
              className={styles.stem}
              style={{
                animationDelay: `0.${randoHundo}s`,
                animationDuration: `0.5${randoHundo}s`
              }}
            />
            <div
              className={styles.splat}
              style={{
                animationDelay: `0.${randoHundo}s`,
                animationDuration: `0.5${randoHundo}s`
              }}
            />
          </div>
        );
      
        drops.push(rainDrop);
      
        // Generate 100 raindrops
        if (drops.length < 100) {
          createRainDrop();
        } else {
          setRainDrops(drops);
        }
      };
      
  
    const intervalId = setInterval(() => {
      drops = [];
      increment = 0;
      createRainDrop();
    }, 5000);
  
    createRainDrop();
  
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className={styles.container}>
        <div className={styles.rain}>
            <div className={styles.frontRow}>{rainDrops}</div>
            <div className={styles.backRow}>{rainDrops}</div>

        </div>
     
    </div>
  );
};

export default RainingBackground;
