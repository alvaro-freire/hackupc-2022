function Podium({ first, second, third }) {
  return (
    <div className='flex text-center mt-8 mx-auto w-[500px] justify-evenly'>
      <div className='mt-[30px]'>
        <div className='text-2xl'>🥈</div>
        <div>{second || ''}</div>
      </div>
      <div>
        <div className='text-2xl'>🥇</div>
        <div>{first || ''}</div>
      </div>
      <div className='mt-[40px]'>
        <div className='text-2xl'>🥉</div>
        <div>{third || ''}</div>
      </div>
    </div>
    )
}

export default Podium