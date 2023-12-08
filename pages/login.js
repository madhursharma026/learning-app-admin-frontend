import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TeacherLogin, TeacherLoginOTP } from './graphqlAPI';

function Login() {
  const router = useRouter();
  const [otpValue, setOtpValue] = useState('');
  const [Teacher_Login] = useMutation(TeacherLogin);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [Teacher_Login_Otp] = useMutation(TeacherLoginOTP);
  const [mobileNumberValue, setMobileNumberValue] = useState('');
  const [showSuccessfullyAlert, setShowSuccessfullyAlert] = useState(false);
  const [mobileNumberFormateAlert, setMobileNumberFormateAlert] = useState(false);
  const [mobileNumberRequiredAlert, setMobileNumberRequiredAlert] = useState(false);

  useEffect(() => {
    let gettingUserJWTToken = localStorage.getItem('userJWTToken')
    if (gettingUserJWTToken !== '') {
      router.push('/')
    }
  })

  async function showOtpInputFunction() {
    if (mobileNumberValue === '') {
      setMobileNumberRequiredAlert(true)
    } else {
      if (mobileNumberValue.length === 10) {
        setMobileNumberFormateAlert(false)
        setMobileNumberRequiredAlert(false)
        setShowOtpInput(true)
        await Teacher_Login({
          variables: {
            firstStepLoginInput: {
              mobileNumber: mobileNumberValue
            }
          }
        })
      } else {
        setMobileNumberRequiredAlert(false)
        setMobileNumberFormateAlert(true)
      }
    }
  }

  async function verifyOtp() {
    await Teacher_Login_Otp({
      variables: {
        loginVerificationInput: {
          mobileNumber: mobileNumberValue,
          otpCode: otpValue
        }
      }
    })
      .then(async (res) => {
        console.log(res.data.teacherLoginVerification.jwtToken)
        localStorage.setItem('userJWTToken', res.data.teacherLoginVerification.jwtToken);
        localStorage.setItem('userMobileNumber', mobileNumberValue);
        setShowSuccessfullyAlert(true)
      })
      .catch(error => {
        console.log(error?.message)
      });
  }

  return (
    <>
      {showSuccessfullyAlert ?
        <div class="alert alert-success" role="alert">
          Login Successfully!
        </div>
        :
        <></>
      }
      <div className="container-md" style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        <h1 className='text-center mt-4'><u><b>Login</b></u></h1>
        <div class="mb-3 mt-4">
          <label for="mobileNumberValue" class="form-label">Mobile Number*</label>
          <input type="text" class="form-control" id="mobileNumberValue" value={mobileNumberValue} onChange={(e) => setMobileNumberValue(e.target.value)} />
          {mobileNumberRequiredAlert ? <div id="emailHelp" class="form-text text-danger">Mobile Number Is Required*</div> : <></>}
          {mobileNumberFormateAlert ? <div id="emailHelp" class="form-text text-danger">Please Enter correct mobile number*</div> : <></>}
        </div>
        {showOtpInput ?
          <div class="mb-3">
            <label for="otp" class="form-label">Enter OTP*</label>
            <input type="number" class="form-control" id="otp" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} />
          </div>
          :
          <></>
        }

        {showOtpInput ?
          <button type="button" class="btn btn-primary mt-3 w-100" onClick={() => verifyOtp()}>Submit</button>
          :
          <button type="button" class="btn btn-primary mt-3 w-100" onClick={() => showOtpInputFunction()}>Generate OTP</button>
        }
      </div>
    </>
  );
}

export default Login;

