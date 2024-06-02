import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import style from './PrivacyPolicy.module.scss'

export default function PrivacyPolicyDriver() {

    const [showLang, setShowLang] = useState(true)

    return (
        <div className={style.wrapPrivacyPolicy}>
            <div className={style.header}>
                <Link className={style.text} style={{textDecoration: 'underline'}} to="/">
                    <span>Вернуться на главную</span>
                </Link>
                <div className={style.wrapText}> 
                    <span className={style.text}
                        onClick={() => setShowLang(item => !item)}
                        style={{textDecoration: showLang ? 'underline' : 'none'}}
                    >en</span>
                    <span className={style.text}> / </span>
                    <span className={style.text}
                        onClick={() => setShowLang(item => !item)}
                        style={{textDecoration: showLang ? 'none' : 'underline'}}
                    >ru</span>
                </div>
                <Link className={style.text} style={{textDecoration: 'underline'}} to="/confidentiality">
                    <span>Политика кофиденциальности для <br/> Клиентского приложения</span>
                </Link>
            </div>

            {/* Политика конфиденциальности на английском */}
            <div className={style.privacyPolicy} style={{display: showLang ? 'block' : 'none'}}>
                <span className={style.title}>Privacy Policy</span>
                <br/>
                <br/>
                <span>
                    This privacy policy applies to the Minibus Travel app (hereby referred to as "Application") for mobile devices that was created by Filonchyk Pavel (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
                    <br/>
                    <br/>
                    Information Collection and Use
                    <br/>
                    The Application collects information when you download and use it. This information may include information such as
                    <br/>
                    <br/>
                    - Your device's Internet Protocol address (e.g. IP address)
                    <br/>
                    - The pages of the Application that you visit, the time and date of your visit, the time spent on those pages
                    <br/>
                    - The time spent on the Application
                    <br/>
                    - The operating system you use on your mobile device
                    <br/>
                    <br/>
                    The Application does not gather precise information about the location of your mobile device.
                    <br/>
                    <br/>
                    The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
                    <br/>
                    <br/>
                    For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information. The information that the Service Provider request will be retained by them and used as described in this privacy policy.
                    <br/>
                    <br/>
                    Ads
                    <br/>
                    The application does not contain ads
                    <br/>
                    <br/>
                    Third Party Access
                    <br/>
                    Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
                    <br/>
                    <br/>
                    Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
                    <br/>
                    <br/>
                    Google Play Services
                    <br/>
                    The Service Provider may disclose User Provided and Automatically Collected Information:
                    <br/>
                    - as required by law, such as to comply with a subpoena, or similar legal process;
                    <br/>
                    - when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;
                    <br/>
                    - with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.
                    <br/>
                    <br/>
                    Opt-Out Rights
                    <br/>
                    You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
                    <br/>
                    <br/>
                    Data Retention Policy
                    <br/>
                    The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at p_filonchyk@mail.ru and they will respond in a reasonable time.
                    <br/>
                    <br/>
                    Children
                    <br/>
                    The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 18.
                    <br/>
                    <br/>
                    The Application does not address anyone under the age of 18. The Service Provider does not knowingly collect personally identifiable information from children under 18 years of age. In the case the Service Provider discover that a child under 18 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (p_filonchyk@mail.ru) so that they will be able to take the necessary actions.
                    <br/>
                    <br/>
                    Security
                    <br/>
                    The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
                    <br/>
                    <br/>
                    Changes
                    <br/>
                    This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
                    <br/>
                    <br/>
                    This privacy policy is effective as of 2024-04-03
                    <br/>
                    <br/>
                    Your Consent
                    <br/>
                    By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
                    <br/>
                    <br/>
                    Contact Us
                    <br/>
                    If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at p_filonchyk@mail.ru.
                </span>
            </div>
            
            {/* Политика конфиденциальности на русском */}
            <div className={style.privacyPolicy} style={{display: !showLang ? 'block' : 'none'}}>
                <span className={style.title}>Политика конфиденциальности</span>
                <br/>
                <br/>
                <span>
                    Настоящая политика конфиденциальности распространяется на Приложение для путешествий в микроавтобусе (далее - "Приложение") для мобильных устройств, созданное Павлом Филончиком (далее - "Поставщик услуг") в качестве бесплатной услуги. Эта услуга предназначена для использования "КАК ЕСТЬ".
                    <br/>
                    <br/>
                    Сбор и использование информации
                    <br/>
                    Приложение собирает информацию, когда вы загружаете и используете его. Эта информация может включать в себя такие сведения, как:
                    <br/>
                    <br/>
                    - Адрес интернет-протокола вашего устройства (например, IP-адрес).
                    <br/>
                    - Страницы приложения, которые вы посещаете, время и дата вашего посещения, время, проведенное на этих страницах
                    <br/>
                    - Время, затраченное на использование Приложения
                    <br/>
                    - Операционная система, которую вы используете на своем мобильном устройстве
                    <br/>
                    <br/>
                    Приложение не собирает точную информацию о местоположении вашего мобильного устройства.
                    <br/>
                    <br/>
                    Поставщик услуг может использовать предоставленную вами информацию, чтобы время от времени связываться с вами для предоставления важной информации, необходимых уведомлений и маркетинговых акций.
                    <br/>
                    <br/>
                    Для удобства использования Приложения Поставщик услуг может потребовать, чтобы вы предоставили нам определенную личную информацию. Информация, запрашиваемая Поставщиком услуг, будет сохранена и использована в соответствии с настоящей политикой конфиденциальности.
                    <br/>
                    <br/>
                    Реклама
                    <br/>
                    Приложение не содержит рекламу
                    <br/>
                    <br/>
                    Доступ третьих лиц
                    <br/>
                    Внешним сервисам периодически передаются только обобщенные, обезличенные данные, чтобы помочь Поставщику услуг улучшить Приложение и свой сервис. Поставщик услуг может передавать вашу информацию третьим лицам способами, описанными в настоящем заявлении о конфиденциальности.
                    <br/>
                    <br/>
                    Пожалуйста, обратите внимание, что Приложение использует сторонние сервисы, которые имеют собственную политику конфиденциальности в отношении обработки данных. Ниже приведены ссылки на Политику конфиденциальности сторонних поставщиков услуг, используемых Приложением:
                    <br/>
                    <br/>
                    Сервисы Google Play
                    <br/>
                    Поставщик услуг может раскрывать предоставленную Пользователем и автоматически собранную информацию:
                    <br/>
                    - в соответствии с требованиями закона, например, для получения повестки в суд или аналогичного судебного процесса;
                    <br/>
                    - когда они добросовестно считают, что раскрытие информации необходимо для защиты их прав, вашей безопасности или безопасности других лиц, расследования случаев мошенничества или ответа на запрос правительства;
                    <br/>
                    - со своими доверенными поставщиками услуг, которые работают от их имени, не могут самостоятельно использовать информацию, которую мы им раскрываем, и согласились соблюдать правила, изложенные в настоящем заявлении о конфиденциальности.
                    <br/>
                    <br/>
                    Право на отказ
                    <br/>
                    Вы можете легко прекратить сбор информации Приложением, удалив его. Вы можете воспользоваться стандартными процедурами удаления, которые могут быть доступны на вашем мобильном устройстве или через торговую площадку мобильных приложений или сеть.
                    <br/>
                    <br/>
                    Политика хранения данных
                    <br/>
                    Поставщик услуг будет хранить предоставленные Пользователем данные до тех пор, пока вы пользуетесь Приложением, и в течение разумного периода времени после этого. Если вы хотите, чтобы они удалили предоставленные пользователем данные, которые вы предоставили через Приложение, пожалуйста, свяжитесь с ними по адресу p_filonchyk@mail.ru и они ответят в разумные сроки.
                    <br/>
                    <br/>
                    Дети
                    <br/>
                    Поставщик услуг не использует Приложение для сознательного запроса данных у детей младше 18 лет или для их распространения на рынке.
                    <br/>
                    <br/>
                    Приложение не предназначено для лиц младше 18 лет. Поставщик услуг сознательно не собирает личную информацию о детях младше 18 лет, позволяющую установить их личность. В случае, если Поставщик услуг обнаружит, что ребенок младше 18 лет предоставил личную информацию, Поставщик услуг немедленно удалит ее со своих серверов. Если вы являетесь родителем или опекуном и вам известно, что ваш ребенок предоставил нам личную информацию, пожалуйста, свяжитесь с Поставщиком услуг (p_filonchyk@mail.ru), чтобы он смог предпринять необходимые действия.
                    <br/>
                    <br/>
                    Безопасность
                    <br/>
                    Поставщик услуг заботится о сохранении конфиденциальности вашей информации. Поставщик услуг обеспечивает физические, электронные и процедурные гарантии для защиты информации, которую обрабатывает и хранит Поставщик услуг.
                    <br/>
                    <br/>
                    Изменения
                    <br/>
                    Настоящая Политика конфиденциальности может время от времени обновляться по любой причине. Поставщик услуг уведомит вас о любых изменениях в Политике конфиденциальности, обновив эту страницу новой Политикой конфиденциальности. Мы рекомендуем вам регулярно просматривать эту Политику конфиденциальности на предмет любых изменений, поскольку дальнейшее использование считается одобрением всех изменений.
                    <br/>
                    <br/>
                    Настоящая политика конфиденциальности вступает в силу с 2024-04-03 г.
                    <br/>
                    <br/>
                    Ваше согласие
                    <br/>
                    Используя Приложение, вы даете согласие на обработку вашей информации, как указано в настоящей Политике конфиденциальности в настоящее время и с внесенными нами поправками.
                    <br/>
                    <br/>
                    Связаться с нами
                    <br/>
                    Если у вас возникнут какие-либо вопросы относительно конфиденциальности при использовании Приложения или по поводу практики, пожалуйста, свяжитесь с Поставщиком услуг по электронной почте по адресу p_filonchyk@mail.ru.
                </span>
            </div>
        </div>
    )
}
