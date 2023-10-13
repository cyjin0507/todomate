import "./App.css";
import {Suspense, useState} from "react";
import {renderAtom, modalTodoId, inputAtom, schduleAtom} from './Atom.jsx'

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

function Schedule({value, date}) {
    const [inputNumber, setInputNumber] = useRecoilState(schduleAtom)
    const [render , setRender] = useRecoilState(renderAtom)
    const [modal, setModal] = useRecoilState(modalTodoId)
    const [input, setInput] = useRecoilState(inputAtom)

    const dateFormat = date.toLocaleDateString()

    function changeInputNumber(value) {
        setInputNumber(value)
    }

    function schduleRendering() {
        const scheduleList = JSON.parse(localStorage.getItem("schedule"))
        const result = []

        function clearFunc(e) {
            scheduleList[dateFormat].find(x=>x.idx == e.target.dataset.idx).clear = e.target.checked
            localStorage.setItem("schedule", JSON.stringify(scheduleList))

            setRender(!render)
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
                                    <input type="checkbox" data-idx={x.idx} onChange={(e)=>{clearFunc(e)}} defaultChecked={x.clear} />
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
            <div className="schedule-type" onClick={()=> changeInputNumber(value)}>
                <span>목표{value}</span>
                <span>+</span>
            </div>
            {schduleRendering()}
            {inputNumber == value ? Inputs(date, value, setRender, changeInputNumber) : ''}
        </div>
    </>
}

function Inputs(date, value, render, setInput) {
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

            //
            setInput(null)
        }
    }

    return <input key={0} onKeyUp={(e)=>scheduleInput(e)} placeholder="입력" autoFocus/>

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

