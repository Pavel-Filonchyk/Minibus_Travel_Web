import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import _ from 'lodash'
import { auth } from '../../firebase.config'
import { getUser, deleteUser, getQueue, deleteQueue } from '../../core/actions/canselTravelActions'

import style from './PersonalArea.module.scss'

export default function PersonalArea({title, textBtn}) {
    const dispatch = useDispatch()

    //const user = useSelector(({restUserReducer: { user }}) => user)
    const userData = useSelector(({restUserReducer: { userData }}) => userData)
    const deleteUserSuccess = useSelector(({restUserReducer: { deleteUserSuccess }}) => deleteUserSuccess)
    const userQueue = useSelector(({restUserReducer: { userQueue }}) => userQueue)
    console.log(userData)
    const [user, setUser] = useState(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorAuth, setErrorAuth] = useState(null)
    const [textAuth, setTextAuth] = useState(true)
    const [showUserBlock, setShowUserBlock] = useState(false)

    useEffect(() => {
        if(user){
            dispatch(getUser({email}))
            dispatch(getQueue({email}))
            setShowUserBlock(true)
        }
    }, [user])
    

    const onAuth = () => {
        setErrorAuth(null)

        if (textAuth){
            signInWithEmailAndPassword(auth, email, password)
            .then(data =>setUser(data))
            .catch(data => setErrorAuth(data))
        }else{
            createUserWithEmailAndPassword(auth, email, password)
            .then(data => setUser(data))
            .catch(data => setErrorAuth(data))
        }
    }
    const onBack = () => {
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

            {/* блок авторизации */}
            <div className={style.booking}>
                <div className={style.wrapForm}>
                    <span className={style.title}>{textAuth ? 'Вход': 'Регистрация'}</span> 
                    <span className={style.label}>Введите электронную почту</span>
                    <input type='email' className={style.inputChecklist} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <span className={style.label}>Пароль</span>
                    <input type='password' className={style.inputChecklist} value={password} onChange={(e) => setPassword(e.target.value)}/> 
                    <div className={style.wrapBtn} style={{justifyContent: 'flex-start'}}>
                        <div className={style.inter}
                            onClick={() => setTextAuth(item => !item)}
                        >
                            <span>{textAuth ? 'Регистрация' : 'Вход'}</span>
                        </div>
                    </div>
                    <div className={style.wrapError} style={{display:  errorAuth?.code == 'auth/email-already-in-use' ? '' : 'none', marginTop: 10}}>
                        <span className={style.textError}>Вы уже зарегестрированы<br/>Нажмите Вход и Подтвердить</span>
                    </div>
                    <div className={style.wrapError} style={{display: errorAuth?.code == 'auth/invalid-email' ? '' : 'none', marginTop: 10}}>
                        <span className={style.textError}>Проверьте Email, также длина пароля должна быть более 5 знаков</span>
                    </div>
                    <div className={style.wrapError} style={{display: errorAuth?.code == 'auth/invalid-credential' ? '' : 'none', marginTop: 10}}>
                        <span className={style.textError}>Такого пользователя не существует или неверный пароль</span>
                    </div>
                    <div className={style.wrapBtn} >
                        <div className={style.order}
                            style={{marginTop: 10, marginBottom: 12}}
                            onClick={onAuth}
                        >
                            <span>Подтвердить</span>
                        </div>
                    </div>
                </div>
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
