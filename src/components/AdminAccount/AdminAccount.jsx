import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker, TimePicker, Button, Form, Input } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'

import { getTravels, postTravel, deleteTravel } from '../../core/actions/restAdminTravelActions'
import { postBusstop } from '../../core/actions/restAdminBusstopsActions'
import style from './AdminAccount.module.scss'

export default function AdminAccount() {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const travelsData = useSelector(({restAdminTravelReducer: { travelsData }}) => travelsData)
    const user = useSelector(({restUserReducer: { user }}) => user)

    // состояние добавления рейса
    const [travelFrom, setTravelFrom] = useState('')
    const [travelTo, setTravelTo] = useState('')
    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState(dayjs())
    const [cost, setCost] = useState('')
    const [totalSeats, setTotalSeats] = useState('')

    const [errorFilling , setErrorFilling] = useState(false)

    // состояние добавления остановки
    const [busstop, setBusstop] = useState([1])


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

    const onAddBusstop = (e) => {
        dispatch(postBusstop(e))
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
                <TimePicker 
                    format={'HH:mm'} 
                    style={{width: '100%'}}
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
                    travelsData?.length > 0 
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
                                        <div className={style.btn} 
                                            style={{backgroundColor: 'red', marginBottom: 0, marginTop: 0}}
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

            {/* Добавление остановки */}
            <span className={style.title}>Добавить город с остановками</span> 
            <div className={style.wrapManageTravel}>
                <Form
                    onFinish={(e) => onAddBusstop(e)}
                    form={form}
                    initialValues={{
                        remember: false
                    }}
                >
                    <span className={style.label}>Город</span>
                    <Form.Item 
                        name='city'
                        rules={[{ required: true, message: 'Введите город' }]}
                    >
                        <Input
                            className={style.inputChecklist}
                        />
                    </Form.Item>
                    {
                        busstop.map((item, index) => {
                            return <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span className={style.label}>Остановка{index +1}</span>
                                <Form.Item 
                                    name={`busstop${index +1}`}
                                    rules={[{ required: true, message: 'Введите остановку' }]}
                                >
                                    <Input
                                        className={style.inputChecklist}
                                    />
                                </Form.Item>
                                
                            </div>
                        })
                    }
                    <div>
                        <PlusCircleOutlined 
                            onClick={() => setBusstop([...busstop, 1])}
                            style={{fontSize: 28, color: 'green', marginRight: 10, paddingTop: 10, cursor: 'pointer'}}
                        />
                        <MinusCircleOutlined 
                            onClick={() => setBusstop(busstop.splice(0, 1))}
                            style={{fontSize: 28, color: 'red', marginRight: 10, paddingTop: 10, cursor: 'pointer'}}
                        />
                    </div>
                    <div className={style.wrapBtn} style={{height: 48}}>
                        <Form.Item>
                            <Button 
                                htmlType='submit'
                                className={style.btn}
                                
                            >
                                <span>Добавить</span>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}
