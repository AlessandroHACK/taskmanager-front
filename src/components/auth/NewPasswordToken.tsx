import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { ConfirmToken } from 'types/index';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { validateToken } from '@api/AuthAPI';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken : React.Dispatch<React.SetStateAction<string>>
    setIsValidToken :React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {
    
    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: (error) => {  
            toast.error(error.message)
          },
          onSuccess: (data) => { 
            toast.success(data)
            setIsValidToken(true)
          }
    })

    const handleChange = (token:  ConfirmToken['token']) => {
        setToken(token)
     }
    const handleComplete = (token:  ConfirmToken['token']) => {
        mutate({token})
     }

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition placeholder-white" />
                    </PinInput>
                </div>
                <nav className="mt-10 flex flex-col justify-center items-center space-y-2">
                    <div className="flex items-center">
                      
                        <Link to='/auth/forgot-password' className="text-blue-500 font-bold underline ml-1">Solicitar un nuevo Código</Link>
                    </div>

                </nav>
            </form>

        </>
    )
}