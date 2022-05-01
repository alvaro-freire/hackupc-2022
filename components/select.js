function Select({ bestof, setBestof }) {
  return (
    <div className='mx-auto w-[200px] text-lg'>
      <div><p>Best Of</p></div>
      <div className='flex items-center mx-auto h-10 text-center text-xl mt-1 mb-5'>
        <div onClick={() => setBestof(1)} className={`grow h-full mt-2 cursor-pointer rounded ${bestof === 1 ? 'bg-blue-300' : 'bg-white'}`}>
          <p className='mt-1'>1</p>
        </div>
        <div onClick={() => setBestof(3)} className={`grow h-full mt-2 cursor-pointer rounded ${bestof === 3 ? 'bg-blue-300' : 'bg-white'}`}>
          <p className='mt-1'>3</p>
        </div>
        <div onClick={() => setBestof(5)} className={`grow h-full mt-2 cursor-pointer rounded ${bestof === 5 ? 'bg-blue-300' : 'bg-white'}`}>
          <p className='mt-1'>5</p>
        </div>
      </div>
    </div>
  )
}

export default Select