import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./authConext";
const NewObject = () => {

    const [objectName, setObjectName] = useState('');
    const [objectType, setObjectType] = useState('');
    const [objectId, setObjectId] = useState('');
    const [objectDescription, setObjectDescription] = useState('');
    const [objectOwner, setObjectOwner] = useState('');
    const [objectTypes, setObjectTypes] = useState([]);
    const [users, setUsers] = useState([]);

    const { logged, setLogged, role, setRole } = useContext(authContext);
    const navigate = useNavigate();
    const checkLogin = () => {
        if (!localStorage.getItem('token')) {
            setLogged(false);
            navigate('/');
        }
    }
    useEffect(() => {
        checkLogin();
    }, []);


    //get object types
    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + "objectTypes", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            if (Object.keys(resp).length === 0) {
                alert('Doslo je do greske.');
            } else {
                setObjectTypes(resp);
            }
        }).catch((err) => {
        });

    }, []);

    //get users
    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + "users", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            if (Object.keys(resp).length === 0) {
                alert('Doslo je do greske.');
            } else {
                setUsers(resp.users);
            }
        }).catch((err) => {

        });

    }, []);


    let inputobj = {
        "name": objectName,
        "description": objectDescription,
        "objectId": objectId,
        "object_type": objectType,
        "userId": objectOwner
    };
    const addNewObject = (e) => {
        e.preventDefault();
        console.log(inputobj)
        fetch(process.env.REACT_APP_BASE_URL + "object", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/json',
                'enctype': 'multipart/form-data'
            },
            body: JSON.stringify(inputobj)
        }).then(response => response.text())
            .then(result => {
                alert('Uspjesno ste unijeli objekat.');
            }
            )
            .catch(error => {
                console.log('error', error)
            }
            );
    };


    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form className="container" onSubmit={addNewObject}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Dodaj novi tip objekta</h2>
                        </div>
                        <div className="card-body" style={{ marginTop: '10px' }}>
                            <div className="form-group">
                                <label>Ime objekta: </label>
                                <input value={objectName} onChange={e => setObjectName(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group" style={{ marginTop: '10px' }}>
                                <label>Id objekta: </label>
                                <input value={objectId} onChange={e => setObjectId(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group" style={{ marginTop: '10px' }}>
                                <label>Opis objekta: </label>
                                <input value={objectDescription} onChange={e => setObjectDescription(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group" style={{ marginTop: '10px' }}>
                                <label>Tip objekta:</label>
                                <select className="form-control" onChange={(e) => { setObjectType(e.target.value) }}>
                                    <option>Izaberite tip objekta...</option>
                                    {
                                        objectTypes?.map(option => option.map(el => <option key={el.id} value={el.id}>{el.name}</option>))
                                    }
                                </select>
                            </div>
                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <label>Vlasnik objekta:</label>
                                <select className="form-control" onChange={(e) => { console.log(e.target.value); setObjectOwner(e.target.value) }}>
                                    <option>Izaberite vlasnika objekta...</option>
                                    {
                                        users?.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="card-footer" style={{ marginTop: '10px' }}>
                                <button type="submit" className="createButtons">Dodaj</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NewObject;