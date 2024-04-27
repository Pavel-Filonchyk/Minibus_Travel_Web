import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'
import {PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { getTravels, postTravel, deleteTravel, deletePerson, postDirection, 
    getDirections, deleteDirection, changeSeats, getQueues, deleteQueue } from '../../core/actions/restAdminTravelActions'
import { postBusstop, getBusstops, deleteBusstop, busstopCollector, deleteBusstopCollector } from '../../core/actions/restAdminBusstopsActions'
import { postCost, getCosts, deleteCost } from '../../core/actions/restAdminCostsActions'
import style from './AdminAccount.module.scss'

export default function AdminAccount() {
    const dispatch = useDispatch()

    const user = useSelector(({restUserReducer: { user }}) => user)
    const travelsData = useSelector(({restAdminTravelReducer: { travelsData }}) => travelsData)
    const queuesData = useSelector(({restAdminTravelReducer: { queuesData }}) => queuesData)
    const directionsData = useSelector(({restAdminTravelReducer: { directionsData }}) => directionsData)
    const busstopsData = useSelector(({restAdminBusstopsReducer: { busstopsData }}) => busstopsData)
    const collectBusstops = useSelector(({restAdminBusstopsReducer: {citiesCollect  }}) => citiesCollect)
    const costsData = useSelector(({restAdminCostsReducer: { costsData }}) => costsData)

    // состояния редактирования рейсов
    const [travelFrom, setTravelFrom] = useState('')
    const [travelTo, setTravelTo] = useState('')
    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState('')
    const [freeSeats, setFreeSeats] = useState('')
    const [errorFilling , setErrorFilling] = useState(false)

    const filterCities = busstopsData?.filter(item => item?.cities[0]?.city === travelFrom && item?.cities[item?.cities.length -1]?.city === travelTo)
  
    // состояния редактирования направлений
    const [direction, setDirection] = useState('')

    // состояние редактирования остановок
    const [cityDirection, setCityDirection] = useState('')
    const [city, setCity] = useState('')
    const [busstop, setBusstop] =  useState('')
    const [timeBusstop, setTimeBusstop] =  useState('')

    // состояния редактирования стоимостей
    const [wayFrom, setWayFrom] = useState('')
    const [wayTo, setWayTo] = useState('')
    const [cost, setCost] = useState('')
    const [errorFillWay , setErrorFillWay] = useState(false)

    // показать/скрыть блоки
    const [showMainContent, setShowMainContent] = useState(false)
    const [showTravels, setShowTravels] = useState(false)
    const [showQueues, setShowQueues] = useState(false)
    const [showPersons, setShowPersons] = useState(false)
    const [showDirections, setShowDirections] = useState(false)
    const [showBusstops, setShowBusstops] = useState(false)
    const [showCosts, setShowCosts] = useState(false)

    const onPostTravel = () => {
        const cities = filterCities?.filter(item => item?.cities[0]?.busstops[0]?.time === time)
        if (travelFrom && travelTo && freeSeats) {
            dispatch(postTravel({
                cities: cities?.[0]?.cities,
                travelFrom, travelTo, date: date.format('DD.MM.YYYY'), time, freeSeats: Number(freeSeats)
            }))
            setErrorFilling(false)
        }
        if (!travelFrom || !travelTo || !freeSeats) {
            setErrorFilling(true)
        }
    }
    const onGetTravels = () => {
        dispatch(getTravels())
        setShowTravels(item => !item)
    }

    const onGetQueues =() => {
        dispatch(getQueues())
        setShowQueues(item => !item)
    }

    const onGetDirections = () => {
        dispatch(getDirections())
        setShowDirections(item => !item)
    }

    const onChangeFreeSeats = (arg) => {
        dispatch(changeSeats(arg))
    }

    const onCollectBusstops = () => {
        dispatch(busstopCollector({city, busstop, timeBusstop}))
    }
    
    const onDeleteBusstop = (index) => {
        dispatch(deleteBusstopCollector(index))
    }
    const onPostBusstop = () => {
        dispatch(postBusstop({cities: collectBusstops}))
    }
    const onGetBusstops = () => {
        dispatch(getBusstops())
        setShowBusstops(item => !item)
    }
    const onPostCost = () => {
        if (wayFrom && wayTo && cost) {
            dispatch(postCost({
                wayFrom, wayTo, cost: Number(cost)
            }))
            setErrorFillWay(false)
        }
        if (!wayFrom || !wayTo || !cost) {
            setErrorFillWay(true)
        }
    }
    const onGetCosts = () => {
        dispatch(getCosts())
        setShowCosts(item => !item)
    }

    return (
        <div className={style.wrapAdmidAccount} style={{display: user?.phoneNumber === '+375291738113' ? '' : 'none'}}>
            {/*  */}
            <span style={{color: 'white'}}>УПРАВЛЕНИЕ РЕЙСАМИ</span>
            <div className={style.wrapBtn}>
                <div className={style.btn} 
                    style={{marginTop: 20}}
                    onClick={() => setShowMainContent(item => !item)}
                >
                    <span>{showMainContent ? 'Свернуть' : 'Развернуть'}</span>
                </div>
            </div>
            <div className={style.wrapBtn} style={{display: showMainContent ? '' : 'none', flexDirection: 'column', alignItems: 'center'}}>
                {/* Добавление рейса*/}
                <span className={style.title}>Добавить рейс</span>
                <div className={style.wrapManageTravel}>
                    <span className={style.label}>Отправление</span>
                    <input type="text" className={style.inputChecklist} value={travelFrom} onChange={(e) => setTravelFrom(e.target.value)}/>
                    <span className={style.label}>Прибытие</span>
                    <input type="text" className={style.inputChecklist} value={travelTo} onChange={(e) => setTravelTo(e.target.value)}/>
                    <span className={style.label}>Дата отправления</span>
                    <DatePicker 
                        minDate={dayjs()}
                        locale={locale}
                        style={{width: '100%'}}
                        className={style.date}
                        format={'DD-MM-YYYY'}
                        defaultValue={dayjs()}
                        onChange={(e) => setDate(e)}
                    />
                    <span className={style.label}>Время отправления</span>
                    <div className={style.wrapBtn} 
                        style={{justifyContent: 'flex-start', marginBottom: 10}}
                    >
                        <div className={style.btn}
                            onClick={() => dispatch(getBusstops())}
                            style={{backgroundColor: '#1560BD'}}
                        >
                            <span>Смотреть</span>
                        </div>
                    </div>
                    <select 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={{margin: 0}}
                        className={style.selectWay}
                    >
                        <option selected="selected">Сделайте выбор</option>
                        {
                            filterCities?.map(item => {
                                return(
                                    <option>{item?.cities[0]?.busstops[0]?.time}</option>
                                )
                            })
                            
                        }
                    </select>
                    <span className={style.label}>Свободные места</span>
                    <input type="number" className={style.inputChecklist} style={{marginBottom: 20}} value={freeSeats} onChange={(e) => setFreeSeats(e.target.value)}/>
                    
                    {/* error filling */}
                    <div className={style.wrapError} style={{display: errorFilling ? '' : 'none'}}>
                        <span className={style.textError}>Необходимо заполнить все поля</span>
                    </div>
                    <div className={style.wrapBtn}>
                        <div className={style.btn}
                            onClick={onPostTravel}
                        >
                            <span>Добавить</span>
                        </div>
                    </div>
                </div> 
                {/* Редактирование рейсов */}
                <span className={style.title}>Редактировать рейсы</span> 
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        style={{marginTop: 0}}
                        onClick={onGetTravels}
                    >
                        <span>Рейсы</span>
                    </div>
                </div>
                {
                    travelsData?.map(item => {
                        return(
                            <div className={style.wrapTravels} style={{display: showTravels ? '' : 'none'}}>
                                <table style={{marginTop: 20, marginBottom: 15}}>
                                    <tr>
                                        <th className={style.textTicket}>Направление:</th>
                                        <th className={style.textTicket}>{item.tripFrom} - {item.tripTo}</th>
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
                                        <th className={style.textTicket}>Количество свободных мест</th>
                                        <th className={style.textTicket}>{item.freeSeats}</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div className={style.wrapBtn} style={{justifyContent: 'flex-start', marginBottom: 10, marginLeft: 10}}>
                                                <div className={style.btn} 
                                                    style={{marginBottom: 0, marginTop: 0, backgroundColor: '#1560BD'}}
                                                    onClick={() => setShowPersons(item => !item)}
                                                >
                                                    <span>Пассажиры</span>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                                <MinusCircleOutlined 
                                                    style={{fontSize: 38, color: 'red', marginLeft: 8}}
                                                    onClick={() => onChangeFreeSeats({volue: 'minus', blockId: item.blockId})}
                                                />
                                                <PlusCircleOutlined 
                                                    style={{fontSize: 38, color: 'green', marginLeft: 40}}
                                                    onClick={() => onChangeFreeSeats({volue: 'plus', blockId: item.blockId})}
                                                />
                                            </div>
                                        </th> 
                                    </tr>
                                    {
                                        item.persons?.map(elem => {return(
                                            <>
                                                <tr style={{display: showPersons ? '' : 'none'}}>
                                                    <th className={style.textTicket}>Имя и фамилия</th>
                                                    <th className={style.textTicket}>{elem.fullName}</th>
                                                </tr>
                                                <tr style={{display: showPersons ? '' : 'none'}}>
                                                    <th className={style.textTicket}>Телефон</th>
                                                    <th className={style.textTicket}>{elem.phoneNumber}</th>
                                                </tr>
                                                <tr style={{display: showPersons ? '' : 'none'}}>
                                                    <th className={style.textTicket}>Посадка-Высадка:</th>
                                                    <th className={style.textTicket}>{elem.tripFrom}-{elem.tripTo}</th>
                                                </tr>
                                                <tr style={{display: showPersons ? '' : 'none'}}>
                                                    <th className={style.textTicket}>Количество мест</th>
                                                    <th className={style.textTicket}>{elem.numberSeats}</th>
                                                </tr>
                                                <div className={style.wrapBtn} style={{display: showPersons ? '' : 'none', justifyContent: 'flex-start', marginBottom: 12, marginLeft: 10}}>
                                                    <div className={style.btn} 
                                                        style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                                        onClick={() => dispatch(deletePerson({id: elem.id, blockId: item.blockId, numberSeats: elem.numberSeats}))}
                                                    >
                                                        <span>Удалить</span>
                                                    </div>
                                                </div>
                                            </>
                                        )})
                                    }
                                </table>
                                <div className={style.wrapBtn} style={{marginRight: 160}}>
                                    <div className={style.btn} 
                                        style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                        onClick={() => dispatch(deleteTravel(item.blockId))}
                                    >
                                        <span>Удалить</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }  

                {/* Очередники */}
                <span className={style.title}>Смотреть очередников</span>
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        style={{marginTop: 0}}
                        onClick={onGetQueues}
                    >
                        <span>Очередники</span>
                    </div>
                </div>
                {
                    queuesData?.map(item => {
                        return(
                            <div className={style.wrapTravels} style={{display: showQueues ? '' : 'none'}}>
                                <table style={{marginTop: 20, marginBottom: 15}}>
                                    <tr>
                                        <th className={style.textTicket}>Посадка - Высадка:</th>
                                        <th className={style.textTicket}>{item.tripFrom} - {item.tripTo}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Дата отправления</th>
                                        <th className={style.textTicket}>{item.dateTrip}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Время отправления</th>
                                        <th className={style.textTicket}>{item.time}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Имя и фамилия</th>
                                        <th className={style.textTicket}>{item.fullName}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket}>Телефон</th>
                                        <th className={style.textTicket}>{item.phoneNumber}</th>
                                    </tr>
                                </table>
                                <div className={style.wrapBtn} style={{marginRight: 160}}>
                                    <div className={style.btn} 
                                        style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                        onClick={() => dispatch(deleteQueue(item.blockId))}
                                    >
                                        <span>Удалить</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {/* Добавление рассписания */}
                <span className={style.title}>Добавить рассписание</span> 
                <div className={style.wrapManageTravel}>
                    <span className={style.label} style={{fontWeight :'bold'}}>Город</span>
                    <input type="text" className={style.inputChecklist} value={city} onChange={(e) => setCity(e.target.value)}/>
                    <span className={style.label} style={{fontWeight :'bold'}}>Остановка</span>
                    <input type="text" className={style.inputChecklist} value={busstop} onChange={(e) => setBusstop(e.target.value)}/>
                    <span className={style.label} style={{fontWeight :'bold'}}>Время</span>
                    <input type="text" className={style.inputChecklist} value={timeBusstop} onChange={(e) => setTimeBusstop(e.target.value)}/>
                    <div className={style.wrapBtn} style={{justifyContent: 'flex-start'}}>
                        <div className={style.btn} 
                            style={{backgroundColor: '#1560BD', marginBottom: 10, marginTop: 20}}
                            onClick={onCollectBusstops}
                        >
                            <span>Внести</span>
                        </div>
                    </div>

                    {
                        collectBusstops?.map((item, index) => {
                            return(
                                <div className={style.wrapTravels}>
                                    <table style={{marginTop: 20, marginBottom: 15, width: '100%'}}>
                                        <>
                                            <tr>
                                                <th className={style.textTicket} style={{width: '50%'}}>Город:</th>
                                                <th className={style.textTicket} style={{fontWeight: 'bold'}} >{item.city}</th>
                                            </tr>
                                            {
                                                item.busstops.map(elem => {return<>
                                                    <tr>
                                                        <th className={style.textTicket}>Остановка: </th>
                                                        <th className={style.textTicket}>{elem.busstop}</th>
                                                    </tr>
                                                    <tr>
                                                        <th className={style.textTicket}>Время</th>
                                                        <th className={style.textTicket}>{elem.time}</th>
                                                    </tr> 
                                                </>})
                                            }
                                            
                                            <div className={style.wrapBtn}>
                                                <div className={style.btn} 
                                                    style={{backgroundColor: 'red', marginBottom: 10, marginTop: 0, marginLeft: 10}}
                                                    onClick={() => onDeleteBusstop(index)}
                                                >
                                                    <span>Удалить</span>
                                                </div>
                                            </div>
                                        </>  
                                    </table>
                                    
                                </div>
                            )
                        })
                    }
                    <div className={style.wrapBtn}>
                        <div className={style.btn}
                            style={{marginTop: 16}}
                            onClick={onPostBusstop}
                        >
                            <span>Добавить</span>
                        </div>
                    </div> 
                </div>
                {/* Редактирование рассписаний */}
                <span className={style.title}>Редактирование рассписания</span> 
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        style={{marginTop: 0}}
                        onClick={onGetBusstops}
                    >
                        <span>Рассписания</span>
                    </div>
                </div>
                {
                    busstopsData?.map(item => {
                        return(
                            <div className={style.wrapTravels} style={{display: showBusstops ? '' : 'none'}}>
                                <table style={{marginTop: 20, marginBottom: 15}}>
                                    <tr>
                                        <th className={style.textTicket} style={{width: '50%'}}>Направление:</th>
                                        <th className={style.textTicket} style={{fontWeight: 'bold'}} >{item.direction}</th>
                                    </tr>
                                    {
                                        item.cities.map((elem, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th className={style.textTicket}>Город</th>
                                                        <th className={style.textTicket} style={{fontWeight: 'bold'}}>{elem.city}</th>
                                                    </tr>

                                                    {
                                                        elem.busstops.map(thing => {return(
                                                            <>
                                                                <tr>
                                                                    <th className={style.textTicket}>Остановка</th>
                                                                    <th className={style.textTicket}>{thing.busstop}</th>
                                                                </tr>
                                                                <tr>
                                                                    <th className={style.textTicket}>Время</th>
                                                                    <th className={style.textTicket}>{thing.time}</th>
                                                                </tr>
                                                            </>
                                                        )})
                                                    }
                                                    
                                                </>
                                        )})
                                    }
                                    
                                </table>
                                <div className={style.wrapBtn} style={{marginRight: 160}}>
                                    <div className={style.btn} 
                                        style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                        onClick={() => dispatch(deleteBusstop(item.blockId))}
                                    >
                                        <span>Удалить</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                
                }

                {/* Добавление стоимостей */}
                <span className={style.title}>Добавить стоимость</span>
                <div className={style.wrapManageTravel}>
                    <span className={style.label}>Посадка</span>
                    <input type="text" className={style.inputChecklist} value={wayFrom} onChange={(e) => setWayFrom(e.target.value)}/>
                    <span className={style.label}>Высадка</span>
                    <input type="text" className={style.inputChecklist} value={wayTo} onChange={(e) => setWayTo(e.target.value)}/>
                    <span className={style.label}>Стоимость</span>
                    <input type="number" className={style.inputChecklist} value={cost} onChange={(e) => setCost(e.target.value)}/>
                    <div className={style.wrapError} style={{display: errorFillWay ? '' : 'none', marginBottom: 0}}>
                        <span className={style.textError}>Необходимо заполнить все поля</span>
                    </div>
                    <div className={style.wrapBtn}>
                        <div className={style.btn}
                            style={{marginTop: 20}}
                            onClick={onPostCost}
                        >
                            <span>Добавить</span>
                        </div>
                    </div>
                </div>
                {/* Редактирование стоимостей */}
                <span className={style.title}>Редактировать стоимость</span>
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        style={{marginTop: 0}}
                        onClick={onGetCosts}
                    >
                        <span>Стоимости</span>
                    </div>
                </div>
                {
                    costsData?.length > 0 
                    ?
                        costsData.map(item => {
                            return(
                                <div className={style.wrapTravels} style={{display: showCosts ? '' : 'none'}}>
                                    <table style={{marginTop: 20, marginBottom: 15}}>
                                        <tr>
                                            <th className={style.textTicket}>Направление:</th>
                                            <th className={style.textTicket}>{item.wayFrom}-{item.wayTo}</th>
                                        </tr>
                                        <tr>
                                            <th className={style.textTicket}>Стоимость</th>

                                            <th className={style.textTicket}>{item.cost}</th>
                                        </tr>
                                    </table>
                                    <div className={style.wrapBtn} style={{marginRight: 160}}>
                                        <div className={style.btn} 
                                            style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                            onClick={() => dispatch(deleteCost(item.blockId))}
                                        >
                                            <span>Удалить</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    : ''
                } 

                {/* Добавление городов следования (direction) */}
                <span className={style.title}>Добавить направление</span>
                <div className={style.wrapManageTravel}>
                    <span className={style.label}>Город:</span>
                    <input type="text" className={style.inputChecklist} value={direction} onChange={(e) => setDirection(e.target.value)}/>
                    <div className={style.wrapBtn}>
                        <div className={style.btn}
                            style={{marginTop: 20}}
                            onClick={() => dispatch(postDirection(direction))}
                        >
                            <span>Добавить</span>
                        </div>
                    </div>
                </div>
                {/* Редактирование городов */}
                <span className={style.title}>Редактировать города</span>
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        style={{marginTop: 0}}
                        onClick={onGetDirections}
                    >
                        <span>Города</span>
                    </div>
                </div>
                {
                    directionsData?.length > 0 
                    ?
                        directionsData.map(item => {
                            return(
                                <div className={style.wrapTravels} style={{display: showDirections ? '' : 'none'}}>
                                    <table style={{marginTop: 20, marginBottom: 15}}>
                                        <tr>
                                            <th className={style.textTicket}>Город:</th>
                                            <th className={style.textTicket}>{item.direction}</th>
                                        </tr>
                                    </table>
                                    <div className={style.wrapBtn} style={{marginRight: 160}}>
                                        <div className={style.btn} 
                                            style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                            onClick={() => dispatch(deleteDirection(item.blockId))}
                                        >
                                            <span>Удалить</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    : ''
                }
            </div>
        </div>
    )
}
