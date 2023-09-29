import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./authConext";

const NewObjectType = () => {

    const [objectName, setObjectName] = useState('');
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


    const addNewType = (e) => {
        e.preventDefault();
        var input = document.querySelector('input[type="file"]')

        var data = new FormData()
        data.append('image', input.files[0])
        data.append('name', objectName)

        console.log(data);
        fetch(process.env.REACT_APP_BASE_URL + "objectType", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            },
            body: data,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {
               alert('Uspjesno ste dodali novi tip obekta.')
            }
            )
            .catch(error => {
                console.log('error', error)
            }
            );
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={addNewType} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Dodaj novi tip objekta</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Naziv</label>
                                <input value={objectName} onChange={e => setObjectName(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group" style={{ marginTop: '10px' }}>
                                <label>Slika: </label>
                                <input type="file" name="file" className="btn btn-light"></input>
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

export default NewObjectType;