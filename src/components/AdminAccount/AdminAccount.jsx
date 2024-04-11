import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, TimePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'

import { getTravels } from '../../core/actions/restAdminTravelActions'
import style from './AdminAccount.module.scss'

export default function AdminAccount() {
    const dispatch = useDispatch()

    const [travelFrom, setTravelFrom] = useState('')
    const [travelTo, setTravelTo] = useState('')
    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState(dayjs())
    const [cost, setCost] = useState('')
    const [numberSeats, setNumberSeats] = useState('')

    const onGetTravels = () => {
        dispatch(getTravels())
    }

    return (
        <div className={style.wrapAdmidAccount}>
            <span>АДМИНИСТРИРОВАНИЕ КОНТЕНТА ПОЕЗДОК</span>
            <span className={style.title}>ДОБАВИТЬ ПОЕЗДКУ</span>
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
                <input type="number" className={style.inputChecklist} value={travelTo} onChange={(e) => setCost(e.target.value)}/>
                <span className={style.label}>Количество мест</span>
                <input type="number" className={style.inputChecklist} style={{marginBottom: 20}} value={travelTo} onChange={(e) => setNumberSeats(e.target.value)}/>
                <div className={style.wrapBtn}>
                    <div className={style.btn}>
                        <span>Добавить</span>
                    </div>
                </div>
            </div> 

            <span className={style.title}>УДАЛИТЬ ПОЕЗДКУ</span> 
            <div className={style.wrapBtn}>
                <div className={style.btn}
                    onClick={onGetTravels}
                >
                    <span>Поездки</span>
                </div>
            </div>
        </div>
    )
}
