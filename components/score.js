function Score({ username, results, points, position }) {
  return (
    <div className='flex border-b'>
      <div className='text-center p-2 w-[50px]'>
        <p>{position}º</p>
      </div>
      <div className='text-left pl-10 my-auto p-1 grow'>
        <p>{username}</p>
      </div>
      <div className='text-center p-2 w-[70px]'>
        <p>{results}</p>
      </div>
      <div className='text-center p-2 w-[70px]'>
        <p>{points}</p>
      </div>
    </div>
  )
}

export default Score