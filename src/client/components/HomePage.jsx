import React, { useState,useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [actions, setActions] = useState([]);
    const [text, setText] = useState('');
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('/action/actions').then((res) => {
            console.log('res: ', res)
            setActions((actions) => [...actions, ...res.data])
        })
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/action/create', { text }).then(() => {
            axios.get('/action/actions').then((res) => {
                setActions((actions) => [...actions, res.data[res.data.length - 1]])
            })
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        axios.delete(`/action/${e.target.getAttribute('actionid')}/`).then((res) => {
            let newActions = [];
            for(let i = 0; i < actions.length; i++) {
                if (actions[i].id != res.data) {
                    newActions.push(actions[i]);
                }
            }
            setActions(newActions);
        })
    }

    const handleComplete = (e) => {
        e.preventDefault();

        let idx = e.target.getAttribute("actioncontainerid");
        console.log('idx: ', idx)

        let actionContainer = document.getElementById("actionContainer" + idx);
        let numberCompleted = parseInt(actionContainer.getAttribute("completed"));
        actionContainer.setAttribute("completed", numberCompleted + 1);

        let newRecord = {
            containerId: idx,
        };

        let newBlueValue = Math.random() * 255;
        let newRedValue = Math.random() * 255;
        let newGreenValue = Math.random() * 255;

        newRecord.backgroundColor = { backgroundColor: `rgb(${newRedValue}, ${newGreenValue}, ${newBlueValue})`};
        setRecords((records) => [...records, newRecord]);
    }

    const handlePick = (e) => {
        e.preventDefault();

        let idx = Math.floor(Math.random() * actions.length);

        let answer = confirm(actions[idx].text);

        if(answer) {
            let actionContainer = document.getElementById("actionContainer" + idx);
            let numberCompleted = parseInt(actionContainer.getAttribute("completed"));
            actionContainer.setAttribute("completed", numberCompleted + 1);

            let newRecord = {
                containerId: idx,
            };

            let newBlueValue = Math.random() * 255;
            let newRedValue = Math.random() * 255;
            let newGreenValue = Math.random() * 255;

            newRecord.backgroundColor = { backgroundColor: `rgb(${newRedValue}, ${newGreenValue}, ${newBlueValue})`};
            setRecords((records) => [...records, newRecord]);
        }
    }


    return (
        <div className="homeContainer">
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="newActionForm">
                    <div className="inputContainer">
                        <label className="newActionLabel">Submit your new action: </label>
                        <input className="newActionInput" type="text" onChange={(e) => setText(e.target.value)}></input>
                        <button type="submit">Submit</button>
                        <button onClick={handlePick}>Pick for me!</button>
                    </div>
                </form>
            </div>
            <div className="actionsContainer">
            {actions ? (
            actions.map(function(action, idx) {
                let actionContainerIdName = "actionContainer" + idx;
                let recordContainerIdName = "recordContainer" + idx;
                return (
                    <div key={action.id} completed="0" className="actionContainer" id={actionContainerIdName}>
                        <span className="actionSpan">
                            {action.playerName}: {action.text}
                        </span>
                    <div className="recordContainer" id={recordContainerIdName}>
                        {
                            records ? records.map(function(record, id) {
                                if(record.containerId == idx) {
                                    return (
                                        <div className="newRecord" style={record.backgroundColor} key={id}>
                                        </div>
                                    )
                                }
                            }) : (
                                <span></span>
                            )
                        }
                    </div>
                    <div className="buttonContainer">
                        <button actioncontainerid={idx} onClick={handleComplete} className="actionCompleteButton">Did it!</button>
                        <button actionid={action.id} onClick={handleDelete} className="actionDeleteButton">X</button>
                    </div>
                    </div>
                )
            })
          ) : (
            <Text>No actions yet :(</Text>
          )}
            </div>
        </div>
    )
}

export default HomePage;

// const mapStateToProps = ({
//     user, game, session,
//   }) => ({
//     user, game, session,
//   });
  
//   const mapDispatchToProps = (dispatch) => ({
//     setSession: () => dispatch(setSessionThunk()),
//     updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);