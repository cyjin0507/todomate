import {useRecoilState} from "recoil";
import {diaryAtom} from "./Atom.jsx";

export default function Diary() {
    const [diary, setDiary] = useRecoilState(diaryAtom)
    function diaryClose() {
        setDiary(null)
    }
    
    return <div className="diary">
        <div className="diary-header">
            <div onClick={()=>diaryClose()}>x</div>
            <div>일기</div>
            <div>완료</div>
        </div>
        <div className="diary-user-info">
            <h5>사용자</h5>
            <p>{diary.toLocaleDateString()}</p>
        </div>
        <textarea placeholder="사용자님의 하루는 어떠셨나요" autoFocus></textarea>
    </div>
}