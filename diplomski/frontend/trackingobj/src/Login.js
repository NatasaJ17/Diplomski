import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./authConext";

const Login = () => {

    const [email, emailUpdate] = useState('');
    const [password, passwordUpdate] = useState('');
    const {logged, setLogged, role, setRole } = useContext(authContext);

    const navigate = useNavigate();

    const ProceedLogin = async (e) => {
        e.preventDefault();
        if (validate()) {

            let inputobj = {
                "email": email,
                "password": password
            };
            await fetch(process.env.REACT_APP_BASE_URL +"login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                console.log(res)
                if (res.status == 200) {
                    setLogged(true);   
                }
                if (res.status == 401) {
                    alert("Pogresan email ili lozinka.")
                }
                return res.json();
            }).then((resp) => {
                if(resp.token != null || resp.token != undefined){
                    console.log(resp)
                    setLogged(true);
                    console.log(logged)
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('role', resp.user.role);
                    setRole(resp.user.role);
                    navigate('/dashboard');
                }
            }).catch((err) => {
                alert('Doslo je do greske prilikom prijavljivanja: ' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            alert('Molimo vas da unesete e-mail adresu.');
        }
        if (password === '' || password === null) {
            result = false;
            alert('Molimo vas da unesete lozinku.');
        }
        return result;
    }

    const checkLogin = () =>{
        if(localStorage.getItem('token')){
            setLogged(true);
            navigate('/dashboard');
        }
    }
    useEffect(()=>{
        checkLogin();
    }, []);

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Prijava korisnika</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>E-mail adresa<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => emailUpdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Lozinka <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordUpdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="createButtons" style={{ margin: "3px" }}>Prijavi se</button>
                            <button className="createButtons" onClick={() => navigate('/register')} type="button">Registruj se</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login;