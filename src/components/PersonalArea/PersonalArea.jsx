import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'

import { sendCodePersonal, resetErrorCode } from '../../core/actions/authActions'
import { getUser, deleteUser, getQueue, deleteQueue } from '../../core/actions/canselTravelActions'

import style from './PersonalArea.module.scss'

export default function PersonalArea() {
    const dispatch = useDispatch()

    // auth
    const getCodePersonal = useSelector(({authReducer: { getCodePersonal }}) => getCodePersonal)
    const errorCodePersonal = useSelector(({authReducer: { errorCodePersonal }}) => errorCodePersonal)
    // брони и очереди
    const userData = useSelector(({restUserReducer: { userData }}) => userData)
    const userQueue = useSelector(({restUserReducer: { userQueue }}) => userQueue)

    // блок авторизации
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [createCode, setCreateCode] = useState(null)
    const [writeCode, setWriteCode] = useState('')
    
    // show blocks
    const [showBtn, setShowBtn] = useState(false)
    const [showAuthBlock, setShowAuthBlock] = useState(true)
    const [showUserBlock, setShowUserBlock] = useState(false)
    const [showSpin, setShowSpin] = useState(false)
    const [errorTextPhone, setErrorTextPhone] = useState(false)
    const [errorTextCode, setErrorTextCode] = useState(false)
    
    useEffect(() => {
        if (createCode !== null) {
            dispatch(sendCodePersonal({code: createCode.toString(), phoneNumber: `+375${phoneNumber}`}))
        }
    }, [createCode])

    useEffect(() => {
        if(getCodePersonal === true) {
            setShowBtn(item => !item)
        }
    }, [getCodePersonal])

    const onSendCode = () => {
        setShowSpin(true)
        setTimeout(() => {
            setShowSpin(false)
        },2500)
        if(phoneNumber !== null){
            dispatch(resetErrorCode())
            setCreateCode(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)
            setErrorTextPhone(false)
        }else{
            setErrorTextPhone(true)
        }
    }
    
    const onConfirmCode = () => {
        if (createCode.toString() === writeCode.toString()){
            dispatch(getUser({phoneNumber: `+375${phoneNumber}`}))
            dispatch(getQueue({phoneNumber: `+375${phoneNumber}`}))
            
            setShowAuthBlock(false)
            setShowUserBlock(true)
            setShowBtn(item => !item)
            setErrorTextCode(false)
            setCreateCode(null)
            if(phoneNumber === '296059269'){
                localStorage.setItem('phoneNumber448822', '+375296059269')
            }
        }
        if (createCode.toString() !== writeCode.toString()){
            setErrorTextCode(true)
        }
    }
    const onBack = () => {
        setShowAuthBlock(true)
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
            <div className={style.booking} style={{display: showAuthBlock ? 'flex' : 'none'}}>
                <div className={style.wrapForm}>
                    <span className={style.title}>Вход</span> 
                    <span className={style.label}>Введите номер телефона</span>
                    <div className={style.wrapPhoneInput}>
                        <span className={style.labelCode}>+375</span>
                        <input type='number' className={style.inputChecklist} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <span className={style.label}>Введите полученный код</span>
                    <input type='number' className={style.inputCode} value={writeCode} onChange={(e) => setWriteCode(e.target.value)}/> 
                    {/* error filling */}
                    <div className={style.wrapError} >
                        <span className={style.textError} style={{display: errorTextPhone ? '' : 'none'}}>Необходимо заполнить поле номера телефона</span>
                        <span className={style.textError} style={{display: errorCodePersonal ? '' : 'none'}}>Проверьте номер телефона</span>
                        <span className={style.textError} style={{display: errorTextCode ? '' : 'none'}}>Неверно введен код</span>
                    </div>
                    <div className={style.wrapBtn} >
                        {
                            !showBtn 
                            ?
                                <>
                                    <div className={style.order}
                                        style={{display: showSpin ? 'none' : 'flex', marginBottom: 12}}
                                        onClick={() => onSendCode()}
                                    >
                                        <span>Получить код</span>
                                    </div>
                                    <div style={{display: showSpin ? 'block' : 'none', marginRight: 20}}>
                                        <Spin 
                                            size="large"
                                        />
                                    </div>
                                </>
                            : 
                                <div className={style.order}
                                    style={{marginBottom: 12}}
                                    onClick={() => onConfirmCode()}
                                >
                                    <span>Подтвердить</span>
                                </div>
                        }
                         
                    </div>
                </div>
            </div>


            {/* брони */}
            <div style={{display: showUserBlock ? 'flex' : 'none', width: '100%', flexDirection: 'column'}}>
                <div className={style.wrapTitle}>
                    <span>Ваши забронированные  билеты</span>
                </div>
                {
                    userData?.length > 0
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
                            <span style={{fontSize: 19, fontWeight: '700', color: 'white'}}>У вас нет забронированных рейсов</span>
                            <div className={style.btnBack}
                                onClick={onBack}
                            >
                                <span>Назад</span>
                            </div>
                        </div>
                }

                <div className={style.wrapTitle}>
                    <span>Ваша очерёдность на рейс</span>
                </div>
                {
                    userQueue?.length > 0
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
                            <span style={{fontSize: 19, fontWeight: '700', color: 'white'}}>Вы не стоите в очереди на рейс</span>
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
