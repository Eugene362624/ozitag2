import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './App.scss'
import { IconButton } from '@material-ui/core';

function App() {
    const [loading, setLoading] = useState(true)
    const [inputClick, setInputClick] = useState(false)
    const [selected, setSelected] = useState([])

    const selectHandler = (arr) => {
        let selectedArray = []
        for (let i = 0; i < arr.length; i++) {
            selectedArray.push({ name: `${arr[i].innerText}`, value: arr[i].value })
        }
        setSelected(selectedArray)
    }

    const applySelected = () => {
        console.log(selected)
        setInputClick(false)
    }

    useEffect(() => {
        if (inputClick == true) {
            const select = document.getElementById("select")
            const kids = [...select.children]
            for (let i = 0; i < kids.length; i++) {
                selected.forEach((el) => kids[i].value == el.value ? kids[i].setAttribute('selected', 'selected') : '')
            }
        }

    }, [inputClick])

    useEffect(() => {
        if (inputClick == true) {
            setLoading(true)
            const select = document.getElementById("select")
            const kids = [...select.children]
            for (let i = 0; i < kids.length; ++i) {
                if (kids[i].hasAttribute('data-level') == false) {
                    kids[i].setAttribute('data-level', '1')
                }
                const next = 1 + i >= kids.length ? i : 1 + i
                // if (!kids[i].dataset.level) {
                //     kids[i].setAttribute
                // }
                // console.log(kids[i].dataset.level)
                if (kids[i].dataset.level < kids[next].dataset.level) {
                    kids[i].classList.add('arrow')
                }

            }
            for (let kid of kids) {
                if (kid.dataset.level > 1) {
                    kid.style.paddingLeft = `${kid.dataset.level * 20}px`
                }
            }

            const filteredKids = kids.filter(children => children.dataset.level > 1)
            filteredKids.forEach(e => e.setAttribute("hidden", "hidden"));

            [].forEach.call(document.getElementsByClassName('arrow'), (e) => {
                e.addEventListener('click', () => {
                    e.classList.contains('isOpen') ? e.classList.remove('isOpen') : e.classList.add('isOpen')
                    if (e.classList.contains('isOpen')) openChild(e.value - 9)
                    else closeChild(e.value - 9)
                })
            });

            const closeChild = (id) => {
                for (let i = id; i < kids.length; i++) {
                    if (kids[i].dataset.level > 1) {
                        kids[i].setAttribute('hidden', 'hidden')
                        kids[i].classList.remove('isOpen')
                    }
                }

            }

            const openChild = (id) => {
                let i = id
                console.log(i)
                if (kids[i+1]) {
                    console.log('ok', i)
                    if (kids[i].dataset.level <= kids[i+1].dataset.level) {
                    console.log('ok', i)
                    for (i; i < kids.length; i++) {
                            kids[i].removeAttribute('hidden')
                            if (kids[i].classList.contains('arrow')) kids[i-1].classList.add('isOpen')
                        if (kids[i+1] && kids[i+1].dataset.level > kids[i].dataset.level) break
                        if (kids[i].dataset.level == 1) break
                    }
                    }
                }
            }
            setTimeout(() => setLoading(false), 1000)
        }

    }, [inputClick])



    return (
        <div className="wrap">
            <header>
                <div style={{ display: 'flex', alignItems: 'center' }} className="upper-header-part">
                    <span style={{ display: 'flex', alignItems: 'center' }}>{inputClick ? <IconButton onClick={() => { setInputClick(false); setSelected([]); let select = document.getElementById("select"); let kids = [...select.children]; kids.forEach(e => e.selected = e.defaultSelected) }}><ArrowBackIcon /></IconButton> : ''} Реализуемые товары</span>
                    <span>{inputClick ? `Выбраное (${selected.length})` : ''}</span>
                </div>
                <div className="bottom-header-part">
                    {!inputClick ?
                        <input type="text" onClick={() => setInputClick(true)} style={selected.length ? { borderLeft: '2px solid blue' } : {}} placeholder={selected.length ? selected.map(e => e.name) : 'Код ТНВЭД или наименование товаров/услуг'} />
                        :
                        <input type="text" placeholder="Введите код ТНВЭД или наименование товаров/услуг" />
                    }
                </div>
            </header>
            {inputClick ?
                <>
                    <main>
                        {loading ?
                            <div style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 110px)', background: 'white', zIndex: '10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Загрузка...</div> : ''}
                        <div style={{ visability: 'false' }} className="content">
                            <select onChange={(e) => selectHandler(e.target.selectedOptions)} name="tnved" id="select" multiple="multiple">
                                <option value="10">[A] - Продукция сельского хозяйства, лесного хозяйства, рыбоводства и рыболовства</option>
                                <option value="11">[O] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="12" data-level='2'>[84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="13" data-level='3'>[84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере</option>
                                <option value="14" data-level='4'>[84.11] - Услуги в области государственного управления общего характера</option>
                                <option value="15" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="16" data-level='6'>[84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти</option>
                                <option value="17" data-level='6'>[84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня</option>
                                <option value="18" data-level='6'>[84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня</option>
                                <option value="19" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="20">[A] - Продукция сельского хозяйства, лесного хозяйства, рыбоводства и рыболовства</option>
                                <option value="21">[O] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="22" data-level='2'>[84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="23" data-level='3'>[84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере</option>
                                <option value="24" data-level='4'>[84.11] - Услуги в области государственного управления общего характера</option>
                                <option value="25" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="26" data-level='6'>[84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти</option>
                                <option value="27" data-level='6'>[84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня</option>
                                <option value="28" data-level='6'>[84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня</option>
                                <option value="29" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="30">[A] - Продукция сельского хозяйства, лесного хозяйства, рыбоводства и рыболовства</option>
                                <option value="31">[O] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="32" data-level='2'>[84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="33" data-level='3'>[84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере</option>
                                <option value="34" data-level='4'>[84.11] - Услуги в области государственного управления общего характера</option>
                                <option value="35" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="36" data-level='6'>[84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти</option>
                                <option value="37" data-level='6'>[84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня</option>
                                <option value="38" data-level='6'>[84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня</option>
                                <option value="39" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="40">[A] - Продукция сельского хозяйства, лесного хозяйства, рыбоводства и рыболовства</option>
                                <option value="41">[O] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="42" data-level='2'>[84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию</option>
                                <option value="43" data-level='3'>[84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере</option>
                                <option value="44" data-level='4'>[84.11] - Услуги в области государственного управления общего характера</option>
                                <option value="45" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                                <option value="46" data-level='6'>[84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти</option>
                                <option value="47" data-level='6'>[84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня</option>
                                <option value="48" data-level='6'>[84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня</option>
                                <option value="49" data-level='5'>[84.11.11] - Услуги в области исполнительной и законодательной деятельности</option>
                            </select>
                        </div>
                    </main>
                    <footer>
                        <button onClick={() => applySelected()} id="apply">Применить</button>
                        <button onClick={() => { setSelected([]); let select = document.getElementById("select"); let kids = [...select.children]; kids.forEach(e => e.selected = e.defaultSelected) }} id="reset">Очистить</button>
                    </footer>
                </>
                : ''}
        </div>
    )
}

export default App
