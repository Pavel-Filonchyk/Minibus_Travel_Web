import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'

import { getTravels, postTravel, deleteTravel } from '../../core/actions/restAdminTravelActions'
import style from './AdminAccount.module.scss'

export default function AdminAccount() {
    const dispatch = useDispatch()

    const travelsData = useSelector(({restAdminReducer: { travelsData }}) => travelsData)
    const user = useSelector(({restUserReducer: { user }}) => user)

    const [travelFrom, setTravelFrom] = useState('')
    const [travelTo, setTravelTo] = useState('')
    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState(dayjs())
    const [cost, setCost] = useState('')
    const [totalSeats, setTotalSeats] = useState('')

    const [errorFilling , setErrorFilling] = useState(false)

    const onPostRoute = () => {
        if (travelFrom && travelTo) {
            dispatch(postTravel({
                travelFrom, travelTo, date: date.format('DD.MM.YYYY'), time: time.format('HH:mm'), cost, totalSeats
            }))
            setErrorFilling(false)
        }
        if (!travelFrom || !travelTo) {
            setErrorFilling(true)
        }
    }
    const onGetTravels = () => {
        dispatch(getTravels())
    }
    const onDeleteRoute = (blockId) => {
        dispatch(deleteTravel(blockId))
    }

    return (
        <div className={style.wrapAdmidAccount} style={{display: user?.phoneNumber === '+375259802774' ? '' : 'none'}}>
            <span>АДМИНИСТРИРОВАНИЕ КОНТЕНТА РЕЙСОВ</span>
            <span className={style.title}>ДОБАВИТЬ РЕЙС</span>
            <div className={style.wrapAddTrip}>
                <span className={style.label}>Отправление от</span>
                <input type="text" className={style.inputChecklist} value={travelFrom} onChange={(e) => setTravelFrom(e.target.value)}/>
                <span className={style.label}>Конечная</span>
                <input type="text" className={style.inputChecklist} value={travelTo} onChange={(e) => setTravelTo(e.target.value)}/>
                <span className={style.label}>Дата отправления</span>
                <DatePicker 
                    minDate={dayjs()}
                    locale={locale}
                    style={{width: 320}}
                    className={style.date}
                    format={'DD-MM-YYYY'}
                    defaultValue={dayjs()}
                    onChange={(e) => setDate(e)}
                />
                <span className={style.label}>Время отправления</span>
                <TimePicker 
                    format={'HH:mm'} 
                    style={{width: 320}}
                    className={style.date}
                    value={time}
                    onChange={(e) => setTime(e)}
                />
                <span className={style.label}>Стоимость</span>
                <input type="number" className={style.inputChecklist} value={cost} onChange={(e) => setCost(e.target.value)}/>
                <span className={style.label}>Количество мест</span>
                <input type="number" className={style.inputChecklist} style={{marginBottom: 20}} value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)}/>
                {/* error filling */}
                <div className={style.wrapError} style={{display: errorFilling ? '' : 'none'}}>
                    <span className={style.textError}>Необходимо ввести поля Отправление, Конечная, Дата отправления и Время отправления</span>
                </div>
                <div className={style.wrapBtn}>
                    <div className={style.btn}
                        onClick={onPostRoute}
                    >
                        <span>Добавить</span>
                    </div>
                </div>
            </div> 

            <span className={style.title}>УДАЛИТЬ РЕЙС</span> 
            <div className={style.wrapBtn}>
                <div className={style.btn}
                    onClick={onGetTravels}
                >
                    <span>Рейсы</span>
                </div>
            </div>
                {
                    travelsData.length > 0 
                    ?
                        travelsData.map(item => {
                            return(
                                <div className={style.wrapTravels}>
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
                                            <th className={style.textTicket}>Стоимость</th>
                                            <th className={style.textTicket}>{item.cost}</th>
                                        </tr>
                                        <tr>
                                            <th className={style.textTicket}>Количество мест</th>
                                            <th className={style.textTicket}>{item.totalSeats}</th>
                                        </tr>
                                    </table>
                                    <div className={style.wrapBtn}>
                                        <div className={style.btn} style={{backgroundColor: 'red', marginBottom: 0}}
                                            onClick={() => onDeleteRoute(item.blockId)}
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
