import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import _ from 'lodash'
import { auth } from '../../firebase.config'
import { getUser, deleteUser, getQueue, deleteQueue } from '../../core/actions/canselTravelActions'

import style from './PersonalArea.module.scss'

export default function PersonalArea({title, textBtn}) {
    const dispatch = useDispatch()

    const user = useSelector(({restUserReducer: { user }}) => user)
    const userData = useSelector(({restUserReducer: { userData }}) => userData)
    const deleteUserSuccess = useSelector(({restUserReducer: { deleteUserSuccess }}) => deleteUserSuccess)
    const userQueue = useSelector(({restUserReducer: { userQueue }}) => userQueue)
    const [phoneNumber, setPhoneNumber] = useState('37500')
    const [showCode, setShowCode] = useState(false)
    const [showBlockConfirm, setBlockConfirm] = useState(true)
    const [showUserBlock, setShowUserBlock] = useState(false)
    const [confirmCode, setConfirmCode] = useState('')

    const onGetCode = () => {
        setShowCode(true)
        //onSignup()
    }
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth, "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {onSignup()},
                    "expired-callback": () => {},
                },
                
            )
        }
    }
    function onSignup() {
        onCaptchVerify()
    
        const appVerifier = window.recaptchaVerifier
    
        const formatPh = "+" +  phoneNumber
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const onOTPVerify = async () => {

        // window.confirmationResult
        //     ?.confirm(confirmCode)
        //     .then(async (res) => {
        //         dispatch(getUser({user: res.user, phoneNumber:`+${phoneNumber}`}))
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        dispatch(getUser({user: 'Ivan', phoneNumber:`+${phoneNumber}`}))
        dispatch(getQueue())
        setBlockConfirm(false)
        setShowUserBlock(true)
    }

    const onBack = () => {
        setBlockConfirm(true)
        setShowCode(false)
        setShowUserBlock(false)
    }
    const onCloseBooking = (data) => {
        dispatch(deleteUser(data))
    }
    const onCloseQueue = (blockId) => {
        dispatch(deleteQueue(blockId))
    }
    return (
        <div className={style.wrapPersonalArea}>
            <span>ЛИЧНЫЙ КАБИНЕТ И<br/> ОТМЕНА БРОНИ</span>

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
                                containerStyle={{width: 320, borderColor: 'black'}}
                                
                            />
                            <div className={style.getBtn}
                                onClick={onGetCode}
                            >
                                <span>Войти</span>
                            </div>
                        </>
                    : 
                        <div style={{flexDirection: 'column'}}>
                            <span style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
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
                                style={{marginLeft: 0, marginTop: 20, backgroundColor: '#1560BD'}}
                                onClick={() => setShowCode(false)}
                            >
                                <span>Назад</span>
                            </div>
                        </div>
                }
            </div>

            {/* брони */}
            <div style={{display: showUserBlock ? '' : 'none', width: '100%'}}>
                <div className={style.wrapTitle} style={{display: user ? '' : 'none'}}>
                    <span>Ваши забронированные  билеты</span>
                </div>
                {
                    user && userData?.length > 0
                    ?   userData?.map(item => {
                        return (
                            <div className={style.wrapTicket} key={item.id}>
                                <table style={{marginTop: 0, padding: 8}}>
                                    <tr>
                                        <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Онлайн заказ</th>
                                        <th className={style.textTicket}></th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Посадка</th>
                                        <th className={style.textTicket}>{item.tripFrom}, ост. {item.wayStart}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket} style={{width: '50%'}}>Высадка</th>
                                        <th className={style.textTicket}>{item.tripTo}, ост. {item.wayStop}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Дата отправления</th>
                                        <th className={style.textTicket}>{item.dateTrip}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Время отправления - прибытия</th>
                                        <th className={style.textTicket}>{item.timeStart} - {item.timeStop}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Имя и фамилия</th>
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
                                    <tr>
                                        <th className={style.textTicket}>Стоимость</th>
                                        <th className={style.textTicket}>{item.cost} б.р.</th>
                                    </tr>
                                </table>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className={style.btnBack}
                                        onClick={onBack}
                                    >
                                        <span>Назад</span>
                                    </div>
                                    <div className={style.btnBack}
                                        style={{marginLeft: 16, backgroundColor: 'red'}}
                                        onClick={() => onCloseBooking({blockId: item.blockId, id: item.id, numberSeats: item.numberSeats})}
                                    >
                                        <span>Отменить бронь</span>
                                    </div>
                                </div>
                            </div>
                        )})
                    :   
                        <div className={style.wrapMessage}>
                            <span style={{fontSize: 19, fontWeight: '700'}}>У вас нет забронированных рейсов</span>
                            <div className={style.btnBack}
                                onClick={onBack}
                            >
                                <span>Назад</span>
                            </div>
                        </div>
                }

                <div className={style.wrapTitle} style={{display: user ? '' : 'none'}}>
                    <span>Ваша очерёдность на рейс</span>
                    
                </div>
                {
                    user && userQueue?.length > 0
                    ? userQueue.map(item => {return (
                        <div className={style.wrapTicket} key={item.blockId}>
                            <table style={{marginTop: 0, padding: 8}}>
                                <tr>
                                    <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Очередь</th>
                                    <th className={style.textTicket}></th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Посадка</th>
                                    <th className={style.textTicket}>{item.tripFrom}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket} style={{width: '50%'}}>Высадка</th>
                                    <th className={style.textTicket}>{item.tripTo}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Дата отправления</th>
                                    <th className={style.textTicket}>{item.dateTrip}</th>
                                </tr>
                                <tr>
                                    <th className={style.textTicket}>Время отправления</th>
                                    <th className={style.textTicket}>{item.time}</th>
                                </tr>
                            </table>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div className={style.btnBack}
                                    onClick={onBack}
                                >
                                    <span>Назад</span>
                                </div>
                                <div className={style.btnBack}
                                    style={{marginLeft: 16, backgroundColor: 'red'}}
                                    onClick={() => onCloseQueue(item.blockId)}
                                >
                                    <span>Отменить очередь</span>
                                </div>
                            </div>
                        </div>
                    )})
                    : 
                        <div className={style.wrapMessage}>
                            <span style={{fontSize: 19, fontWeight: '700'}}>Вы не стоите в очереди на рейс</span>
                            <div className={style.btnBack}
                                onClick={onBack}
                            >
                                <span>Назад</span>
                            </div>
                        </div>
            
                }
            
            </div>
        </div>
    )
}
