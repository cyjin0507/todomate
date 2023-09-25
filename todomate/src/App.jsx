import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Insert from "./Insert.jsx";
import Modal from "./Modal.jsx";
import "./App.css";

import {renderAtom, modalAtom, schduleAtom} from './Atom.jsx'

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


export default function App() {
    const [value, onChange] = useState(new Date());
    const [type, setType] = useState("todo")
    const [render , setRender] = useRecoilState(renderAtom)
    const [modal, setModal] = useRecoilState(modalAtom)
    const [count, setCount] = useRecoilState(schduleAtom)


    const scheduleList = JSON.parse(localStorage.getItem("schedule"))

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

    return <>
        <div className="container">

            <div>
                <Calendar
                    onChange={calenderFunc}
                    value={value}
                    showNeighboringMonth={false}
                    tileContent={({date}) => {
                        const formatDate = date.toLocaleDateString()

                        if(type == "todo") {
                            return todo(formatDate)
                        } else {
                            return <>test</>
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

    </>
}