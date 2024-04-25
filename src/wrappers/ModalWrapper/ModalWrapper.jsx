import React from 'react'
import style from './ModalWrapper.module.scss'

export default function ModalWrapper(props) {

  return (
    <div className={style.darkBG} style={{display: props.showModal ? "block" : "none"}}>
      <div className={style.centered}>
        <div className={props.showModal || props.showAlert ? style.modal : style.closeModal} >
          {props.children} 
        </div>
      </div>
    </div>
  )
}
