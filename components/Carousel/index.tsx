import { memo, useCallback, useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"

import Image from "next/image"

import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'

const carouselVariants = {
  selected: { scale: 1.1 },
  notSelected: { scale: 1 }
}

import { useRef } from 'react';
const Counter = props => {
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return <p>Renders: {renderCounter.current}</p>;
};

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const Carousel = () => {
  const [isChosen, setIsChosen] = useState<number>(0)

  const exampleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  const [bounds, setBounds] = useState({
    'upper': 0,
    'lower': 0,
    'limit': 0
  })

  const widthSize = useWidth();

  useEffect(() => {
    if (!widthSize) return

    let calculatedValue = 0;
    widthSize > 1600 ? calculatedValue = 5 : calculatedValue = +(widthSize / 450).toFixed(0);  

    widthSize < 650 ? calculatedValue = 1 : calculatedValue

    setBounds({
      'upper': calculatedValue + bounds.limit,
      'lower': bounds.lower + bounds.limit,
      'limit': bounds.limit
    })
    
  }, [widthSize])
  
  const completeMap = useMemo(
    () => exampleMap.map(i => (i < bounds.upper && i >= bounds.lower) && (
      <motion.div 
        className=' h-fit bg-transparent cursor-pointer'
        key={i}

        onClick={() => {
          setIsChosen(i)
          console.log(i)
        }}

        animate={isChosen === i ? 'selected' : 'notSelected'}
        variants={carouselVariants}
      >
        <Image
          src={'/baron.png'}
          width={250}
          height={349}

          alt={'a Royal Baron card'}
        />
      </motion.div>
    )), [exampleMap]
  );

  const handlePrev = () => {
    isChosen === bounds.lower ? 
      setBounds({
        'upper': bounds.upper - 5,
        'lower': bounds.lower - 5,
        'limit': 5
      })
      : setIsChosen(isChosen - 1)
  }

  const handleNext = () => {
    isChosen === bounds.upper ? 
      setBounds({
        'upper': bounds.upper + 5,
        'lower': bounds.lower + 5,
        'limit': 5
      })
      : setIsChosen(isChosen + 1)
  }

  return (
    <>
    {/* <Counter/> */}
    <div className="mt-10 text-center min-h-screen min-w-fit max-w-screen-2xl gap-8 bg-white flex justify-center items-center mx-auto">
      {isChosen !== 0 && <AiFillCaretLeft onClick={() => handlePrev()} className='relative text-black h-8 w-8 hover:opacity-80 cursor-pointer'/>}
      {completeMap}
      {isChosen !== exampleMap.length - 1 && <AiFillCaretRight onClick={() => handleNext()} className='relative text-black h-8 w-8 hover:opacity-80 cursor-pointer'/>}
    </div>
    </>
  )
}

export default Carousel
