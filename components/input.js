function Input({ label, type, name }) {
  return (
    <div className={'mx-auto w-[200px] my-3'}>
      <label className='text-lg flex flex-col'>
        <span>{label}</span>
        <input className={'border border-black h-10 px-2 mx-auto w-[200px]'} type={type} name={name} />
      </label>
    </div>
  )
}

export default Input