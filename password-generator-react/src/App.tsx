import React, { useEffect, useState } from 'react';
import s from './App.module.scss';

const charactersLower = "abcdefghijklmnopqrstuvwxyz";
const charactersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersNumbers = "0123456789";
const charactersSymbols = "!@#$%^&*()_+-=[]{}|;':,.<>?/";

function secureRandom() {
    var buf = new Uint32Array(2);
    crypto.getRandomValues(buf);
    return (buf[0] + buf[1] * 2**32) / (2 ** 64);
}

function generatePassword(length: number, includeSymbols: boolean) {
    const charset = charactersLower + charactersUpper + charactersNumbers + (includeSymbols ? charactersSymbols : "");
    let newPassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(secureRandom() * charset.length);
        newPassword += charset[randomIndex];
    }
    return newPassword;
}

function App() {
    const [password, setPassword] = useState<string | undefined>();
    const [length, setLength] = useState(20);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    function copyPassword() {
        if (!password) return;
        navigator.clipboard.writeText(password).catch(err => {
            console.error('Error in copying text: ', err);
        });
    }

    useEffect(() => {
        setPassword(generatePassword(length, includeSymbols));
    }, [includeSymbols, length]);

    return <div className={s.container}>
        <div className={s.spacer}></div>

        <div className={s.card}>
            <div className={s.header}>Password Generator</div>
            <div className={s.line}>
                <label htmlFor="length">Password Length:</label>
                <input
                    type="range"
                    id="length"
                    name="length"
                    min="8"
                    max="64"
                    value={length}
                    onChange={e => {
                        e.preventDefault();
                        setLength(Number(e.target.value));
                    }}
                />
                <span id="lengthDisplay">{length}</span>
            </div>
            <label>
                <input
                    type="checkbox"
                    id="includeSymbols"
                    onChange={e => {
                        e.preventDefault();
                        setIncludeSymbols(e.target.checked);
                    }}
                    checked={includeSymbols}
                /> Include Symbols</label>

            <code>{password}</code>

            <div className={s.buttons}>
                <button onClick={() => setPassword(generatePassword(length, includeSymbols))}>
                    <div className={s.content}>
                        <div>⟳</div>
                        <div>Refresh</div>
                    </div>
                </button>
                <button onClick={() => copyPassword()}>
                    <div className={s.content}>
                        <div>⎘</div>
                        <div>Copy</div>
                    </div>
                </button>
            </div>
        </div>
    </div>
}

export default App;
