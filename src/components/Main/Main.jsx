import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, Spin } from 'antd'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/ru_RU'
import { InteractionOutlined, ClockCircleOutlined, SmileOutlined, FrownOutlined, CloseOutlined } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import uuid from 'react-uuid' 

import PersonalArea from '../PersonalArea/PersonalArea'
import AdminAccount from '../AdminAccount/AdminAccount'
import ModalWrapper from '../../wrappers/ModalWrapper/ModalWrapper'
import { getAllTravels, getTravels, postUser, getDirections, closePostSuccess, postQueue } from '../../core/actions/bookTravelActions'
import { getCosts } from '../../core/actions/restAdminCostsActions'
import { sendCodeData, resetErrorCode } from '../../core/actions/authActions'
import style from './Main.module.scss'

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
    const postQueueSuccess = useSelector(({postUserReducer: { postQueueSuccess }}) => postQueueSuccess)
    
    // auth
    const getCode = useSelector(({authReducer: { getCode }}) => getCode)
    const errorCode = useSelector(({authReducer: { errorCode }}) => errorCode)
    const [createCode, setCreateCode] = useState(null)
    const [writeCode, setWriteCode] = useState('')
    const [showBtn, setShowBtn] = useState(false)
    useEffect(() => {
        if (createCode !== null) {
            dispatch(sendCodeData({code: createCode?.toString(), phoneNumber: `+375${phoneNumber}`}))
        }
    }, [createCode])
    useEffect(() => {
        if(getCode === true) {
            setShowBtn(item => !item)
        }
    }, [getCode])

    useEffect(() => {
        dispatch(getAllTravels())
        dispatch(getDirections())
        dispatch(getCosts())
    }, []) 

    // check
    const [selectFrom, setSelectFrom] = useState("Туров")
    const [selectTo, setSelectTo] = useState("Гомель")
    const [date, setDate] = useState(dayjs())
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wayStart, setSelectWayStart] = useState("")
    const [wayStop, setSelectWayStop] = useState("")
    const [numberSeats, setNumberSeats] = useState(1)
    
    const [changeWay, setChengeWay] = useState(true)
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

    const [calc, setCalc] = useState(0)
    
    // show blocks
    const [errorTextPhone, setErrorTextPhone] = useState(false)
    const [errorTextCode, setErrorTextCode] = useState(false)
    const [showSpin, setShowSpin] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [textModal, setTextModal] = useState('')
    const [smile, setSmile] = useState("goodSmile")
    const [errorFilling , setErrorFilling] = useState(false)
    const [errorCostRoute, setErrorCostRoute] = useState(false)

    // server data
    const [choiceRoutes, setChoiceRoutes] = useState([])
   
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
    const timeStart = choiceRoutes[0]?.cities.filter(item => item.city === selectFrom)[0]
        ?.busstops.filter(elem => elem.busstop === wayStart)[0]?.time
    const timeStop = choiceRoutes[0]?.cities.filter(item => item.city === selectTo)[0]
        ?.busstops.filter(elem => elem.busstop === wayStop)[0]?.time
    
    useEffect(() => {
        if(postSuccess === "На рейсе закончились места"){
            setTextModal("На рейсе закончились места. Посмотрите другое время")
            setSmile('badSmile')
        }
        if(postSuccess === "Бронирование успешно завершено!"){
            setTextModal("Бронирование успешно завершено!")
            setSmile('goodSmile')
        }
        
        if(postSuccess){
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
                dispatch(closePostSuccess())
            },2000)
        }
    }, [postSuccess])

    useEffect(() => {
        if(postError){
            setShowModal(true)
            setTextModal("Ошибка отправки . Попробуйте позже !")
            setSmile('badSmile')
            setTimeout(() => {
                setShowModal(false)
                dispatch(closePostSuccess())
            },2000)
        }
    }, [postError])
    
    useEffect(() => {
        setTextModal('Вы записаны в очередь!')
        if(postQueueSuccess){
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
                dispatch(closePostSuccess())
            },2000)
        }
    }, [postQueueSuccess])

    const getRoutes = () => {
        dispatch(getTravels({selectFrom, selectTo, date: date.format('DD.MM.YYYY')}))
        setCalc(1)
    }
    const onChoiceRoute = (id) => {
        const route = travels?.filter(item => item.blockId === id)
        setChoiceRoutes(route)
        setCalc(calc +1)
    }
    
    const submitChecklist = () => {
        if (costRoute && fullName && phoneNumber && wayStart && wayStop) {
            setCalc(calc +1)
            setErrorFilling(false)
        }
        if (!fullName || !phoneNumber || !wayStart || !wayStop) {
            setErrorFilling(true)
        }
        if(costRoute === undefined){
            setErrorCostRoute(true)
        }
    }

    // auth / post
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
    const onPostQueue = (dataTrip) => {
        if (createCode?.toString() === writeCode?.toString()){
            dispatch(postQueue(dataTrip))
            setCalc(0)
            setWriteCode('')
            setShowBtn(item => !item)
            setErrorTextCode(false)
            setCreateCode(null)
        }
        if (createCode?.toString() !== writeCode?.toString()){
            setErrorTextCode(true)
        }
    }
    const onPostUser = () => {
        if (createCode?.toString() === writeCode?.toString()){
            dispatch(postUser({
                id: uuid(), choiceRoutes, selectFrom, selectTo, fullName, phoneNumber: `+${phoneNumber}`,
                wayStart, wayStop, timeStart, timeStop, costRoute: costRoute * numberSeats, numberSeats
            }))
            setCalc(0)
            setWriteCode('')
            setShowBtn(item => !item)
            setErrorTextCode(false)
            setCreateCode(null)
        }
        if (createCode?.toString() !== writeCode?.toString()){
            setErrorTextCode(true)
        }
    }
          
    const btnBack = () => {
        setCalc(0)
        setErrorCostRoute(false)
        setNumberSeats(1)
        //window.location.reload()
    }
    const onNoticeApp = () => {
        setShowModal(true)
        setTextModal('Приложение скоро будет доступно для скачивания')
        setTimeout(() => {
            setShowModal(false)
            dispatch(closePostSuccess())
        },2000)
    }
    return (
        <>
            {/* Хеадер */}

            <div className={style.header}>
                <div className={style.logo}/>
                <div className={style.wrapPhones}>
                    <a href="tel:+375295826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(18, 54, 106, 1)'}}><span style={{color: 'red', fontWeight: '800'}}>MTS</span>&nbsp;&nbsp;<span>+375(29)582-6000</span></div>
                    </a>
                    <a href="tel:+375445826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(18, 54, 106, 1)'}}><span style={{color: 'red', fontWeight: '800'}}>A<span style={{color: 'black', fontSize: 17}}>1</span></span>&nbsp;&nbsp;<span>+375(44)582-6000</span></div>
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
                                <span style={{marginBottom: 12, marginLeft: 15, marginTop: 20}}>Откуда</span>
                                <select 
                                    value={selectFrom}
                                    onChange={(e) => setSelectFrom(e.target.value)}
                                    className={style.selectWay}
                                >
                                    {
                                        directions?.map(item => {return(
                                            <option >{item?.direction}</option>
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
                            <div className={style.blockSelectWay} style={{marginTop: 20}}>
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
                    <div className={style.routes} style={{display: calc === 1 ? '' : 'none'}}><span>РЕЙСЫ</span></div>
                    {
                        calc === 1 
                        ?
                            <>
                                {
                                    travels?.map(item => {
                                       
                                        return (
                                            <>
                                                <table key={item.blockId}>
                                                    <tr>
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Отправление</th>
                                                        <th className={style.textTicket}>
                                                            {
                                                                item.cities.filter(elem => elem.city === selectFrom)[0]?.city
                                                            }
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Прибытие</th>
                                                        <th className={style.textTicket}>
                                                            {
                                                                item.cities.filter(elem => elem.city === selectTo)[0]?.city
                                                            }
                                                        </th>
                                                    </tr>
                                                    <tr> 
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Дата отправления</th>
                                                        <th className={style.textTicket}>{item.dateTrip}</th>
                                                    </tr>
                                                    <tr> 
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Время отправления</th>
                                                        <th className={style.textTicket}>
                                                            {
                                                                item.cities.filter(elem => elem.city === selectFrom)[0]?.busstops[0]?.time
                                                            }
                                                        </th>
                                                    </tr>
                                                    <tr> 
                                                        <th className={style.textTicket} style={{fontWeight: '700', width: '60%'}}>Время прибытия</th>
                                                        <th className={style.textTicket}>
                                                            {
                                                                item.cities.filter(elem => elem.city === selectTo)[0]?.busstops[0]?.time
                                                            }
                                                        </th>
                                                    </tr>
                                                    <tr> 
                                                        <th className={style.textTicket} style={{display: item.freeSeats === 0 ? '' : 'none', fontWeight: '700', width: '60%',color: 'red'}}>Нет свободных мест</th>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Количество свободных мест</th>
                                                        <th className={style.textTicket}>{item.freeSeats >= 3 ? '3+' : item.freeSeats}</th>
                                                    </tr>
                                                </table>

                                                {/* Стать в очередь */}
                                                <div className={style.wrapInput} style={{display: item.freeSeats === 0 ? '' : 'none', width: '60%',  alignItems: 'center'}}>
                                                    <span className={style.label}>Вы можете стать в очередь и как только появятся <br/> свободные места на этот рейс, мы вам сообщим</span>   
                                                    <span className={style.label}>Введите номер телефона</span>
                                                    <div className={style.wrapPhoneInput} style={{width: '60%'}}>
                                                        <span className={style.labelCode}>+375</span>
                                                        <input type='number' className={style.inputChecklist}  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                                    </div>
                                                    <span className={style.label}>Введите полученный код</span>
                                                    <input type='number' className={style.inputChecklist} style={{width: '60%'}} value={writeCode} onChange={(e) => setWriteCode(e.target.value)}/> 
                                                    {/* error filling */}
                                                    <div className={style.wrapError} style={{alignItems: 'center'}}>
                                                        <span className={style.textError} style={{display: errorTextPhone ? '' : 'none'}}>Необходимо заполнить поле номера телефона</span>
                                                        <span className={style.textError} style={{display: errorCode ? '' : 'none'}}>Проверьте номер телефона</span>
                                                        <span className={style.textError} style={{display: errorTextCode ? '' : 'none'}}>Неверно введен код</span>
                                                    </div>
                                                </div>

                                                <div className={style.wrapBtn}>
                                                    {
                                                        item.freeSeats === 0 
                                                        ? 
                                                            
                                                                !showBtn 
                                                                ?
                                                                    <>
                                                                        <div className={style.order}
                                                                            style={{display: showSpin ? 'none' : 'flex', marginBottom: 12}}
                                                                            onClick={() => onSendCode()}
                                                                        >
                                                                            <span>Получить код</span>
                                                                        </div>
                                                                        <div style={{display: showSpin ? 'block' : 'none', marginRight: 20, marginTop: 10}}>
                                                                            <Spin 
                                                                                size="large"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                
                                                                : 
                                                                <div className={style.order}
                                                                    style={{width: 260, textAlign: 'center'}}
                                                                    onClick={() => onPostQueue(
                                                                        {
                                                                            phoneNumber,
                                                                            tripFrom: item.cities.filter(elem => elem.city === selectFrom)[0]?.city,
                                                                            tripTo: item.cities.filter(elem => elem.city === selectTo)[0]?.city,
                                                                            dateTrip: item.dateTrip,
                                                                            time: item.cities.filter(elem => elem.city === selectFrom)[0]?.busstops[0]?.time,
                                                                        })}
                                                                >
                                                                    <span>Подтвердить</span>
                                                                </div>   
                                                        : 
                                                            <div className={style.order}
                                                                onClick={() => onChoiceRoute(item.blockId)}
                                                            >
                                                                <span>Заказать</span>
                                                            </div>
                                                    }
                                                     
                                                     <div className={style.order}
                                                        style={{backgroundColor: '#1560BD'}}
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
                                    <span style={{fontSize: 19, color: 'black', fontWeight: 800}}>На выбранные даты рейсов нет</span>
                                    <div className={style.order} style={{backgroundColor: '#1560BD', width: 160}}
                                        onClick={() => setCalc(0)}
                                    >
                                        <span>Назад</span>
                                    </div>
                                </div>

                                {/* get error */}
                                <div className={style.wrapGetError} style={{display: getError ? '' : 'none'}}>
                                    <span>Ошибка запроса рейсов <br/> Попробуйте позже еще раз</span>
                                    <div className={style.order} style={{backgroundColor: '#1560BD', width: 160, marginTop: 20, marginRight: 0}}
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
                        <span>Время отправления: <span style={{fontWeight: '500'}}>{timeStart}</span></span>
                        <span>Время прибытия: <span style={{fontWeight: '500'}}>{timeStop}</span></span>
                        <span>Цена: <span style={{fontWeight: '500'}}>{costRoute ? costRoute * numberSeats : '-'} б.р.</span></span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span className={style.label}>Остановка посадки</span>
                            <select 
                                value={wayStart}
                                onChange={(e) => setSelectWayStart(e.target.value)}
                                className={style.selectСhecklist}
                            >
                                <option selected>Сделайте выбор</option>
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
                                <option selected="selected">Сделайте выбор</option>
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
                                {
                                   choiceRoutes[0]?.freeSeats >= 3
                                    ? 
                                        <>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </>
                                    : Array(choiceRoutes[0]?.freeSeats).fill(0).map((item, index) => {return (
                                        <option>{index +1}</option>
                                      )})
                                }
                                
                            </select>
                            <span className={style.label}>Введите имя и фамилию</span>
                            <input type="text" className={style.inputChecklist} value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                            <span className={style.label}>Номер телефона</span>
                            <div className={style.wrapPhoneInput}>
                                <span className={style.labelCode}>+375</span>
                                <input type='number' className={style.inputChecklist} style={{width: '100%'}}  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </div>
                            <span style={{fontWeight: '500', fontSize: 16, marginTop: 30}}>При оформлении заказа, Вы даете свое согласие на обработку персональных данных и проезд в составе организованной группы пассажиров.</span>
                            
                            {/* error filling */}
                            <div className={style.wrapError} style={{display: errorFilling ? '' : 'none'}}>
                                <span className={style.textError}>Необходимо заполнить все поля</span>
                            </div>
                            <div className={style.wrapError} style={{display: errorCostRoute ? '' : 'none'}}>
                                <span className={style.textError}>На выбранный промежуток маршрута возможности забронировать нет
                            </span>
                            </div>
                            <div className={style.wrapBtn}>
                                <input 
                                    type="submit" 
                                    value='Забронировать'  
                                    className={style.order}
                                    onClick={() => submitChecklist()}
                                />
                                <div className={style.order} style={{backgroundColor: '#1560BD', width: 160}}
                                    onClick={btnBack}
                                >
                                    <span>Назад</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* Чек */}
                    <div className={style.wrapTicket} style={{display: calc === 3 ? '' : 'none'}}>
                        <table style={{marginTop: 0, padding: 8}}>
                            <tr>
                                <th className={style.textTicket} style={{fontWeight: '700', height: 40}}>Онлайн заказ</th>
                                <th className={style.textTicket}></th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Посадка</th>
                                <th className={style.textTicket}>{selectFrom}, ост. {wayStart}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Высадка</th>
                                <th className={style.textTicket}>{selectTo}, ост. {wayStop}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Дата отправления</th>
                                <th className={style.textTicket}>{choiceRoutes[0]?.dateTrip}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Время отправления - прибытия</th>
                                <th className={style.textTicket}>{timeStart} - {timeStop}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Фамилия и Имя</th>
                                <th className={style.textTicket}>{fullName}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Номер телефона</th>
                                <th className={style.textTicket}>+{phoneNumber}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Количество мест</th>
                                <th className={style.textTicket}>{numberSeats}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Стоимость</th>
                                <th className={style.textTicket}>{costRoute * numberSeats} б.р.</th>
                            </tr>
                            
                        </table>

                        <div className={style.wrapInput}>
                            <span className={style.label}>Введите полученный код</span>
                            <input type='number' className={style.inputChecklist} value={writeCode} onChange={(e) => setWriteCode(e.target.value)}/> 
                            {/* error filling */}
                            <div className={style.wrapError} >
                                <span className={style.textError} style={{display: errorTextPhone ? '' : 'none'}}>Необходимо заполнить поле номера телефона</span>
                                <span className={style.textError} style={{display: errorCode ? '' : 'none'}}>Проверьте номер телефона</span>
                                <span className={style.textError} style={{display: errorTextCode ? '' : 'none'}}>Неверно введен код</span>
                            </div>
                        </div>

                        <div className={style.wrapBtn} style={{flexDirection: 'row', marginTop: 0}}>
                            {
                                !showBtn 
                                ?
                                    <>
                                        <div className={style.order}
                                            style={{display: showSpin ? 'none' : 'flex', marginTop: 10, marginBottom: 12}}
                                            onClick={() => onSendCode()}
                                        >
                                            <span>Получить код</span>
                                        </div>
                                        <div style={{display: showSpin ? 'block' : 'none', marginRight: 20}}>
                                            <Spin size="large"/>
                                        </div>
                                    </>
                                   
                                : 
                                    <div className={style.order}
                                        style={{marginTop: 10, marginBottom: 12}}
                                        onClick={onPostUser}
                                    >
                                        <span>Подтвердить</span>
                                    </div>
                            }
 
                            <div className={style.order} 
                                style={{backgroundColor: '#1560BD'}}
                                onClick={btnBack}
                            >
                                <span>Назад</span>
                            </div> 
                        </div>
                    </div>
                    <ModalWrapper showModal={showModal}>
                        <div className={style.wrapModal}>
                            <span className={style.title}>{textModal}</span>                  
                            
                            {
                                smile === "badSmile" 
                                ?
                                    <FrownOutlined 
                                        className={style.badSmile}
                                    />
                                : smile === "goodSmile"
                                ?
                                    <SmileOutlined 
                                        className={style.smile}
                                    />
                                : ''
                            }
                        </div>
                    </ModalWrapper>

                    <PersonalArea/>

                    <AdminAccount/>

                </div>
            </div>
            
            <div className={style.line}/>
            {/* Футер */}
            <div className={style.footer}>
                <div className={style.wrapApps}>
                    <span>Для удобства бронирования установите приложение на телефон</span>
                    <div className={style.blockApps}>
                        <div className={style.appStore} style={{marginLeft: 10}}
                            onClick={onNoticeApp}
                        />
                        <div className={style.googlePlay}
                            onClick={onNoticeApp}
                        />
                    </div>
                </div>
                
            </div>
        </>
    )
}

