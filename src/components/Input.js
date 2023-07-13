import React from 'react'

function Input({styles,label,value,onchange,type,placeholder,inputstyle}) {
  return (
    <div>
      <div className={styles}>
            <label>{label}</label>
            <input value={value} type={type} placeholder={placeholder} onChange={(e)=>onchange(e.target.value)} className={inputstyle}/>
        </div>
    </div>
  )
}

export default Input
