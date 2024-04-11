import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import _ from 'lodash'
import { getUser, deleteUser } from '../../core/actions/canselTravelActions'

import style from './PersonalArea.module.scss'

export default function PersonalArea({title, textBtn}) {
    const dispatch = useDispatch()

    const userData = useSelector(({restUserReducer: { userData }}) => userData)
    console.log(userData)
    const user = useSelector(({restUserReducer: { user }}) => user)
    const deleteUserSuccess = useSelector(({restUserReducer: { deleteUserSuccess }}) => deleteUserSuccess)

    const [phoneNumber, setPhoneNumber] = useState('')
    const [showCode, setShowCode] = useState(false)
    const [showBlockConfirm, setBlockConfirm] = useState(true)
    const [confirmCode, setConfirmCode] = useState('')

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
        
        dispatch(getUser({user: 'Ivan', phoneNumber:`+${phoneNumber}`}))
        
        setBlockConfirm(false)
    }

    const onBack = () => {
        setBlockConfirm(true)
        setShowCode(false)
    }
    const onCloseBooking = (ids) => {
        dispatch(deleteUser(ids))
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
                user && userData.length > 0
                ?   userData?.map(item => {
                    return (
                        <div className={style.wrapTicket} key={item.id}>
                            <table style={{marginTop: 0}}>
                                <tr>
                                    <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Онлайн заказ</th>
                                    <th className={style.textTicket}></th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Маршрутка до:</th>
                                    <th className={style.textTicket}>{item.tripTo}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket} style={{width: '50%'}}>Посадка - Высадка</th>
                                    <th className={style.textTicket}>{item.wayStart}-{item.wayStop}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Дата отправления</th>
                                    <th className={style.textTicket}>{item.dateTrip}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Время отправления</th>
                                    <th className={style.textTicket}>{item.timeTrips}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Фамилия и Имя</th>
                                    <th className={style.textTicket}>{item.fullName}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Номер телефона</th>
                                    <th className={style.textTicket}>{item.phoneNumber}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Количество мест</th>
                                    <th className={style.textTicket}>{item.numberSeats}</th>
                                </tr>
                            </table>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div className={style.btnBack}
                                    onClick={onBack}
                                >
                                    <span>Назад</span>
                                </div>
                                <div className={style.btnBack}
                                    style={{width: 220, marginLeft: 16, backgroundColor: 'red'}}
                                    onClick={() => onCloseBooking({blockId: item.blockId, id: item.id})}
                                >
                                    <span>Отменить бронь</span>
                                </div>
                            </div>
                        </div>
                    )})
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
