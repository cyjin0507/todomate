import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Insert from "./Insert.jsx";
import Modal from "./Modal.jsx";
import "./App.css";


import {renderAtom, modalAtom, schduleAtom, diaryAtom} from './Atom.jsx'

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import Diary from "./Diary.jsx";

import {faFaceSadCry, faFaceSmileBeam, faSmile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default function App() {
    const [value, onChange] = useState(new Date());
    const [type, setType] = useState("todo")
    const [render , setRender] = useRecoilState(renderAtom)
    const [modal, setModal] = useRecoilState(modalAtom)
    const [count, setCount] = useRecoilState(schduleAtom)
    const [diary, setDiary] = useRecoilState(diaryAtom)


    const scheduleList = JSON.parse(localStorage.getItem("schedule"))
    const diaryList = JSON.parse(localStorage.getItem("diary"))

    function todo(formatDate) {
        if(scheduleList[formatDate] && scheduleList[formatDate].length != 0) {
            if(scheduleList[formatDate].find(x=>x.clear)) {
                return (<div className="flex justify-center items-center absoluteDiv clear count"><div>{scheduleList[formatDate].filter(x=>x.clear).length}</div></div>);
            } else {
                return (<div className="flex justify-center items-center absoluteDiv active count"><div>{scheduleList[formatDate].length}</div></div>);
            }
        } else {
            return (<div className="flex justify-center items-center absoluteDiv count"><div>0</div></div>);
        }
    }

    function typeChange(type) {
        setType(type)
    }

    function calenderFunc(date) {
        onChange(date)
        setCount(0)
    }

    function diaryFunc(date) {
        if(new Date() >= date) {
            setDiary(date)
        } else {
            alert("미래의 일기는 작성할 수 없습니다.")
        }
        
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])$/
    }

    return <>
        <div className="container">

            <div>
                <Calendar
                    onChange={type=="todo" ? calenderFunc : diaryFunc}
                    value={value}
                    showNeighboringMonth={false}
                    tileContent={({date}) => {
                        const formatDate = date.toLocaleDateString()

                        if(type == "todo") {
                            return todo(formatDate)
                        } else {
                            if(new Date() >= date) {
                                if(diaryList[formatDate] != undefined) {
                                    let find = diaryList[formatDate][0].state
                                    return <div className="imogi">{find}</div>
                                } else {
                                    return <div><FontAwesomeIcon icon={faSmile}/></div>
                                }
                            }
                        }
                    }}
                />

                <div className="tabs">
                    <div className={`tab ${type == "todo" ? 'active' : ''}`} onClick={()=>typeChange("todo")}><span>⦁</span>할일</div>
                    <div className={`tab ${type == "diary" ? 'active' : ''}`}  onClick={()=>typeChange("diary")}><span>⦁</span>일기</div>
                </div>

            </div>

            <div className="schedule-list">
                <Insert date={value} />
            </div>

        </div>

        {modal ? <Modal idx={modal} date={value.toLocaleDateString()} /> : null}

        {diary ? <Diary/> : null}
    </>
}