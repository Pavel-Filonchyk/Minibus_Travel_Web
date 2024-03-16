import React, { useState } from 'react'
import { Button, Form, Select, Calendar, DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { InteractionOutlined } from '@ant-design/icons'

import style from './Main.module.scss'

export default function Main() {

    const [calc, setCalc] = useState(0)

    const [selectFrom, setSelectFrom] = useState("Туров")
    const [selectTo, setSelectTo] = useState("Гомель")
    const [date, setDate] = useState(dayjs())

    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wayStart, setSelectWayStart] = useState("Остановка №1")
    const [wayStop, setSelectWayStop] = useState("Остановка №2")
    const [numberSeats, setNumberSeats] = useState(1)
    
    const [showCode, setShowCode] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        //console.log(selectFrom, selectTo, date?.format('DD.MM'))
    }
    const submitChecklist = (event) => {
        event.preventDefault()
        setCalc(calc +1)
        console.log(fullName, phoneNumber)
    }

    return (
        <>
            {/* Хеадер */}

            <div className={style.header}>
                <div className={style.logo}>
                    <span>LOGO</span>
                </div>
                <div className={style.wrapPhones}>
                    <a href="tel:+375295826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>MTS</span>&nbsp;<span>+375(29)5826000</span></div>
                    </a>
                    <a href="tel:+375445826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>A<span style={{color: 'black', fontSize: 18}}>1</span></span>&nbsp;&nbsp;<span>+375(44)5826000</span></div>
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
                            <span className={style.text}>
                                РЕГУЛЯРНОГО СООБЩЕНИЯ
                            </span>
                        </div>
                        <div className={style.wrapWay}>
                            <div className={style.way}>
                                <span>Туров - Житковичи - Гомель</span>
                            </div>
                            <div className={style.btn}>
                                <span>
                                    ЗАБРОНИРОВАТЬ
                                </span>
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
                <div className={style.booking}>
                    <span>БРОНИРОВАНИЕ ОНЛАЙН</span>
                    <div style={{width: '80%'}}>
                        <form onSubmit={handleSubmit}> 
                            <div className={style.wrapForm} style={{display: calc > 0 ? 'none' : ''}}>
                                <div className={style.wrapSelectWay}>
                                    <div className={style.blockSelectWay}>
                                        <span style={{marginBottom: 12, marginLeft: 5}}>Откуда</span>
                                        <select 
                                            value={selectFrom}
                                            onChange={(e) => setSelectFrom(e.target.value)}
                                            className={style.selectWay}
                                            style={{marginRight: 20}}
                                        >
                                            <option>Туров</option>
                                            <option>Житковичи</option>
                                            <option>Малешев</option>
                                            <option>Вересница</option>
                                            <option>Запесочье</option>
                                            <option>Сторожовцы</option>
                                            <option>Озераны</option>
                                        </select>
                                    </div>
                                    {/* <InteractionOutlined /> */}
                                    <div className={style.blockSelectWay}>
                                        <span style={{marginBottom: 12, marginLeft: 25}}>Куда</span>
                                        <select 
                                            value={selectTo}
                                            onChange={(e) => setSelectTo(e.target.value)}
                                            className={style.selectWay}
                                            style={{marginLeft: 20}}
                                        >
                                            <option>Гомель</option>
                                            <option>Житковичи</option>
                                            <option>Малешев</option>
                                            <option>Вересница</option>
                                            <option>Запесочье</option>
                                            <option>Сторожовцы</option>
                                            <option>Озераны</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={style.blockSelectWay}>
                                <span style={{marginBottom: 12, marginLeft: 5, marginTop: 20}}>Выберите дату отправления</span>
                                <DatePicker 
                                    minDate={dayjs()}
                                    locale={locale}
                                    style={{width: 300}}
                                    className={style.date}
                                    dateFormat={'DD-MM-YYYY'}
                                    defaultValue={dayjs()}
                                    onChange={(e) => setDate(e)}
                                />
                                </div>

                                <div className={style.wrapBtn}>
                                    <input 
                                        type="submit" 
                                        value='Посмотреть рейсы'  
                                        className={style.btn}
                                        onClick={() => setCalc(1)}
                                    />
                                </div>
                            </div>
                        </form>

                        <div className={style.routes} style={{display: calc === 1 ? '' : 'none'}}><span>Рейсы</span></div>
                        {
                            calc === 1 ?
                                <table>
                                    <tr>
                                        <th>Направление</th>
                                        <th>Дата отправления</th>
                                        <th>Время отправления</th>
                                        <th>Цена</th>
                                        <th>Мест</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>{selectFrom} - {selectTo}</td>
                                        <td>{date?.format('DD.MM.YYYY')}</td>
                                        <td>06:00</td>
                                        <td>23</td>
                                        <td>3</td>
                                        <td className={style.tdBtn}>
                                            <div className={style.tableBtn}
                                                onClick={() => setCalc(calc +1)}
                                            >
                                                <span>Заказать</span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            : ''
                        }
                    </div>

                    <div className={style.checklist} style={{display: calc === 2 ? '' : 'none'}}>
                        <span>Направление: <span style={{fontWeight: '500'}}>{selectFrom} - {selectTo}</span></span>
                        <span>Дата отправления: <span style={{fontWeight: '500'}}>{date?.format('DD.MM.YYYY')}</span></span>
                        <span>Время отправления: <span style={{fontWeight: '500'}}>06:00</span></span>
                        
                        <form style={{display: 'flex', flexDirection: 'column'}}
                            onSubmit={submitChecklist}
                        >
                            <span className={style.label}>Введите Фамилию и Имя</span>
                            <input type="text" className={style.inputChecklist} value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                            <span className={style.label}>Номер телефона</span>
                            <input type="number" className={style.inputChecklist} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                        
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
                            <div className={style.wrapBtn}>
                                <input 
                                    type="submit" 
                                    value='Заказать место'  
                                    className={style.order}
                                />
                                <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 154)', width: 160}}
                                    onClick={() => setCalc(0)}
                                >
                                    <span>Отмена</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={style.wrapTicket} style={{display: calc === 3 ? '' : 'none'}}>
                        <table style={{marginTop: 0}}>
                            <tr>
                                <th className={style.textTicket} style={{fontWeight: '700', height: 80}}>Онлайн заказ</th>
                                <th className={style.textTicket}></th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Направление</th>
                                <th className={style.textTicket}>{selectFrom} - {selectTo}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Остановка посадки</th>
                                <th className={style.textTicket}>{wayStart}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Дата отправления</th>
                                <th className={style.textTicket}>{date?.format('DD.MM.YYYY')}</th>
                            </tr>
                            <tr>
                                <th className={style.textTicket}>Время</th>
                                <th className={style.textTicket}>06:00</th>
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
                            <div style={{display: 'flex'}}>
                                <div className={style.getCode}
                                    onClick={() => setShowCode(true)}
                                    style={{backgroundColor: showCode ? 'green' : ''}}
                                >
                                    <span>{showCode ? 'Подтвердить' : 'Получить код'}</span>
                                </div>
                                <div className={style.order} 
                                    style={{display: showCode ? 'none' : '', backgroundColor: 'rgb(38, 166, 154)', width: 230, marginTop: 0}}
                                    onClick={() => setCalc(0)}
                                >
                                    <span>Изменить данные</span>
                                </div>
                                {showCode ? <input type="number" className={style.inputTicket} placeholder='Введите код'/> : ''}
                            </div>
                        </div>
                    </div>

                    <div className={style.blockCenter}>
                        <span>Отмена брони</span>
                        <div className={style.wrapBlock}>
                            <input type="number" className={style.inputTicket} style={{marginRight: 20, width: 520}} placeholder='Введите номер телефона'/>
                            <div className={style.getting}>
                                <span>Брони</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.blockCenter}>
                        <span>Личный кабинет / Регистрация</span>
                        <div className={style.wrapBlock}>
                            <input type="number" className={style.inputTicket} style={{marginRight: 20, width: 520}} placeholder='Введите номер телефона'/>
                            <div className={style.getting} style={{backgroundColor: 'rgb(76, 175, 80)'}}>
                                <span>Войти</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Футер */}

            <div className={style.footer}>
                <div className={style.wrapApps}>
                    <div className={style.appStore}/>
                    <div className={style.googlePlay}/>
                </div>
                <div className={style.wrapPhones}>
                    <a href="tel:+375295826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>MTS</span>&nbsp;<span>+375(29)5826000</span></div>
                    </a>
                    <a href="tel:+375445826000" aria-label="phone" style={{textDecoration: 'none'}}>
                        <div className={style.phoneNumber} style={{backgroundColor: 'rgba(59, 89, 152, 0.8)'}}><span style={{color: 'red', fontWeight: '800'}}>A<span style={{color: 'black', fontSize: 18}}>1</span></span>&nbsp;&nbsp;<span>+375(44)5826000</span></div>
                    </a>
                </div>
            </div>
        </>
  )
}



//'\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}/'