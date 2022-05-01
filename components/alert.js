function Alert({ text, bgColor, onClose }) {
  const color=bgColor ? bgColor : 'bg-red-400'
  const cname='flex px-2 py-1 ' + color + ' w-[200px] mx-auto'
  return (
    <div className={cname}>
      <div className='grow'>{text}</div>
      <div className='cursor-pointer' onClick={onClose}>X</div>
    </div>
  )
}

export default Alert