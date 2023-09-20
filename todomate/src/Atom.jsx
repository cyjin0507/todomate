import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


// 화면 랜더링
export const renderAtom = atom({
    key: 'render', // unique ID (다른 atoms/selectors을 구별하기 위해서)
    default: false, // default value (aka initial value)
});

// 모달 띄워졌는지 체크
export const modalAtom = atom({
    key : 'modal',
    default : null
})

// 모달에서 수정하기 눌렀을 때
export const inputAtom = atom({
    key : 'input',
    default : null
})