function Button({ onClick }) {
  return (
      <div className={'flex items-center justify-center mx-auto mt-5'}>
        <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'} type="submit" onClick={onClick}>Submit</button>
      </div>
  )
}
  
export default Button