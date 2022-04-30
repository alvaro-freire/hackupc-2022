function League({ name, typeUrl, onClick }) {
  return (
    <div className='flex border border-black my-3 cursor-pointer' onClick={onClick}>
      <div className='text-left p-2 grow'>
        <p className='text-lg'>{name}</p>
        <p className='text-sm text-grey-500'>{typeUrl}</p>
      </div>
      <div className='my-auto p-1 mr-1'>
        7/15
      </div>
    </div>
  )
}
  
export default League