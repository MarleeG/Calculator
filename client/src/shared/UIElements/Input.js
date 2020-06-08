import React from 'react';

import './Input.css';

const Input = props => {
    return  <input type="text" value={props.value} name="selection" ref={props.refSelectedValue} onChange={props.onChange} disabled={props.disabled ? true : false}/>
}

export default Input;