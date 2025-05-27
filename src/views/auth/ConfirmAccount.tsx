import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import { ConfirmToken } from "types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@api/AuthAPI";
import { toast } from "react-toastify";


export default function ConfirmAccount() {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const {mutate} = useMutation({
      mutationFn: confirmAccount,
      onError: (error) => {  
        toast.error(error.message)
      },
      onSuccess: (data) => { 
        toast.success(data)
      }
    })

    const handleChange = (token :ConfirmToken['token']) => {
      setToken(token)
    }

    const handleComplete = (token : ConfirmToken['token']) => {
      mutate({token})
    }
  return (
    <>
      <h1 className="text-2xl font-black text-white mt-14">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5"> 
        Ingresa el código que recibiste {''}
        <span className=" text-white font-extrabold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10 rounded-lg"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>

        <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white"/>
            </PinInput>
        </div>

        <nav className="mt-10 flex flex-col justify-center items-center space-y-2">
                    <div className="flex items-center">
                      
                        <Link to='/auth/request-code' className="text-blue-500 font-bold underline ml-1">Solicitar un nuevo Código</Link>
                    </div>

                </nav>
      </form>    

    </>
  )
}