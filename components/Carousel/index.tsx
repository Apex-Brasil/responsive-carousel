import { memo, useCallback, useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"

import Image from "next/image"

import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'

const carouselVariants = {
  selected: { scale: 1.1 },
  notSelected: { scale: 1 }
}

const imagesVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 10000 : -10000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 10000 : -10000,
      opacity: 0
    };
  }
};

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
  const [limit, setLimit] = useState<number>(0)
  const [[page, direction], setPage] = useState([0, 0]);

  const exampleMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const x = useMotionValue(0)
  
  const [bounds, setBounds] = useState({
    'upper': 0,
    'limit': 0
  })

  const widthSize = useWidth();

  useEffect(() => {
    if (!widthSize) return

    let calculatedValue = 0;
    widthSize > 1600 ? calculatedValue = 5 : calculatedValue = +(widthSize / 450).toFixed(0);  

    widthSize < 650 ? calculatedValue = 1 : calculatedValue

    setBounds({
      'upper': calculatedValue,
      'limit': calculatedValue
    })

    setLimit(+(exampleMap.length / calculatedValue).toFixed(0) < +(exampleMap.length / calculatedValue) ? +(exampleMap.length / calculatedValue).toFixed(0) + 1 : +(exampleMap.length / calculatedValue).toFixed(0))
    
  }, [widthSize])
  
  const completeMap = useMemo(
    () => exampleMap.map(i => (i < bounds.upper + bounds.limit*page && i >= 0 + bounds.limit*page) && (
      <motion.div 
        className='h-fit bg-transparent cursor-pointer'
        key={i}

        onClick={() => {
          setIsChosen(i)
          console.log(i)
          console.log(`the limit of pages is ${limit}`)
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
    )), [exampleMap, page]
  );

  const validLeft = useMemo(
    () => page !== 0 ? (
      <AiFillCaretLeft onClick={() => paginate(-1)} className='relative text-black h-8 w-8 hover:opacity-80 cursor-pointer'/>
    ) : (
      <AiFillCaretLeft className='relative text-black h-8 w-8 hover:opacity-80 cursor-not-allowed'/>
    ), [page]
  )

  const validRight = useMemo(
    () => page !== limit - 1 ? (
      <AiFillCaretRight onClick={() => paginate(1)} className='relative text-black h-8 w-8 hover:opacity-80 cursor-pointer'/>
    ) : (
      <AiFillCaretRight className='relative text-black h-8 w-8 hover:opacity-80 cursor-not-allowed'/>
    ), [page]
  )

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
    {/* <Counter/> */}
    <div className="mt-10 text-center min-h-screen min-w-fit gap-4 bg-white flex justify-center items-center mx-auto">
      {validLeft}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          variants={imagesVariants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"

          transition={{
            x: { type: 'spring', bounce: 0, velocity: 2},
            opacity: { duration: 0.1   }
          }}

          className='flex gap-8 max-w-screen-2xl'
        >
          {completeMap}
        </motion.div>
      </AnimatePresence>
      {validRight}
    </div>
    </>
  )
}

export default Carousel
