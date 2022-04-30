function Button({ text, onClick }) {
  return (
      <div className={'flex items-center justify-center mx-auto'}>
        <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} type="submit" onClick={onClick}>{text}</button>
      </div>
  )
}
  
export default Button