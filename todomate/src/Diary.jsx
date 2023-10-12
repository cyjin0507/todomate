import {useRecoilState} from "recoil";
import {selectedDiary, renderAtom} from "./Atom.jsx";
import {faFaceSmileBeam, faFaceSadCry, faSmile, faCny} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import EmojiPicker from 'emoji-picker-react';
import { func } from "prop-types";

export default function Diary() {
    const [diary, setDiary] = useRecoilState(selectedDiary)

    const [render , setRender] = useRecoilState(renderAtom)
    const [emoji, setEmogi] = useState(null)
    const [modal, setModal] = useState(null)
    const [modify, setModify] = useState(null)

    const diaryList = JSON.parse(localStorage.getItem("diary"))
    const findList = diaryList[diary.toLocaleDateString()]

    function diaryClose() {
        setDiary(null)
    }


    function diarySet() {
        let text = document.querySelector('.diary-textarea').value
        let date = diary.toLocaleDateString()

        if(text == "") {
            alert("할일을 입력해주세요")
            return
        }
        if(emoji == null && findList == undefined) {
            alert("이모지를 선택해주세요")
            return
        }

        if(diaryList[date]==undefined) {
            diaryList[date] = [
                {
                    idx : Math.floor(Math.random() * 100000000),
                    state : emoji ? emoji : findList[0].state,
                    text : text
                }
            ]
        } else {
            diaryList[date][0].text = text
            diaryList[date][0].state = emoji ? emoji : findList[0].state
        }
        localStorage.setItem("diary", JSON.stringify(diaryList))
        setDiary(null)
        setRender(true)
    }

    function diaryDelete() {
        let date = diary.toLocaleDateString()
        Reflect.deleteProperty(diaryList, date)
        localStorage.setItem("diary", JSON.stringify(diaryList))
        setDiary(null)
        setRender(true)
    }

    function emogiFunc(emojiData) {
        setEmogi(emojiData.emoji)
    }

    function openModal() {
        setModal(1)
    }

    function closeModal() {
        setModal(null)
    }

    function diaryModify() {
        setModify(1)
    }

    return findList && modify==null ? 
    <div className="modal">
        <div className="modal-closer" onClick={()=>diaryClose()}></div>
        <div className="modal-inner">
            <div className="diary-modal">
                <div>
                    <p>일기</p>
                    <div>
                        <div onClick={()=> diaryModify()}>수정</div>
                        <div className="red" onClick={()=> diaryDelete()}>삭제</div>
                    </div>
                </div>
                <div>{findList[0].state}</div>
                <div>{diary.toLocaleDateString()}</div>
                <div>{findList[0].text}</div>
            </div>
        </div>
    </div>
    : 
    <div>
    <div className="diary">
        <div className="diary-header">
            <div onClick={()=>diaryClose()}>x</div>
            <div>일기</div>
            <div onClick={()=> diarySet()}>완료</div>
        </div>
        <div className="diary-state" onClick={()=>openModal()}>
            <div>{emoji ? emoji : (findList ? findList[0].state : '+')}</div>
        </div>
        <div className="diary-user-info">
            <h5>사용자</h5>
            <p>{diary.toLocaleDateString()}</p>
        </div>
        <textarea className="diary-textarea" placeholder="사용자님의 하루는 어떠셨나요" autoFocus defaultValue={findList ? findList[0].text : ''}></textarea>
    </div>

    {
        modal ? <div className="modal">
        <div className="modal-closer" onClick={()=>closeModal()}></div>
        <div className="modal-inner">
            <EmojiPicker 
                onEmojiClick={emogiFunc}
                width={500}
            />
        </div>
    </div> : null
    }

</div>    
}