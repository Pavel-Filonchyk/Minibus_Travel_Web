import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { InteractionOutlined, ClockCircleOutlined } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import uuid from 'react-uuid' 

import PersonalArea from '../PersonalArea/PersonalArea'
import AdminAccount from '../AdminAccount/AdminAccount'
import { getTravels, postUser, getDirections } from '../../core/actions/bookTravelActions'
import { getCosts } from '../../core/actions/restAdminCostsActions'
import style from './Main.module.scss'

import { auth } from '../../firebase.config'

export default function Main() {

    const dispatch = useDispatch()

    // список всех рейсов
    const travels = useSelector(({getTravelsReducer: { travels }}) => travels)
    // список городов по направлению
    const directions = useSelector(({getTravelsReducer: { directions }}) => directions)
    const costs = useSelector(({restAdminCostsReducer: { costsData }}) => costsData)
    const getError = useSelector(({getTravelsReducer: { getError }}) => getError)
    const postSuccess = useSelector(({postUserReducer: { postSuccess }}) => postSuccess)
    const postError = useSelector(({postUserReducer: { postError }}) => postError)
    
    // auth
    const [confirmCode, setConfirmCode] = useState('')
    const [user, setUser] = useState(null)

    // check
    const [selectFrom, setSelectFrom] = useState("Туров")
    const [selectTo, setSelectTo] = useState("Гомель")
    const [date, setDate] = useState(dayjs())
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wayStart, setSelectWayStart] = useState("")
    const [wayStop, setSelectWayStop] = useState("")
    const [numberSeats, setNumberSeats] = useState(1)

    const [calc, setCalc] = useState(0)
    const [changeWay, setChengeWay] = useState(true)
    const [errorFilling , setErrorFilling] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [removePostBtns, setRemovePostBtns] = useState(false)

    // server data
    const [choiceRoutes, setChoiceRoutes] = useState([])
  
    useEffect(() => {
        dispatch(getDirections())
        dispatch(getCosts())
    }, [])
    
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
        if(user){
            dispatch(postUser({
                id: uuid(), choiceRoutes, selectFrom, selectTo, fullName, phoneNumber: `+${phoneNumber}`, wayStart, wayStop, numberSeats
            }))
        }
    }, [user])
    
    let costRoute
    for (let item of costs) {
        const findCost = () => {
            if(item.wayFrom === selectFrom && item.wayTo === selectTo){
                return item.cost
            }else{return null}
        }
        if(findCost() !== null){
            costRoute = findCost()
        }  
    }

    const getRoutes = async () => {
        dispatch(getTravels({selectFrom, selectTo, date: date.format('DD.MM.YYYY')}))

        setCalc(1)
    }
    const onChoiceRoute = (id) => {
        const route = travels?.filter(item => item.blockId === id)
        setChoiceRoutes(route)
    
        setCalc(calc +1)
    }
    const submitChecklist = () => {
        if (fullName && phoneNumber) {
            setCalc(calc +1)
            setErrorFilling(false)
        }
        if (!fullName || !phoneNumber) {
            setErrorFilling(true)
        }
    }

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
          });
    }
    const onOTPVerify = () => {
        // window.confirmationResult
        //   ?.confirm(confirmCode)
        //   .then(async (res) => {
        //     setUser(res.user)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
        setUser("Ivan")
        //setRemovePostBtns(true)
    }

    const btnBack = () => {
        setCalc(0)
        setUser(null)
        //window.location.reload()
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
                                    {
                                        directions?.map(item => {return(
                                            <option>{item?.direction}</option>
                                        )})
                                    }
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
                                    {
                                        directions?.reverse().map(item => {return(
                                            <option>{item?.direction}</option>
                                        )})
                                    }
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
                                    format={'DD-MM-YYYY'}
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

                    {/* Рейсы */}
                    <div className={style.routes} style={{display: calc === 1 ? '' : 'none'}}><span>Рейсы</span></div>
                    {
                        calc === 1 
                        ?
                            <> 
                                {
                                    travels?.map(item => {
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
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Количество свободных мест</th>
                                                        <th className={style.textTicket}>{freeSeats >= 3 ? '3+' : freeSeats}</th>
                                                    </tr>
                                                </table>
                                                <div className={style.tdBtn}>
                                                <div className={style.tableBtn}
                                                    onClick={() => onChoiceRoute(item.blockId)}
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
                                        )
                                    }) 
                                }
                                <div className={style.wrapBtn} style={{display: travels.length > 0 || getError ? 'none' : '', flexDirection: 'column', alignItems: 'center'}}>
                                    <span>На выбранные даты рейсов нет</span>
                                    <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160}}
                                        onClick={() => setCalc(0)}
                                    >
                                        <span>Назад</span>
                                    </div>
                                </div>

                                {/* get error */}
                                <div className={style.wrapGetError} style={{display: getError ? '' : 'none'}}>
                                    <span>Ошибка запроса рейсов <br/> Попробуйте позже еще раз</span>
                                    <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160, marginTop: 20, marginRight: 0}}
                                        onClick={btnBack}
                                    >
                                        <span>Назад</span>
                                    </div>
                                </div>
                            </>
                        :   ''
                    }

                    {/* Сheck list для заполнения */}
                    <div className={style.checklist} style={{display: calc === 2 ? '' : 'none'}}> 
                        <span>Маршрутка до: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.tripTo}</span></span>
                        <span>Посадка - Высадка: <span style={{fontWeight: '500'}}>{selectFrom} - {selectTo}</span></span>
                        <span>Дата отправления: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.dateTrip}</span></span>
                        <span>Время отправления: <span style={{fontWeight: '500'}}>{choiceRoutes[0]?.timeTrips}</span></span>
                        <span>Цена: <span style={{fontWeight: '500'}}>{costRoute} б.р.</span></span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span className={style.label}>Введите имя и фамилию</span>
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
                                {
                                    choiceRoutes[0]?.cities.filter(item => item.city === selectFrom)[0]
                                        ?.busstops?.map(elem => {return(
                                            <option>{elem.busstop}</option>
                                    )})
                                }
                            </select>
                            <span className={style.label}>Остановка высадки</span>
                            <select 
                                value={wayStop}
                                onChange={(e) => setSelectWayStop(e.target.value)}
                                className={style.selectСhecklist}
                            >
                                {
                                    choiceRoutes[0]?.cities.filter(item => item.city === selectTo)[0]
                                        ?.busstops?.map(elem => {return(
                                            <option>{elem.busstop}</option>
                                    )})
                                }
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
                            
                            {/* error filling */}
                            <div className={style.wrapError} style={{display: errorFilling ? '' : 'none'}}>
                                <span className={style.textError}>Необходимо заполнить все поля</span>
                            </div>
                            <div className={style.wrapBtn}>
                                <input 
                                    type="submit" 
                                    value='Забронировать'  
                                    className={style.order}
                                    onClick={() => submitChecklist()}
                                />
                                <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160}}
                                    onClick={btnBack}
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
                            <span style={{display: showCode && !removePostBtns ? 'block' : 'none', marginBottom: 20}}>
                                На номер <span style={{fontWeight: '600'}}>{phoneNumber}</span> был выслан код подтверждения. <br/> Введите код в поле и после подтверждения сможете завершить заказ.
                            </span>
                            <div id="recaptcha-container"></div>
                            <div className={style.submit} style={{display: user ? 'none' : ''}}>
                                {
                                    showCode && !removePostBtns
                                    ? 
                                        <>
                                            <div className={style.getCode}
                                                onClick={() => onOTPVerify()}
                                            >
                                                <span>Подтвердить</span>
                                            </div>
                                            <input 
                                                type="number" 
                                                className={style.inputTicket} 
                                                placeholder='Введите код'
                                                onChange={(e) => setConfirmCode(e.target.value)}
                                            /> 
                                        </>
                                    : 
                                        <>
                                            <div className={style.getCode}
                                                onClick={() => onGetCode()}
                                            >
                                                <span>Получить код</span>
                                            </div>
                                            <div className={style.order} 
                                                style={{backgroundColor: 'rgb(38, 166, 190)'}}
                                                onClick={btnBack}
                                            >
                                                <span>Назад</span>
                                            </div>
                                        </>
                                }                               
                            </div>
                            <>
                                <div className={style.getCode} style={{display: postSuccess ? '' : 'none', width: 300, marginTop: 20, marginRight: 0}}>
                                    <span>Рейс забронирован!</span>
                                </div>
                                <div className={style.order} style={{display: postSuccess ? '' : 'none', backgroundColor: 'rgb(38, 166, 190)', width: 160, marginTop: 20, marginRight: 0}}
                                    onClick={btnBack}
                                >
                                    <span>Назад</span>
                                </div>
                            </>
                            <div className={style.wrapError} style={{display: postError ? '' : 'none', marginTop: 10}}>
                                <span>Ошибка отправки данных <br/> Попробуйте позже еще раз</span>
                                <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160, marginTop: 20, marginRight: 0}}
                                    onClick={btnBack}
                                >
                                    <span>Назад</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PersonalArea
                        title='ОТМЕНА БРОНИ'
                        textBtn='Брони'
                    />
                    <PersonalArea
                        title='ЛИЧНЫЙ КАБИНЕТ'
                        textBtn='Войти'
                    />
                    <AdminAccount/>
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

