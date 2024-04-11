import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import { Wheel } from 'react-custom-roulette'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import weightedRandom from './WeightedRandom';
import shalinaLogo from './shalina.jpg'

const firebaseConfig = {
  apiKey: "AIzaSyBLQSdouxnqnSR0uYRrUTTQgavgIWrwI9o",
  authDomain: "spinwheel-e2eb5.firebaseapp.com",
  databaseURL: "https://spinwheel-e2eb5-default-rtdb.firebaseio.com",
  projectId: "spinwheel-e2eb5",
  storageBucket: "spinwheel-e2eb5.appspot.com",
  messagingSenderId: "322128185802",
  appId: "1:322128185802:web:cb20604466c1a847b12733",
  measurementId: "G-HCCXD90EGH"
};

const shalinaLogoURL = "https://seeklogo.com/images/S/shalina-healthcare-logo-1A86ADBEE6-seeklogo.com.png";

const numbersArray = [1,2,3,4,5,6]
const weights = [0.4, 0.2, 0.1, 0.1, 0.1, 0.1]
const app = initializeApp(firebaseConfig);

const data = [
  { option: "1" },
  { option: '2' },
  { option: '3', style: { textColor: '#f9dd50' } },
  { option: '4' },
  { option: '5' },
  { option: '6' },
 
];

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontFamily = 'Nunito';
const fontWeight = 'bold';
const fontSize = 20;
const fontStyle = 'normal';
const textDistance = 60;
const spinDuration = 1.0;

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [numbersData, setNumbersData] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);
  const [thirdValue, setThirdValue] = useState(null);
  const [fourthValue, setFourthValue] = useState(null);
  const [fifthValue, setFifthValue] = useState(null);
  const [sixthValue, setSixthValue] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const numbersRef = ref(db, 'Numbers/');
    onValue(numbersRef, (snapshot) => {
      const data = snapshot.val();
      setFirstValue(data[1])
      setSecondValue(data[2])
      setThirdValue(data[3])
      setFourthValue(data[4])
      setFifthValue(data[5])
      setSixthValue(data[6])
      console.log(data)
      setNumbersData(data);
    });
  }, [])

  const handleSpinClick = () => {
    if (!mustSpin) {
      
      let count = 1;
      while(count < 7){
        if(numbersData[count] ==0 ){
          const index = numbersArray.indexOf(count);
          if(index > -1)
          {
            numbersArray.splice(index, 1); // 2nd parameter means remove one item only
          weights.splice(index, 1);
          console.log("removed the number " + count + " from the array" + " from index - " + index);  
          }
           
          count = count + 1;
          
        }
        else{
          count = count + 1
        }
      }
      const newPrizeNumber = weightedRandom(numbersArray, weights)
      setPrizeNumber(newPrizeNumber - 1);
      setMustSpin(true);
      console.log("Random Number" + newPrizeNumber + " numbersArray" + numbersArray)
      console.log(numbersArray)

     /*  if(numbersData[newPrizeNumber + 1] == 0)
      {
        console.log("Data is 0")
         while(count < 7){
          if(numbersData[count] !=0 ){
            setPrizeNumber(count - 1);
            setMustSpin(true);
            console.log("Setting prize number to " + (count));
            count = count + 10;
          }
          else{
            count = count + 1
          }
        } 
        const index = numbersArray.indexOf(newPrizeNumber + 1);
        if (index > -1) { // only splice array when item is found
          numbersArray.splice(index, 1); // 2nd parameter means remove one item only
          weights.splice(index, 1);
          console.log("Index of removed item is at " + index);
          const newRandNum = weightedRandom(numbersArray, weights);
          console.log("New random Number is " + newRandNum);
          setPrizeNumber(newRandNum)
          setMustSpin(true);
        }
        
        
      }
      else{
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      }
       */
    
    }
  };

  return (
    <div className="App">
      <img className="ShalinaLogo" width={200} height={100} src={shalinaLogoURL} />
      <header className="App-header">
        <div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          // perpendicularText
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className={'spin-button'} onClick={handleSpinClick}>
          SPIN
        </button>
        </div>
        
        <div>
          
        </div>
      </header>
      
    </div>
    
  );
}

export default App;
