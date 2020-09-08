import React, { useState } from 'react';
import Layout from '../Layout';
import styles from './Explorer.module.css';
import { Link } from 'react-router-dom';
function Explorer() {
    const [searchInput, setSearchInput] = useState('');
    const handleTextInput = e => {
        setSearchInput(e.target.value);
    }

    return (
        <Layout>
            <h2 className={styles.title}>Employee Explorer</h2>
            <div className={styles.FormWrapper}>
                <input onChange={handleTextInput} className={styles.SearchField} type="text" placeholder="eg. John Doe" autoFocus/>
                <Link style={{ 
                    pointerEvents: !searchInput ? 'none' : '' ,
                    cursor: !searchInput ? 'none' : 'pointer'
                    }} className={styles.SearchButton} to={`/overview/${searchInput}`}>Search</Link>
            </div>
        </Layout>
    )
}

export default Explorer
