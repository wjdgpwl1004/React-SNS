import React, {useState, useCallback} from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../reducers/user';
import PropTypes from 'prop-types';

const TextInput = ({value}) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string,
};

export const useInput = (initValue = null) => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, handler];
};

const Signup =  () => {

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch(signUpAction({
            id,
            password,
            nick,
        }));
    }, [password, passwordCheck, term]);


    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [passwordCheck]);

    const onChangeTerm = useCallback(() => {
        setTermError(false);
        setTerm((prevTerm) => !prevTerm);
    }, [term]);

    return (
        <>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" value={password} required type="password" onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-chk">비밀번호체크</label>
                    <br/>
                    <Input name="user-password-chk" value={passwordCheck} required type="password" onChange={onChangePasswordCheck} />
                    {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </>
    );
}

export default Signup; 