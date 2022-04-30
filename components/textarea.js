function TextArea({ label, type, name }) {
  return (
    <div className={'mx-auto text-center w-[350px] p-4'}>
      <label className='text-lg flex flex-col'>
        <p className='text-sm mb-2'>{label}</p>
        <textarea maxLength={130} rows={10} className={'text-sm w-full resize-none border border-black px-2 mx-auto'} type={type} name={name} />
      </label>
    </div>
  )
}

export default TextArea