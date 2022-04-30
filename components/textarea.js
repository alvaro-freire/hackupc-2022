function TextArea({ label, subLabel, type, name }) {
  return (
    <div className={'mx-auto text-center w-[300px] p-4'}>
      <label className='text-lg flex flex-col'>
        <span>{label}</span>
        <p className='text-sm mb-2'>{subLabel}</p>
        <textarea rows={10} className={'text-sm w-full resize-none border border-black px-2 mx-auto'} type={type} name={name} />
      </label>
    </div>
  )
}

export default TextArea