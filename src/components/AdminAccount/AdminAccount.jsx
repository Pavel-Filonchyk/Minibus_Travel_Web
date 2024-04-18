import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'

import { getTravels, postTravel, deleteTravel, deletePerson, postDirection, getDirections, deleteDirection } from '../../core/actions/restAdminTravelActions'
import { postBusstop, getBusstops, deleteBusstop, busstopCollector, deleteBusstopCollector } from '../../core/actions/restAdminBusstopsActions'
import { postCost, getCosts, deleteCost } from '../../core/actions/restAdminCostsActions'
import style from './AdminAccount.module.scss'

export default function AdminAccount() {
    const dispatch = useDispatch()

    const user = useSelector(({restUserReducer: { user }}) => user)
    const travelsData = useSelector(({restAdminTravelReducer: { travelsData }}) => travelsData)
    const directionsData = useSelector(({restAdminTravelReducer: { directionsData }}) => directionsData)
    const busstopsData = useSelector(({restAdminBusstopsReducer: { busstopsData }}) => busstopsData)
    console.log(busstopsData)
    const collectBusstops = useSelector(({restAdminBusstopsReducer: {citiesCollect  }}) => citiesCollect)
    const costsData = useSelector(({restAdminCostsReducer: { costsData }}) => costsData)
 
    // состояния редактирования рейсов
    const [travelFrom, setTravelFrom] = useState('')
    const [travelTo, setTravelTo] = useState('')
    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState(dayjs().format('HH:mm'))
    const [totalSeats, setTotalSeats] = useState('')
    const [errorFilling , setErrorFilling] = useState(false)
   
    const filterCities = busstopsData?.filter(item => item.direction === travelTo)

    // состояния редактирования направлений
    const [direction, setDirection] = useState('')

    // состояние редактирования остановок
    const [cityDirection, setCityDirection] = useState('')
    const [city, setCity] = useState('')
    const [busstop, setBusstop] =  useState('')
    const [timeBusstop, setTimeBusstop] =  useState('')
    //const [collectBusstops, setCollectBusstops] = useState([])

    // состояния редактирования стоимостей
    const [wayFrom, setWayFrom] = useState('')
    const [wayTo, setWayTo] = useState('')
    const [cost, setCost] = useState('')
    const [errorFillWay , setErrorFillWay] = useState(false)

    // показать/скрыть блоки
    const [showTravels, setShowTravels] = useState(false)
    const [showPersons, setShowPersons] = useState(true)
    const [showDirections, setShowDirections] = useState(false)
    const [showBusstops, setShowBusstops] = useState(false)
    const [showCosts, setShowCosts] = useState(false)

    const onPostTravel = () => {
        const cities = filterCities?.filter(item => dayjs(item?.cities[0].time).format('HH:mm') === time)
        if (travelFrom && travelTo && totalSeats) {
            dispatch(postTravel({
                cities: cities[0],
                travelFrom, travelTo, date: date.format('DD.MM.YYYY'), time, totalSeats
            }))
            setErrorFilling(false)
        }
        if (!travelFrom || !travelTo || !totalSeats) {
            setErrorFilling(true)
        }
    }
    const onGetTravels = () => {
        dispatch(getTravels())
        setShowTravels(item => !item)
    }
    const onGetDirections = () => {
        // dispatch(getDirections())
        // setShowDirections(item => !item)
    }

    const onCollectBusstops = () => {
        dispatch(busstopCollector({city, busstop, timeBusstop}))
    }
    
    const onDeleteBusstop = (index) => {
        dispatch(deleteBusstopCollector(index))
    }
    const onPostBusstop = () => {
        dispatch(postBusstop({direction: cityDirection, cities: collectBusstops}))
    }
    const onGetBusstops = () => {
        dispatch(getBusstops())
        setShowBusstops(item => !item)
    }
    const onPostCost = () => {
        if (wayFrom && wayTo && cost) {
            dispatch(postCost({
                wayFrom, wayTo, cost
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
        <div className={style.wrapAdmidAccount} >
            {/* style={{display: user?.phoneNumber === '+375291738113' ? '' : 'none'}} */}
            <span>УПРАВЛЕНИЕ РЕЙСАМИ</span>

            {/* Добавление рейса*/}
            <span className={style.title}>Добавить рейс</span>
            <div className={style.wrapManageTravel}>
                <span className={style.label}>Отправление от</span>
                <input type="text" className={style.inputChecklist} value={travelFrom} onChange={(e) => setTravelFrom(e.target.value)}/>
                <span className={style.label}>Конечная</span>
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
                       filterCities?.map(item => {return(
                            <option>{dayjs(item?.cities[0].time).format('HH:mm')}</option>
                        )})
                    }
                </select>
                <span className={style.label}>Количество мест</span>
                <input type="number" className={style.inputChecklist} style={{marginBottom: 20}} value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)}/>
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
                            {/* style={{display: showTravels ? '' : 'none'}} */}
                            <table style={{marginTop: 20, marginBottom: 15}}>
                                <tr>
                                    <th className={style.textTicket}>Направление:</th>
                                    <th className={style.textTicket}>{item.tripFrom}-{item.tripTo}</th>
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
                                    <th className={style.textTicket}>Количество мест</th>
                                    <th className={style.textTicket}>{item.totalSeats}</th>
                                </tr>
                                <div className={style.wrapBtn} style={{justifyContent: 'flex-start', marginBottom: 10, marginLeft: 10}}>
                                    <div className={style.btn} 
                                        style={{marginBottom: 0, marginTop: 0, backgroundColor: '#1560BD'}}
                                        //onClick={() => setShowPersons(item => !item)}
                                    >
                                        <span>Пассажиры</span>
                                    </div>
                                </div>
                                {
                                    item.persons?.map(elem => {return(
                                        <>
                                            <tr >
                                                <th className={style.textTicket}>Имя</th>
                                                <th className={style.textTicket}>{elem.fullName}</th>
                                            </tr>
                                            <tr >
                                                <th className={style.textTicket}>Телефон</th>
                                                <th className={style.textTicket}>{elem.phoneNumber}</th>
                                            </tr>
                                            <tr >
                                                <th className={style.textTicket}>Посадка-Высадка</th>
                                                <th className={style.textTicket}>{elem.tripFrom}-{elem.tripTo}</th>
                                            </tr>
                                            <tr >
                                                <th className={style.textTicket}>Количество мест</th>
                                                <th className={style.textTicket}>{elem.numberSeats}</th>
                                            </tr>
                                            <div className={style.wrapBtn} style={{ justifyContent: 'flex-start', marginBottom: 12, marginLeft: 10}}>
                                                <div className={style.btn} 
                                                    style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
                                                    onClick={() => dispatch(deletePerson({id: elem.id, blockId: item.blockId}))}
                                                >
                                                    <span>Удалить</span>
                                                </div>
                                            </div>
                                        </>
                                    )})
                                }
                            </table>
                            <div className={style.wrapBtn}>
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

            {/* Добавление направление */}
            <span className={style.title}>Добавить направление</span>
            <div className={style.wrapManageTravel}>
                <span className={style.label}>Маршрутка до:</span>
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
            {/* Редактирование направлений */}
            <span className={style.title}>Редактировать направление</span>
            <div className={style.wrapBtn}>
                <div className={style.btn}
                    style={{marginTop: 0}}
                    onClick={onGetDirections}
                >
                    <span>Направления</span>
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
                                        <th className={style.textTicket}>Маршрутка до:</th>
                                        <th className={style.textTicket}>{item.direction}</th>
                                    </tr>
                                </table>
                                <div className={style.wrapBtn}>
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

            {/* Добавление остановки */}
            <span className={style.title}>Добавить город с остановками</span> 
            <div className={style.wrapManageTravel}>
                <span className={style.label} style={{fontWeight :'bold'}}>Направление</span>
                <input type="text" className={style.inputChecklist} value={cityDirection} onChange={(e) => setCityDirection(e.target.value)}/>
                <span className={style.label} style={{fontWeight :'bold'}}>Город</span>
                <input type="text" className={style.inputChecklist} value={city} onChange={(e) => setCity(e.target.value)}/>
                <span className={style.label} style={{fontWeight :'bold'}}>Остановка</span>
                <input type="text" className={style.inputChecklist} value={busstop} onChange={(e) => setBusstop(e.target.value)}/>
                <span className={style.label} style={{fontWeight :'bold'}}>Время</span>
                <input type="number" className={style.inputChecklist} value={timeBusstop} onChange={(e) => setTimeBusstop(e.target.value)}/>
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
            {/* Редактирование остановок */}
            <span className={style.title}>Редактирование остановок</span> 
            <div className={style.wrapBtn}>
                <div className={style.btn}
                    style={{marginTop: 0}}
                    onClick={onGetBusstops}
                >
                    <span>Остановки</span>
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
                            <div className={style.wrapBtn}>
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
                                <div className={style.wrapBtn}>
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
        </div>
    )
}
