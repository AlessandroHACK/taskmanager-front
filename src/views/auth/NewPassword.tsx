import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import  { useState } from 'react'
import { ConfirmToken } from 'types/index'

export default function NewPassword() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>

      <h1 className="text-2xl font-black text-white mt-4">Restablecer password</h1>
      <p className="text-xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {''}
        <span className=" text-white font-extrabold">por email</span>
      </p>


      {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> :
       <NewPasswordForm token={token}/>}

    </>
  )
}
