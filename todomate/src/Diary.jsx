import {useRecoilState} from "recoil";
import {diaryAtom, renderAtom} from "./Atom.jsx";
import {faFaceSmileBeam, faFaceSadCry, faSmile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export default function Diary() {
    const [diary, setDiary] = useRecoilState(diaryAtom)
    const [state, setState] = useState(1)
    const [render , setRender] = useRecoilState(renderAtom)

    const diaryList = JSON.parse(localStorage.getItem("diary"))

    function diaryClose() {
        setDiary(null)
    }

    function stateChange(idx) {
        setState(idx)
    }

    function diarySet() {
        let text = document.querySelector('.diary-textarea').value
        let date = diary.toLocaleDateString()
        if(diaryList[date]==undefined) {
            diaryList[date] = [
                {
                    idx : Math.floor(Math.random() * 100000000),
                    state : state,
                    text : text
                }
            ]
        }
        localStorage.setItem("diary", JSON.stringify(diaryList))
        setDiary(null)
        setRender(true)
    }

    return <div className="diary">
        <div className="diary-header">
            <div onClick={()=>diaryClose()}>x</div>
            <div>일기</div>
            <div onClick={()=> diarySet()}>완료</div>
        </div>
        <div className="diary-state">
            <div className={state==1 ? 'active' : ''} onClick={()=>stateChange(1)}><FontAwesomeIcon icon={faFaceSmileBeam} /></div>
            <div className={state==2 ? 'active' : ''} onClick={()=>stateChange(2)}><FontAwesomeIcon icon={faFaceSadCry} /></div>
        </div>
        <div className="diary-user-info">
            <h5>사용자</h5>
            <p>{diary.toLocaleDateString()}</p>
        </div>
        <textarea className="diary-textarea" placeholder="사용자님의 하루는 어떠셨나요" autoFocus></textarea>
    </div>
}