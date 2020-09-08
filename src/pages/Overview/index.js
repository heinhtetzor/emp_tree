import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import styles from './Overview.module.css';

function Overview() {
    const { searchInput } = useParams();
    const [subList, setSubList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiCall = async(query) => {
        let res = await fetch(`http://api.additivasia.io/api/v1/assignment/employees/${query}`);
        if(res.status === 404) {
            //error code 0 for 404 not found
            setError(0);
            return null;
        }
        let resJson = await res.json();
        let subObj = resJson[1];
        
        if(subObj) {
            return subObj['direct-subordinates'];
        }
        else {
            return null;
        }
      }
    const searchTree = async(searchInput) => {
        let subOrdinates = await apiCall(searchInput);
        if(!subOrdinates) {
            return null;
          }
        let stack = [subOrdinates][0];
        let result = [...new Set(stack)];
        while(stack.length > 0) {
          const first = stack.shift();
          const subsOfFirst = await apiCall(first);
          if(subsOfFirst) {
            result.push(...new Set(subsOfFirst));
          }
        }
        return result;
      }
      useEffect(() => {
          searchTree(searchInput).then(res => {
              setLoading(false);
              if(res) {
                  setSubList(res);
                }
                else {
                    //error code 1 for no direct sub
                    setError(1);
                    setSubList([]);
                }
            })
    }, [])
    return(
        <Layout>
            <div>
                <h2 className={styles.title}>Employee Overview</h2>

                {
                    loading ? 
                    <p>Loading</p>
                    :
                   
                    (error === null) ?
                        <React.Fragment>
                            <h4>Subordinates of employee "<i>{searchInput}</i>":</h4>
                            <ul>
                            {
                                subList.map((emp, i) => {
                                    return (
                                    <li key={i}>{emp}</li>
                                    )
                                })
                            } 
                            </ul>
                        </React.Fragment>
                        :
                        (error === 0) ? 
                        <p>Employee Not Found</p> :
                    
                        <p>This employee has no direct sub-ordinates</p> 
                }
                
            </div>
        </Layout>
    )
}
export default Overview;