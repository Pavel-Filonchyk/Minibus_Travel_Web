import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
//import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

import style from './PersonalArea.module.scss'

export default function PersonalArea({title, textBtn}) {
    
    const [user, setUser] = useState(false)
    const [data, setData] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showCode, setShowCode] = useState(false)
    const [showBlockConfirm, setBlockConfirm] = useState(true)
    const [confirmCode, setConfirmCode] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels.json', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const items = await response.json
            const list = Object.keys(items).map(key => ({...items[key], id: key}))
            //console.log(list)
            return list
        }

        fetchData()
        //.then(elems => setData(elems))
         

    }, [])
    //console.log(data)

    const onGetCode = () => {
        setShowCode(true)
       //onSignup()
    }
    function onCaptchVerify() {
        // if (!window.recaptchaVerifier) {
        //         window.recaptchaVerifier = new RecaptchaVerifier(
        //             auth, "recaptcha-container",
        //         {
        //             size: "invisible",
        //             callback: (response) => {onSignup()},
        //             "expired-callback": () => {},
        //         },
                
        //     )
        // }
    }
    function onSignup() {
        // onCaptchVerify()
    
        // const appVerifier = window.recaptchaVerifier
    
        // const formatPh = "+" +  phoneNumber
    
        // signInWithPhoneNumber(auth, formatPh, appVerifier)
        //   .then((confirmationResult) => {
        //     window.confirmationResult = confirmationResult
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   });
    }
    const onOTPVerify = async () => {
        // window.confirmationResult
        //   ?.confirm(confirmCode)
        //   .then(async (res) => {
        //     setUser(res.user)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
        setBlockConfirm(false)
        setUser(375250000008)

        // const response = fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels.json', {
        //         method: 'GET',
        //         headers: {'Content-Type': 'application/json'}
        //     })
        //     const items = await response.json
            //const list = Object.keys(items).map(key => ({...items[key], id: key}))
            const response = await fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels.json', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const items = await response.json()
        const list = Object.keys(items).map(key => ({...items[key], id: key}))
        console.log(list)
    }

    const onBack = () => {
        setBlockConfirm(true)
        setShowCode(false)
        setUser(false)
    }
    const onCloseBooking = () => {

    }
    return (
        <div className={style.wrapPersonalArea}>
            <span>{title}</span>

            {/* блок подтверждения через смс */}
            <div className={style.wrapBlockConfirm} style={{display: showBlockConfirm ? '' : 'none'}}>
                {
                    !showCode
                    ?   
                        <>            
                            <PhoneInput
                                country={'by'}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                inputStyle={{width: 320, fontSize: 18, fontWeight: 600, height: 48, fontFamily: 'Montserrat'}}
                                buttonStyle={{height: 48}}
                                containerStyle={{width: 320}}
                                
                            />
                            <div className={style.getBtn}
                                onClick={onGetCode}
                            >
                                <span>{textBtn}</span>
                            </div>
                        </>
                    : 
                        <div style={{flexDirection: 'column'}}>
                            <span style={{fontSize: 18, fontWeight: '600'}}>
                                На номер {phoneNumber} был выслан код подтверждения
                            </span>
                            <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                                <input 
                                    type="number" 
                                    className={style.inputTicket} 
                                    placeholder='Введите код'
                                    onChange={(e) => setConfirmCode(e.target.value)}
                                /> 
                                <div className={style.getBtn}
                                    onClick={() => onOTPVerify()}
                                >
                                    <span>Подтвердить</span>
                                </div>
                            </div>
                            <div className={style.getBtn}
                                style={{marginLeft: 0, marginTop: 20, backgroundColor: 'rgb(38, 166, 190)'}}
                                onClick={() => setShowCode(false)}
                            >
                                <span>Назад</span>
                            </div>
                        </div>
                }
            </div>

            {/* брони */}
            {
                user 
                ?
                    <div className={style.wrapTicket}>
                        <table style={{marginTop: 0}}>
                            <tr>
                                <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Онлайн заказ</th>
                                <th className={style.textTicket}></th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Маршрутка до:</th>
                                <th className={style.textTicket}>2</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket} style={{width: '50%'}}>Посадка - Высадка</th>
                                <th className={style.textTicket}></th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Остановка посадки</th>
                                <th className={style.textTicket}>4</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Остановка высадки</th>
                                <th className={style.textTicket}>5</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Дата отправления</th>
                                <th className={style.textTicket}>6</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Время отправления</th>
                                <th className={style.textTicket}>7</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Фамилия и Имя</th>
                                <th className={style.textTicket}>8</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Номер телефона</th>
                                <th className={style.textTicket}>9</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Количество мест</th>
                                <th className={style.textTicket}>10</th>
                            </tr>
                        </table>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div className={style.btnBack}
                                onClick={onBack}
                            >
                                <span>Назад</span>
                            </div>
                            <div className={style.btnBack}
                                style={{width: 220, marginLeft: 16, backgroundColor: 'gray'}}
                                onClick={() => onCloseBooking()}
                            >
                                <span>Отменить бронь</span>
                            </div>
                        </div>
                    </div>
                :   
                    <div className={style.wrapMessage} style={{display: showBlockConfirm ? 'none' : ''}}>
                        <span style={{fontSize: 18, fontWeight: '600'}}>У вас нет забронированных рейсов</span>
                        <div className={style.btnBack}
                            onClick={onBack}
                        >
                            <span>Назад</span>
                        </div>
                    </div>

            }
        </div>
    )
}
