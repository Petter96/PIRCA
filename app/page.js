import { FaUser, FaLock } from 'react-icons/fa';
import "./Login.css";

export default function Home() {
  return (
    <div className='background'>
      <div className='wrapper'>
        <form>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' placeholder='Username' name="identifier" id='user'  />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='text' placeholder='Password' name="password" id='pass'  />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" /*checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}*/ />Remember me</label>  {/*Uncomment this when the app is already connect to database in AWS*/}
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" >Login</button> {/* Button type set to submit */}

          <div className="register-link">
            <p>Don't have an account?<a href="#">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
