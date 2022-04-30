function Alert({ text, onClose }) {
  return (
    <div className='flex px-2 py-1 bg-red-400 w-[200px] mx-auto'>
      <div className='grow'>{text}</div>
      <div className='cursor-pointer' onClick={onClose}>X</div>
    </div>
  )
}

export default Alert