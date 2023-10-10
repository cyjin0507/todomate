import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useRecoilState} from "recoil";
import {modalAtom, inputAtom} from "./Atom.jsx";

export default function Modal({idx, date}) {
    const scheduleList = JSON.parse(localStorage.getItem("schedule"))

    const [value, onChange] = useState(new Date())
    const [calender, setCalender] = useState(false)
    const [modal, setModal] = useRecoilState(modalAtom)
    const [input, setInput] = useRecoilState(inputAtom)
    const [memo, setMemo] = useState(false)

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

    function memoOn(memo=false) {
        setMemo(memo)
    }

    function modalInsert() {
        const textarea = document.querySelector('textarea').value
        scheduleList[date].find(x=>x.idx==idx).memo = textarea
        localStorage.setItem("schedule", JSON.stringify(scheduleList))
        setModal()
    }

    function modalChange(bool) {
        const textarea = document.querySelector('textarea').value
        let val = bool ? textarea : ""
        scheduleList[date].find(x=>x.idx==idx).memo = val
        localStorage.setItem("schedule", JSON.stringify(scheduleList))
        setModal()
    }

    function ModalDOM() {
        const memoText = scheduleList[date].find(x=>x.idx==idx).memo
        const memoView = memoText=="" ? null : <div className="memo-view" onClick={()=>memoOn(memoText)}>
            {memoText}
        </div>

        return <>
            <div className="modal-top">
                <div onClick={()=> {
                    setInput(idx)
                    setModal()
                }}><span>수정하기</span></div>
                <div onClick={()=>deleteFunc()}><span>삭제하기</span></div>
            </div>
            <div className="modal-bottom">
                <div onClick={()=> memoOn(true)}>
                    <span></span>
                    <div>메모</div>
                </div>
                {memoView}
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
    }


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

    function MemoDom() {
        const modalButton = memo!=true ?
            <div>
                <div onClick={()=> modalChange(true)}>수정</div>
                <div onClick={()=> modalChange(false)}>삭제</div>
            </div> :
            <div>
                <div onClick={()=> modalInsert()}>확인</div>
            </div>

        return <div className="memo-calender">
            <div>
                <h5>{scheduleList[date].find(x=>x.idx==idx).schedule}</h5>
                {modalButton}
            </div>
            <textarea placeholder="할일의 메모를 입력해주세요." defaultValue={memo==true ? '' : memo}></textarea>
        </div>
    }

    return <>
        <div className="modal">
            <div className="modal-closer" onClick={()=>setModal()}></div>
            <div className="modal-inner">
                {calender ? CanlenderDOM : (memo ? MemoDom() : ModalDOM())}
            </div>
        </div>
    </>
}