import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { InteractionOutlined, ClockCircleOutlined } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import _ from 'lodash'

import { auth } from '../../firebase.config'

import { routes1 } from '../../constants'
import style from './Main.module.scss'

export default function Main() {

    // const [person] = useAuthState(auth)
    // console.log(person)

    // const [userData, loading] = useCollectionData(
    //     firebase.firestore().collection('userData')
    // )
    // console.log(userData)
    // const onSubmit = async () => {
    //     firebase.firestore().collection('userData').add({
    //         fullName, phoneNumber, date, selectFrom, selectTo
    //     })
    // }

    // auth
    const [confirmCode, setConfirmCode] = useState('')
    const [user, setUser] = useState(null)
    //console.log(user)
    const [calc, setCalc] = useState(0)
    const [changeWay, setChengeWay] = useState(true)
    const [showCode, setShowCode] = useState(false)
    const [error, setError] = useState(false)

    // check
    const [selectFrom, setSelectFrom] = useState("Туров")
    const [selectTo, setSelectTo] = useState("Гомель")
    const [date, setDate] = useState(dayjs())
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wayStart, setSelectWayStart] = useState("Остановка №1")
    const [wayStop, setSelectWayStop] = useState("Остановка №2")
    const [numberSeats, setNumberSeats] = useState(1)

    // server data
    const [data, setData] = useState([])
    const [choiceRoutes, setChoiceRoutes] = useState([])
    const routes = data.filter(item => item.dateTrip === date.format('DD.MM.YYYY') && (changeWay ? 'Гомель' : 'Туров'))

    useEffect(() => {
        if (!changeWay) {
            setSelectFrom(selectTo)
        }else{
            setSelectFrom(selectFrom)
        }
        if (changeWay) {
            setSelectTo(selectTo)
        }else{
            setSelectTo(selectFrom)
        }
    }, [changeWay])

    useEffect(() => {
        const totalSeats = choiceRoutes[0]?.totalSeats
        const freeSeates = totalSeats > 0 ? totalSeats - numberSeats : totalSeats
        //console.log(choiceRoutes[0]?.id)
        if(user !== null) {
            const response = fetch(`https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels/${choiceRoutes[0]?.id}.json`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        tripFrom: choiceRoutes[0]?.tripFrom, tripTo: choiceRoutes[0]?.tripTo, dateTrip: choiceRoutes[0]?.dateTrip, timeTrips: choiceRoutes[0]?.timeTrips, car: choiceRoutes[0]?.car,
                        totalSeats, freeSeates, reservedSeats: totalSeats - freeSeates, 
                        persons: [
                            ...choiceRoutes[0]?.persons,
                            {fullName, tripFrom: selectFrom, wayStart, tripTo: selectTo, wayStop, phoneNumber, numberSeats, cost: 20}
                        ]
                })
            })
            console.log(response)
            // const items = await response.json()
            // setData(items)
        }
    }, [user])
    
    const getRoutes = async () => {
        const response = await fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels.json', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const items = await response.json()
        const list = Object.keys(items).map(key => ({...items[key], id: key}))
        setData(list) 
        
        setCalc(1)
    }
    const onChoiceRoute = (id) => {
        const route = routes?.filter(item => item.id === id)
        setChoiceRoutes(route)

        setCalc(calc +1)
    }
    const submitChecklist = () => {
        if (fullName && phoneNumber) {
            setCalc(calc +1)
            setError(false)
        }
        if (!fullName || !phoneNumber) {
            setError(true)
        }
    }

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
    function onOTPVerify() {
        // window.confirmationResult
        //   ?.confirm(confirmCode)
        //   .then(async (res) => {
        //     setUser(res.user)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
        setUser("Ivan")
    }

    const onSubmit = async () => {
        const response = await fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                tripFrom: 'ТУРОВ', tripTo: 'ГОМЕЛЬ', dateTrip:"24.04.2024", totalSeats: 10, freeSeates: 10, reservedSeats: 0, timeTrips: '08 : 00', car: 'AM 2629-3 Volkswagen Crafter', 
                persons: [{fullName: 'Лида', tripFrom: 'ТУРОВ', wayStart: 'Остановка №1', tripTo: 'ГОМЕЛЬ', wayStop: 'Остановка №1', phoneNumber: '+375290000001', numberSeats: 1, cost: 20},]
            })
        })
        const items = await response.json()
        console.log(items)
    }
    const onGet = async () => {
        const response = await fetch('https://minibus-travel-default-rtdb.europe-west1.firebasedatabase.app/travels/-NumWFoNFVLzxGodMYLJ.json', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const items = await response.json()
        console.log(items)
        // setData(Object.values(items)) 
    }
    
    return (
        <>
            {/* Хеадер */}

            <div className={style.header}>
                <div className={style.logo}/>
                <div className={style.wrapPhones}>
                    <a href="tel:+375295826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>MTS</span>&nbsp;&nbsp;<span>+375(29)582-6000</span></div>
                    </a>
                    <a href="tel:+375445826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>A<span style={{color: 'black', fontSize: 17}}>1</span></span>&nbsp;&nbsp;<span>+375(44)582-6000</span></div>
                    </a>
                </div>
            </div>
            <div className={style.line}/>

            {/* Центральный контент */}

            <div className={style.main}>
                <div className={style.centerContent}>
                    <div className={style.leftBlock}>
                        <div className={style.wrapText}>
                            <span className={style.title}>
                                ПАССАЖИРСКИЕ <br/> ПЕРЕВОЗКИ 
                            </span>
                        </div>
                        <div className={style.wrapWay}>
                            <div className={style.way}>
                                <span>Туров - Житковичи - Гомель</span>
                            </div>
                            <a href="#Забронировать" style={{textDecoration: 'none'}}>
                                <div className={style.btn}>
                                    <span>
                                        ЗАБРОНИРОВАТЬ
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className={style.orderAroundClock}>
                            <ClockCircleOutlined className={style.clockImg}/>
                            <div className={style.wrapTextClock}>
                                <span>ОНЛАЙН БРОНИРОВАНИЕ 24/7</span>
                                <span>ТЕЛЕФОНЫ ДОСТУПНЫ С 7.00 ДО 22.00</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.rightBlock}>
                        <div className={style.autoPick}/>
                    </div>
                </div>
            </div>

            {/* Бронирование */}

            <div className={style.wrapBooking}>
                <a name="Забронировать"></a>
                <div className={style.booking}>

                    {/* Выбрать рейсы */}
                    <span>ОНЛАЙН БРОНИРОВАНИЕ</span>
                    <div className={style.wrapForm} style={{display: calc > 0 ? 'none' : ''}}>
                        <div className={style.wrapSelectWay}>
                            <div className={style.blockSelectWay}>
                                <span style={{marginBottom: 12, marginLeft: 15}}>Откуда</span>
                                <select 
                                    value={selectFrom}
                                    onChange={(e) => setSelectFrom(e.target.value)}
                                    className={style.selectWay}
                                >
                                    <option>{changeWay ? 'Туров' : 'Гомель'}</option>
                                    <option>Житковичи</option>
                                    <option>Малешев</option>
                                    <option>Вересница</option>
                                    <option>Запесочье</option>
                                    <option>Сторожовцы</option>
                                    <option>Озераны</option>
                                </select>
                            </div>
                            <div 
                                className={style.wrapArrows}
                                onClick={() => setChengeWay(value => !value)}>
                                <InteractionOutlined   
                                    className={style.arrows}
                                />
                            </div>
                            <div className={style.blockSelectWay}>
                                <span style={{marginBottom: 12, marginLeft: 15}}>Куда</span>
                                <select 
                                    value={selectTo}
                                    onChange={(e) => setSelectTo(e.target.value)}
                                    className={style.selectWay}
                                >
                                    <option>{changeWay ? 'Гомель' : 'Туров'}</option>
                                    <option>Житковичи</option>
                                    <option>Малешев</option>
                                    <option>Вересница</option>
                                    <option>Запесочье</option>
                                    <option>Сторожовцы</option>
                                    <option>Озераны</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.wrapDatePicker}>
                            <div className={style.blockSelectWay}>
                                <span style={{marginBottom: 12, marginLeft: 15, marginTop: 20}}>Выберите дату отправления</span>
                                <DatePicker 
                                    minDate={dayjs()}
                                    locale={locale}
                                    style={{width: 320, marginLeft: 15}}
                                    className={style.date}
                                    dateFormat={'DD-MM-YYYY'}
                                    defaultValue={dayjs()}
                                    onChange={(e) => setDate(e)}
                                />
                            </div>
                        </div>

                        <div className={style.wrapBtn}>
                            <input 
                                type="submit" 
                                value='Посмотреть рейсы'  
                                className={style.btn}
                                onClick={() => getRoutes()}
                            />
                        </div>
                    </div>

                    <br/>

                    <div style={{backgroundColor: 'gray', width: 140, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer',  color: 'white'}}
                            onClick={() => onSubmit()}
                        >
                            <span>ОТПРАВИТЬ</span> 
                        </div>
                        <div style={{backgroundColor: 'gray', marginTop: 20, width: 140, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer',  color: 'white'}}
                            onClick={() => onGet()}
                        >
                            <span>ПОЛУЧИТЬ</span> 
                        </div>

                    {/* Рейсы */}
                    <div className={style.routes} style={{display: calc === 1 ? '' : 'none'}}><span>Рейсы</span></div>
                    {
                        calc === 1 ?
                            routes?.map(item => {
                                const freeSeats = item.totalSeats - item.reservedSeats
                                return (
                                    <>
                                        <table key={item.id}>
                                            <tr>
                                                <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Направление</th>
                                                <th className={style.textTicket}>{item.tripFrom} - {item.tripTo}</th>
                                            </tr>
                                            <tr> 
                                                <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Дата отправления</th>
                                                <th className={style.textTicket}>{item.dateTrip}</th>
                                            </tr>
                                            <tr>
                                                <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Время отправления</th>
                                                <th className={style.textTicket}>{item.timeTrips}</th>
                                            </tr>
                                            <tr>
                                                <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Цена</th>
                                                <th className={style.textTicket}>23</th>
                                            </tr>
                                            <tr>
                                                <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Количество свободных мест</th>
                                                <th className={style.textTicket}>{freeSeats >= 3 ? '3+' : freeSeats}</th>
                                            </tr>
                                        </table>
                                        <div className={style.tdBtn}>
                                        <div className={style.tableBtn}
                                            onClick={() => onChoiceRoute(item.id)}
                                        >
                                            <span>Заказать</span>
                                        </div> 
                                        <div className={style.tableBtn}
                                            style={{backgroundColor: 'rgb(38, 166, 190)'}}
                                            onClick={() => setCalc(0)}
                                        >
                                            <span>Назад</span>
                                            </div> 
                                        </div>
                                    </>
                                )})  
                        : ''
                    }

                    {/* Сheck list для заполнения */}
                    <div className={style.checklist} style={{display: calc === 2 ? '' : 'none'}}>
                        <span>Маршрутка до: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.tripTo}</span></span>
                        <span>Посадка - Высадка: <span style={{fontWeight: '500'}}>{selectFrom} - {selectTo}</span></span>
                        <span>Дата отправления: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.dateTrip}</span></span>
                        <span>Время отправления: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.timeTrips}</span></span>
                        
                        <div style={{display: 'flex', flexDirection: 'column'}}
                            onSubmit={submitChecklist}
                        >
                            <span className={style.label}>Введите Имя и Фамилию</span>
                            <input type="text" className={style.inputChecklist} value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                            <span className={style.label}>Номер телефона</span>
                            <PhoneInput
                                country={'by'}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                inputStyle={{width: 260, fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat'}}
                                
                            />
                            <span className={style.label}>Остановка посадки</span>
                            <select 
                                value={wayStart}
                                onChange={(e) => setSelectWayStart(e.target.value)}
                                className={style.selectСhecklist}
                            >
                                <option>Остановка №1</option>
                                <option>Остановка №2</option>
                                <option>Остановка №3</option>
                            </select>
                            <span className={style.label}>Остановка высадки</span>
                            <select 
                                value={wayStop}
                                onChange={(e) => setSelectWayStop(e.target.value)}
                                className={style.selectСhecklist}
                            >
                                <option>Остановка №1</option>
                                <option>Остановка №2</option>
                                <option>Остановка №3</option>
                            </select>
                            <span className={style.label}>Количество мест</span>
                            <select 
                                value={numberSeats}
                                onChange={(e) => setNumberSeats(e.target.value)}
                                className={style.selectСhecklist}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <span style={{fontWeight: '500', fontSize: 16, marginTop: 40}}>При оформлении заказа, Вы даете свое согласие на обработку персональных данных и проезд в составе организованной группы пассажиров.</span>
                            
                            {/* error */}
                            <div className={style.wrapError} style={{display: error ? '' : 'none'}}>
                                <span className={style.textError}>Необходимо заполнить поля фамилия, имя и телефон</span>
                            </div>
                            <div className={style.wrapBtn}>
                                <input 
                                    type="submit" 
                                    value='Забронировать'  
                                    className={style.order}
                                    onClick={() => submitChecklist()}
                                />
                                <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160}}
                                    onClick={() => setCalc(0)}
                                >
                                    <span>Назад</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Чек */}
                    <div className={style.wrapTicket} style={{display: calc === 3 ? '' : 'none'}}>
                        <table style={{marginTop: 0}}>
                            <tr>
                                <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Онлайн заказ</th>
                                <th className={style.textTicket}></th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Маршрутка до:</th>
                                <th className={style.textTicket}>{choiceRoutes[0]?.tripTo}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Посадка - Высадка</th>
                                <th className={style.textTicket}>{selectFrom} - {selectTo}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Остановка посадки</th>
                                <th className={style.textTicket}>{wayStart}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Остановка высадки</th>
                                <th className={style.textTicket}>{wayStop}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Дата отправления</th>
                                <th className={style.textTicket}>{choiceRoutes[0]?.dateTrip}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Время отправления</th>
                                <th className={style.textTicket}>{choiceRoutes[0]?.timeTrips}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Фамилия и Имя</th>
                                <th className={style.textTicket}>{fullName}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Номер телефона</th>
                                <th className={style.textTicket}>{phoneNumber}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Количество мест</th>
                                <th className={style.textTicket}>{numberSeats}</th>
                            </tr>
                            
                        </table>
                        <div className={style.wrapBtn}>
                            <span style={{display: showCode ? 'none' : 'block', marginBottom: 20}}>Для подтверждения брони необходимо получить код на телефон</span>
                            <span style={{display: showCode ? 'block' : 'none', marginBottom: 20}}>
                                На номер <span style={{fontWeight: '600'}}>{phoneNumber}</span> был выслан код подтверждения. <br/> Введите код в поле и после подтверждения сможете завершить заказ.
                            </span>
                            <div id="recaptcha-container"></div>
                            <div className={style.submit}>
                                {
                                    showCode? 
                                    <div className={style.getCode}
                                        onClick={() => onOTPVerify()}
                                    >
                                        <span>Подтвердить</span>
                                    </div>
                                    : 
                                    <div className={style.getCode}
                                        onClick={() => onGetCode()}
                                    >
                                        <span>Получить код</span>
                                    </div>
                                }                               
                                <div className={style.order} 
                                    style={{display: showCode ? 'none' : '', backgroundColor: 'rgb(38, 166, 190)'}}
                                    onClick={() => setCalc(0)}
                                >
                                    <span>Назад</span>
                                </div>
                                { showCode ? 
                                    <input 
                                        type="number" 
                                        className={style.inputTicket} 
                                        placeholder='Введите код'
                                        onChange={(e) => setConfirmCode(e.target.value)}
                                    />  
                                : ''}
                                
                            </div>
                            {
                                user ?
                                <div className={style.getCode} style={{width: 400, marginTop: 20}}>
                                    <span>Рейс успешно забронирован!</span>
                                </div>
                                : ''
                            }
                        </div>
                    </div>

                    {/* Отмена брони */}
                    <div className={style.blockCenter}>
                        <span>ОТМЕНА БРОНИ</span>
                        <div className={style.wrapBlock}>
                            <input type="number" maxLength="6" className={style.inputTicket} placeholder='Введите номер телефона'/>
                            <div className={style.getting}>
                                <span>Брони</span>
                            </div>
                        </div>
                    </div>

                     {/* Личный кабинет */}
                    <div className={style.blockCenter}>
                        <span>ЛИЧНЫЙ КАБИНЕТ</span>
                        <div className={style.wrapBlock}>
                            <input type="number" className={style.inputTicket} placeholder='Введите номер телефона'/>
                            <div className={style.getting} style={{backgroundColor: 'green'}}>
                                <span>Войти</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Футер */}
            <div className={style.footer}>
                <div className={style.wrapApps}>
                    <span>Для удобства вашего бронирования установите наше приложение на телефон</span>
                    <div className={style.blockApps}>
                        <div className={style.appStore} style={{marginLeft: 10}}/>
                        <div className={style.googlePlay}/>
                    </div>
                </div>
                
            </div>
        </>
  )
}

