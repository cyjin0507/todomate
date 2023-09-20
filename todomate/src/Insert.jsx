import "./App.css";
import {Suspense, useState} from "react";
import {renderAtom, modalAtom, inputAtom} from './Atom.jsx'

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

function Schedule({value, date}) {
    const [count, setCount] = useState(0)
    const [render , setRender] = useRecoilState(renderAtom)
    const [modal, setModal] = useRecoilState(modalAtom)
    const [input, setInput] = useRecoilState(inputAtom)

    const dateFormat = date.toLocaleDateString()

    const [insert, setInsert] = useState(false)

    function increse() {
        setCount(count+1)
    }

    function inputRendering() {
        const result = []
        for (let i = 0; i < count; i++) {
            result.push(Inputs(i, date, value, setRender))
        }
        return result
    }

    function schduleRendering() {
        const scheduleList = JSON.parse(localStorage.getItem("schedule"))
        const result = []

        function clearFunc(e) {
            scheduleList[dateFormat].find(x=>x.idx == e.target.dataset.idx).clear = e.target.checked
            localStorage.setItem("schedule", JSON.stringify(scheduleList))
            setRender(true)
        }

        if(scheduleList[dateFormat] !== undefined) {
            scheduleList[dateFormat].forEach((x,i)=> {
                if(x.type === value) {
                    if(input == x.idx) {
                        result.push(
                            <Modify key={i} value={x.schedule} date={dateFormat} idx={input} render={setInput}></Modify>
                        )
                    } else {
                        result.push(
                            <div className="schedule-view" key={i}>
                                <div>
                                    <input type="checkbox" data-idx={x.idx} onChange={(e)=>clearFunc(e)} checked={x.clear} />
                                    <span>{x.schedule}</span>
                                </div>
                                <div className="schedule-icon" onClick={()=>setModal(x.idx)}>
                                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1
                                    0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s
                                    .9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    }
                }
            })
        }
        return result
    }

    return <>
        <div className="schedule" key={value}>
            <div className="schedule-type" onClick={()=> increse()}>
                <span>목표{value}</span>
                <span>+</span>
            </div>
            {schduleRendering()}
            {inputRendering()}
        </div>
    </>
}

function Inputs(i, date, value, render) {
    function scheduleInput(e) {
        if(window.event.keyCode === 13) {
            const text = e.target.value
            const data = JSON.parse(localStorage.getItem("schedule"))
            const formatDate = date.toLocaleDateString()
            if(data[formatDate] === undefined) {
                data[formatDate] = [
                    {
                        idx : Math.floor(Math.random() * 100000000),
                        type : value,
                        schedule : text,
                        clear : false,
                        memo : ''
                    }
                ]
            } else {
                data[formatDate].push({
                    idx : Math.floor(Math.random() * 100000000),
                    type : value,
                    schedule : text,
                    clear : false,
                    memo : ''
                })
            }

            localStorage.setItem("schedule", JSON.stringify(data))
            render(true)
        }
    }

    return <input key={i} onKeyUp={(e)=>scheduleInput(e)} placeholder="입력" autoFocus/>

}

function Modify({i, value, date, idx, render}) {
    function scheduleModify(e) {
        if (window.event.keyCode === 13) {
            const text = e.target.value
            const data = JSON.parse(localStorage.getItem("schedule"))
            data[date].find(x=>x.idx==idx).schedule = text
            localStorage.setItem("schedule", JSON.stringify(data))
            render(null)
        }
    }
    return <input key={i} defaultValue={value} onKeyUp={(e)=>scheduleModify(e)} autoFocus />
}

export default function Insert({date}) {
    return <>
        <Schedule value="1" date={date} />
        <Schedule value="2" date={date} />
        <Schedule value="3" date={date} />
    </>
}

