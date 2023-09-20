import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useRecoilState} from "recoil";
import {modalAtom, inputAtom} from "./Atom.jsx";

export default function Modal({idx, date}) {
    const scheduleList = JSON.parse(localStorage.getItem("schedule"))

    const [value, onChange] = useState(new Date());
    const [calender, setCalender] = useState(false)
    const [modal, setModal] = useRecoilState(modalAtom)
    const [input, setInput] = useRecoilState(inputAtom)

    function deleteFunc() {
        scheduleList[date].splice(scheduleList[date].indexOf(scheduleList[date].find(x=>x.idx==idx)), 1)
        localStorage.setItem("schedule", JSON.stringify(scheduleList))
        setModal()
    }

    function todaySet() {
        const today = new Date().toLocaleDateString()
        const changeData = scheduleList[date].find(x=>x.idx==idx)

        scheduleList[date].splice(scheduleList[date].indexOf(changeData), 1)
        if(scheduleList[today]) {
            scheduleList[today].push(changeData)
        } else {
            scheduleList[today] = [
                changeData
            ]
        }
        localStorage.setItem("schedule", JSON.stringify(scheduleList))
        setModal()
    }

    function dayChange() {
        setCalender(true)
    }

    function dayChageFunc() {
        const chageDate = value.toLocaleDateString()
        const changeData = scheduleList[date].find(x=>x.idx==idx)

        scheduleList[date].splice(scheduleList[date].indexOf(changeData), 1)
        if(scheduleList[chageDate]) {
            scheduleList[chageDate].push(changeData)
        } else {
            scheduleList[chageDate] = [
                changeData
            ]
        }

        localStorage.setItem("schedule", JSON.stringify(scheduleList))
        setModal()
    }

    const ModalDOM = <>
        <div className="modal-top">
            <div onClick={()=> {
                setInput(idx)
                setModal()
            }}><span>수정하기</span></div>
            <div onClick={()=>deleteFunc()}><span>삭제하기</span></div>
        </div>
        <div className="modal-bottom">
            <div>
                <span></span>
                <div>메모</div>
            </div>
            <div onClick={()=> todaySet()}>
                <span></span>
                <div>오늘하기</div>
            </div>
            <div onClick={() => dayChange()}>
                <span></span>
                <div>날짜 바꾸기</div>
            </div>
        </div>
    </>


    const CanlenderDOM = <div className="modal-calender">
        <div>
            <div className="date-change-btn" onClick={()=>dayChageFunc()}>확인</div>
        </div>
        <Calendar
            onChange={onChange}
            value={value}
            showNeighboringMonth={false}
        />
    </div>

    const MemoDom = <div className="memo-area">

    </div>

    return <>
        <div className="modal">
            <div className="modal-closer" onClick={()=>setModal()}></div>
            <div className="modal-inner">
                {calender ? CanlenderDOM : ModalDOM}
            </div>
        </div>
    </>
}