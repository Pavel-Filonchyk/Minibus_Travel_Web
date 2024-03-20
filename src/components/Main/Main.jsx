import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU'
import { InteractionOutlined, ClockCircleOutlined } from '@ant-design/icons'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { auth } from '../../firebase.config'

import style from './Main.module.scss'

export default function Main() {
    //onsole.log(auth)
    const [confirmCode, setConfirmCode] = useState('')
    const [user, setUser] = useState(null)
    console.log(user)
    const [calc, setCalc] = useState(0)
    const [changeWay, setChengeWay] = useState(true)
    const [showCode, setShowCode] = useState(false)

    // check
    const [selectFrom, setSelectFrom] = useState("Туров")
    const [selectTo, setSelectTo] = useState("Гомель")
    const [date, setDate] = useState(dayjs())
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wayStart, setSelectWayStart] = useState("Остановка №1")
    const [wayStop, setSelectWayStop] = useState("Остановка №2")
    const [numberSeats, setNumberSeats] = useState(1)

    useEffect(() => {
        if (!changeWay) {
            setSelectFrom("Гомель")
        }else{
            setSelectFrom("Туров")
        }
        if (changeWay) {
            setSelectTo("Гомель")
        }else{
            setSelectTo("Туров")
        }
        
    }, [changeWay])

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    const submitChecklist = (event) => {
        event.preventDefault()
        setCalc(calc +1)
        console.log(fullName, phoneNumber)
    }
    const onGetCode = () => {
        setShowCode(true)
        onSignup()
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
    function onOTPVerify() {
        window.confirmationResult
          ?.confirm(confirmCode)
          .then(async (res) => {
            //console.log(res)
            setUser(res.user)
          })
          .catch((err) => {
            console.log(err)
          })
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
                    <span>ОНЛАЙН БРОНИРОВАНИЕ</span>
                    <form onSubmit={handleSubmit}> 
                        <div className={style.wrapForm} style={{display: calc > 0 ? 'none' : ''}}>
                            <div className={style.wrapSelectWay}>
                                <div className={style.blockSelectWay}>
                                    <span style={{marginBottom: 12, marginLeft: 15}}>Откуда</span>
                                    <select 
                                        value={selectFrom}
                                        onChange={(e) => setSelectFrom(e.target.value)}
                                        className={style.selectWay}
                                    >
                                        <option>{changeWay ? 'Туров' : 'Гомель' }</option>
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
                                        <option>{changeWay ? 'Гомель' : 'Туров' }</option>
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
                            <>
                                <table>
                                    <tr>
                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Направление</th>
                                        <th className={style.textTicket}>{selectFrom} - {selectTo}</th>
                                    </tr>
                                    <tr> 
                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Дата отправления</th>
                                        <th className={style.textTicket}>{date?.format('DD.MM.YYYY')}</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Время отправления</th>
                                        <th className={style.textTicket}>06:00</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Цена</th>
                                        <th className={style.textTicket}>23</th>
                                    </tr>
                                    <tr>
                                        <th className={style.textTicket} style={{fontWeight: '700'}}>Количество свободных мест</th>
                                        <th className={style.textTicket}>+3</th>
                                    </tr>
                                </table>
                                <div className={style.tdBtn}>
                                    <div className={style.tableBtn}
                                        onClick={() => setCalc(calc +1)}
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
                        : ''
                    }
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
                            <div className={style.wrapBtn}>
                                <input 
                                    type="submit" 
                                    value='Забронировать'  
                                    className={style.order}
                                />
                                <div className={style.order} style={{backgroundColor: 'rgb(38, 166, 190)', width: 160}}
                                    onClick={() => setCalc(0)}
                                >
                                    <span>Назад</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className={style.wrapTicket} style={{display: calc === 3 ? '' : 'none'}}>
                        <table style={{marginTop: 0}}>
                            <tr>
                                <th className={style.textTicket} style={{fontWeight: '700', height: 60}}>Онлайн заказ</th>
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
                            <div id="recaptcha-container"></div>
                            <div className={style.submit}>
                                {
                                    showCode ? 
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

                    <div className={style.blockCenter}>
                        <span>ОТМЕНА БРОНИ</span>
                        <div className={style.wrapBlock}>
                            <input type="number" maxlength="6" className={style.inputTicket} placeholder='Введите номер телефона'/>
                            <div className={style.getting}>
                                <span>Брони</span>
                            </div>
                        </div>
                    </div>
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



//'\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}/'